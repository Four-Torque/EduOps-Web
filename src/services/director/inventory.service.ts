import type {
  InventoryTabFilter,
  InventoryItem,
  InventoryPaymentStatus,
  InventoryListResponse,
} from "@/types/director/inventory.types";
import { MOCK_INVENTORY_ITEMS } from "@/constants/director/inventory.constants";

// TODO: import { apiClient } from "@/lib/axios";

export const INVENTORY_PAGE_SIZE = 5;

export async function fetchInventoryItems(
  statusFilter: InventoryTabFilter,
  page: number,
): Promise<InventoryListResponse> {
  // TODO: return apiClient.get("/inventory", { params: { status: statusFilter, page, pageSize: INVENTORY_PAGE_SIZE } });

  await new Promise((res) => setTimeout(res, 300));

  const filtered =
    statusFilter === "all"
      ? MOCK_INVENTORY_ITEMS
      : MOCK_INVENTORY_ITEMS.filter((item) => item.status === statusFilter);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / INVENTORY_PAGE_SIZE);
  const items = filtered.slice((page - 1) * INVENTORY_PAGE_SIZE, page * INVENTORY_PAGE_SIZE);

  return { items, totalItems, totalPages };
}

export async function updateInventoryStatus(
  id: number,
  status: InventoryPaymentStatus,
): Promise<InventoryItem> {
  // TODO: return apiClient.patch(`/inventory/${id}/status`, { status });

  await new Promise((res) => setTimeout(res, 200));
  return { ...MOCK_INVENTORY_ITEMS.find((item) => item.id === id)!, status };
}

export async function deleteInventoryItems(ids: number[]): Promise<void> {
  // TODO: return apiClient.delete("/inventory", { data: { ids } });

  await new Promise((res) => setTimeout(res, 200));
}