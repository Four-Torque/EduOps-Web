import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchInventoryItems,
  updateInventoryStatus,
  deleteInventoryItems,
} from "@/services/director/inventory.service";
import { useInventoryStore } from "@/store/director/inventory.store";
import type { InventoryPaymentStatus, InventoryListResponse } from "@/types/director/inventory.types";

export const inventoryQueryKeys = {
  all:  ()                                    => ["inventory-items"]                          as const,
  list: (status: string, page: number)        => ["inventory-items", "list", status, page]    as const,
};

export function useInventoryItems() {
  const { statusFilter, page } = useInventoryStore();

  return useQuery({
    queryKey: inventoryQueryKeys.list(statusFilter, page),
    queryFn:  () => fetchInventoryItems(statusFilter, page),
    placeholderData: (prev) => prev,
  });
}

export function useUpdateInventoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: InventoryPaymentStatus }) =>
      updateInventoryStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: inventoryQueryKeys.all() });

      const previousData = queryClient.getQueriesData<InventoryListResponse>({
        queryKey: inventoryQueryKeys.all(),
      });

      queryClient.setQueriesData(
        { queryKey: inventoryQueryKeys.all() },
        (old: InventoryListResponse | undefined) => {
          if (!old?.items) return old;
          return {
            ...old,
            items: old.items.map((item) => (item.id === id ? { ...item, status } : item)),
          };
        },
      );

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      context?.previousData.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: inventoryQueryKeys.all() });
    },
  });
}

export function useDeleteInventoryItems() {
  const queryClient = useQueryClient();
  const clearSelection = useInventoryStore((state) => state.clearSelection);

  return useMutation({
    mutationFn: deleteInventoryItems,
    onSuccess: () => {
      clearSelection();
      queryClient.invalidateQueries({ queryKey: inventoryQueryKeys.all() });
    },
  });
}