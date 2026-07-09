import { ColumnProps } from "@/shared/components/Table";

export const getAssetInventoryColumns = (): ColumnProps[] => [
  { key: "name", label: "품목", type: "text" },
  { key: "categoryName", label: "분류", type: "text" },
  { key: "stock", label: "재고", type: "number" },
  { key: "vendorName", label: "구매처", type: "text" },
  { key: "createdAt", label: "최초 등록일", type: "date" },
];
