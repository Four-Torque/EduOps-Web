import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPaymentUsers,
  updatePaymentUserStatus,
  deletePaymentUsers,
} from "@/services/director/payment.service";
import { usePaymentStore } from "@/store/director/payment.store";
import type { PaymentApprovalStatus, PaymentUserListResponse } from "@/types/director/pament.types";

// ─── Query Keys (kebab-case) ──────────────────────────────────────────────────

export const paymentQueryKeys = {
  all:  ()                              => ["payment-users"]                as const,
  list: (date: string, tab: string)     => ["payment-users", "list", date, tab] as const,
};

// ─── usePaymentUsers ──────────────────────────────────────────────────────────

export function usePaymentUsers() {
  const { date, tab } = usePaymentStore();

  return useQuery({
    queryKey: paymentQueryKeys.list(date, tab),
    queryFn:  () => fetchPaymentUsers({ date, tab }),
    placeholderData: (prev) => prev,
  });
}

// ─── useUpdatePaymentUserStatus ───────────────────────────────────────────────

export function useUpdatePaymentUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: PaymentApprovalStatus }) =>
      updatePaymentUserStatus(userId, status),

    // 낙관적 업데이트
    onMutate: async ({ userId, status }) => {
      await queryClient.cancelQueries({ queryKey: paymentQueryKeys.all() });

      const previousData = queryClient.getQueriesData<PaymentUserListResponse>({
        queryKey: paymentQueryKeys.all(),
      });

      queryClient.setQueriesData(
        { queryKey: paymentQueryKeys.all() },
        (old: PaymentUserListResponse | undefined) => {
          if (!old?.items) return old;
          return {
            ...old,
            items: old.items.map((u) => (u.id === userId ? { ...u, status } : u)),
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
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all() });
    },
  });
}

// ─── useDeletePaymentUsers ────────────────────────────────────────────────────

export function useDeletePaymentUsers() {
  const queryClient = useQueryClient();
  const clearSelection = usePaymentStore((state) => state.clearSelection);

  return useMutation({
    mutationFn: deletePaymentUsers,
    onSuccess: () => {
      clearSelection();
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all() });
    },
  });
}