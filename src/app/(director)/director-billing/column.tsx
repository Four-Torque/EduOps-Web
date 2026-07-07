import { ColumnProps } from "@/components/common/Table";

export const getAssetApplicationsColumns = (): ColumnProps[] => [
  { key: "assetName", label: "품목", type: "text" },
  { key: "categoryName", label: "분류", type: "text" },
  { key: "quantity", label: "수량", type: "number" },
  { key: "stock", label: "재고", type: "number" },
  { key: "price", label: "금액", type: "money" },
  { key: "vendorName", label: "구매처", type: "text" },
  { key: "userName", label: "신청자", type: "text" },
  { key: "status", label: "상태", type: "text" },
];
