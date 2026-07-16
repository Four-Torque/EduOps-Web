import { ColumnProps } from "@/shared/components/Table";
import type { AssetApplication } from "@/features/asset/type";

const STATUS_LABEL: Record<string, string> = {
  PENDING:  "대기",
  ACCEPTED: "승인",
  REJECTED: "반려",
};

const STATUS_STYLE: Record<string, string> = {
  PENDING:  "text-slate-500 bg-slate-100",
  ACCEPTED: "text-emerald-700 bg-emerald-50",
  REJECTED: "text-red-600 bg-red-50",
};

export const getAssetApplicationsColumns = (): ColumnProps[] => [
  { key: "assetName",    label: "품목",  type: "text"   },
  { key: "categoryName", label: "분류",  type: "text"   },
  { key: "quantity",     label: "수량",  type: "number" },
  { key: "stock",        label: "재고",  type: "number" },
  { key: "price",        label: "금액",  type: "money"  },
  { key: "vendorName",   label: "구매처", type: "text"   },
  { key: "userName",     label: "신청자", type: "text"   },
  {
    key: "status",
    label: "상태",
    render: (item: AssetApplication) => (
      <span className={`inline-block text-[10.5px] font-medium px-2.5 py-0.5 rounded-full ${STATUS_STYLE[item.status] ?? "text-slate-500 bg-slate-100"}`}>
        {STATUS_LABEL[item.status] ?? item.status}
      </span>
    ),
  },
];