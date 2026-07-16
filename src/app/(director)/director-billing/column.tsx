import { ColumnProps } from "@/shared/components/Table";
import type { AssetApplication } from "@/features/asset/type";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

const STATUS_STYLE: Record<string, string> = {
  PENDING:  "text-slate-500 bg-slate-100",
  ACCEPTED: "text-emerald-700 bg-emerald-50",
  REJECTED: "text-red-600 bg-red-50",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING:  "대기",
  ACCEPTED: "승인",
  REJECTED: "반려",
};

export const getAssetApplicationsColumns = (
  onEditStatus?: (id: string, status: string) => void,
): ColumnProps[] => [
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
  {
    key: "actions",
    label: "관리",
    render: (item: AssetApplication) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="더보기"
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-32">
          <DropdownMenuItem
            onClick={() => onEditStatus?.(item.id, "ACCEPTED")}
            className="text-[12px] cursor-pointer text-slate-700"
          >
            승인
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEditStatus?.(item.id, "REJECTED")}
            className="text-[12px] cursor-pointer text-red-600 focus:text-red-600"
          >
            반려
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];