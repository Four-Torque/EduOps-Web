import { ColumnProps } from "@/shared/components/Table";
import type { RevenueItem } from "@/features/finance/type";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { formatDate } from "@/shared/lib/utils";

export function getColumns(
  onUpdateStatus?: (id: string, status: "PAID" | "UNPAID" | "REFUNDED") => void,
): ColumnProps[] {
  return [
    {
      key: "type",
      label: "구분",
      render: (item: RevenueItem) => (
        <div className="text-center">
          {item.type === "INCOME" ? (
            <span className="text-[11px] font-semibold text-[#0069A8] bg-[#0069A8]/10 px-2 py-0.5 rounded-sm">
              수입
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm">
              지출
            </span>
          )}
        </div>
      ),
    },
    {
      key: "date",
      label: "날짜",
      render: (item: RevenueItem) => (
        <div className="text-center text-[12px] text-slate-400">
          {formatDate(item.date)}
        </div>
      ),
    },
    {
      key: "itemTitle",
      label: "항목",
      render: (item: RevenueItem) => (
        <div className="text-center">
          <p className="text-[12.5px] font-medium text-slate-900 leading-tight">
            {item.itemTitle}
          </p>
          <p className="text-[10.5px] text-slate-400 mt-0.5">{item.itemSub}</p>
        </div>
      ),
    },
    {
      key: "studentName",
      label: "대상자",
      render: (item: RevenueItem) => (
        <div className="text-center text-[12.5px] text-slate-700">
          {item.studentName}
        </div>
      ),
    },
    {
      key: "amount",
      label: "금액",
      render: (item: RevenueItem) => (
        <div className="text-center text-[12.5px] font-medium text-slate-800">
          {item.amount.toLocaleString("ko-KR")}원
        </div>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: (item: RevenueItem) => (
        <div className="text-center">
          {item.status === "PAID" && (
            <span className="inline-block text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              납부완료
            </span>
          )}
          {item.status === "COMPLETED" && (
            <span className="inline-block text-[10.5px] font-medium text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
              지급완료
            </span>
          )}
          {item.status === "UNPAID" && (
            <span className="inline-block text-[10.5px] font-medium text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
              미납
            </span>
          )}
          {item.status === "PENDING" && (
            <span className="inline-block text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              지급대기
            </span>
          )}
          {item.status === "REFUNDED" && (
            <span className="inline-block text-[10.5px] font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              환불
            </span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      label: "관리",
      render: (item: RevenueItem) => (
        <div className="text-center">
          {item.type === "INCOME" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="더보기"
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border border-slate-200 shadow-md rounded-md p-1 min-w-32 z-50"
              >
                <DropdownMenuItem
                  onClick={() => onUpdateStatus?.(item.id, "PAID")}
                  className="text-[12px] px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-slate-700 rounded-sm"
                >
                  결제 완료로 변경
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdateStatus?.(item.id, "UNPAID")}
                  className="text-[12px] px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-slate-700 rounded-sm"
                >
                  미납으로 변경
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdateStatus?.(item.id, "REFUNDED")}
                  className="text-[12px] px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-red-600 focus:text-red-600 rounded-sm"
                >
                  환불로 변경
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-slate-300 text-[11px] select-none">-</span>
          )}
        </div>
      ),
    },
  ];
}
