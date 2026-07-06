import type { InventoryTabFilter } from "@/types/director/inventory.types";

export const REQUEST_STATUS_OPTIONS: {
  label: string;
  value: InventoryTabFilter;
}[] = [
  { label: "전체", value: "all" },
  { label: "결제완료", value: "ACCEPTED" },
  { label: "결제대기", value: "PENDING" },
  { label: "결제거절", value: "REJECTED" },
];

// export const INVENTORY_STATUS_LABEL: Record<InventoryPaymentStatus, string> = {
//   ACCEPTED: "결제완료",
//   REJECTED: "결제거절",
//   PENDING: "결제 대기",
// };

// export const INVENTORY_STATUS_STYLE: Record<InventoryPaymentStatus, string> = {
//   ACCEPTED: "text-white bg-[#E07B39] hover:bg-[#c96a2e]",
//   PENDING: "text-white bg-[#6B7280] hover:bg-[#4B5563]",
//   REJECTED: "text-white bg-[#EF4444] hover:bg-[#DC2626]",
// };

export const REQUEST_STATUS_LABEL: Record<string, string> = {
  PENDING: "결제 대기",
  ACCEPTED: "결제완료",
  REJECTED: "결제거절",
};

export const REQUEST_STATUS_STYLE: Record<
  keyof typeof REQUEST_STATUS_LABEL,
  string
> = {
  PENDING: "text-white bg-[#6B7280] hover:bg-[#4B5563]",
  ACCEPTED: "text-white bg-[#E07B39] hover:bg-[#c96a2e]",
  REJECTED: "text-white bg-[#EF4444] hover:bg-[#DC2626]",
};

export const INVENTORY_TABLE_COLUMNS = [
  { key: "assetName", label: "품목", type: "text" },
  { key: "categoryName", label: "분류", type: "text" },
  { key: "quantity", label: "수량", type: "number" },
  { key: "stock", label: "재고", type: "number" },
  { key: "price", label: "금액", type: "money" },
  { key: "vendorName", label: "구매처", type: "text" },
  { key: "userName", label: "신청자", type: "text" },
  { key: "status", label: "상태", type: "text" },
] as const;
