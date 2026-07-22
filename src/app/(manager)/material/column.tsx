import { ColumnProps } from "@/shared/components/Table";
import type { AssetApplication } from "@/features/asset/type";
import { Badge } from "@/shared/components/ui/badge";
import { formatNumber } from "@/shared/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "대기",
  ACCEPTED: "승인",
  REJECTED: "반려",
};

const STATUS_STYLE: Record<string, string> = {
  PENDING: "text-slate-500 bg-slate-100",
  ACCEPTED: "text-emerald-700 bg-emerald-50",
  REJECTED: "text-red-600 bg-red-50",
};

export const getAssetApplicationsColumns = (): ColumnProps[] => [
  {
    key: "assetName",
    label: "품목",
    render: (item: AssetApplication) => (
      <p className="text-center">{item.assetName}</p>
    ),
  },
  {
    key: "categoryName",
    label: "분류",
    render: (item: AssetApplication) => (
      <p className="text-center">{item.categoryName}</p>
    ),
  },
  {
    key: "quantity",
    label: "수량",
    render: (item: AssetApplication) => (
      <p className="text-center">{formatNumber(item.quantity)}</p>
    ),
  },
  {
    key: "stock",
    label: "재고",
    render: (item: AssetApplication) => (
      <p className="text-center">{formatNumber(item.stock)}</p>
    ),
  },
  {
    key: "price",
    label: "금액",
    render: (item: AssetApplication) => (
      <div className="w-full flex justify-center">
        <p className="w-full text-center">{formatNumber(item.price)}원</p>
      </div>
    ),
  },
  {
    key: "vendorName",
    label: "구매처",
    render: (item: AssetApplication) => (
      <p className="text-center">{item.vendorName}</p>
    ),
  },
  {
    key: "userName",
    label: "신청자",
    render: (item: AssetApplication) => (
      <p className="text-center">{item.userName}</p>
    ),
  },
  {
    key: "status",
    label: "상태",
    render: (item: AssetApplication) => (
      <div className="flex justify-center">
        <Badge
          className={`px-2.5 py-0.5 ${STATUS_STYLE[item.status] ?? "text-slate-500 bg-slate-100"}`}
        >
          {STATUS_LABEL[item.status] ?? item.status}
        </Badge>
      </div>
    ),
  },
];
