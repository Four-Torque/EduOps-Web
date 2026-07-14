"use client";

import { Table, type ColumnProps } from "@/shared/components/Table";
import { BillingFilterTabs } from "./BillingFilterTabs";
import { BillingStatusBadge } from "./BillingStatusBadge";
import { useBillingStore } from "@/features/finance/store";
import { usePayments, useUpdatePayment } from "@/features/finance/query";
import {
  BillingStatus,
  BillingTabFilter,
  RevenueItem,
} from "@/features/finance/type";
import {
  BILLING_CATEGORY_OPTIONS,
  BILLING_PAGE_SIZE,
} from "@/shared/constants/manager/billing.constants";
import { formatDate } from "@/shared/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

// "대기"는 서버에 대응하는 개념이 없어 나오지 않는다.
// 완료=PAID, 미완료/연체는 전부 UNPAID(납부기한 경과 여부로 다시 나뉨).
function toPaymentTypeFilter(tab: BillingTabFilter): "PAID" | "UNPAID" | undefined {
  if (tab === "완료") return "PAID";
  if (tab === "미완료" || tab === "연체") return "UNPAID";
  return undefined;
}

// 미납(UNPAID) 상태이면서 납부기한이 지났으면 연체로 본다.
function isOverdue(item: RevenueItem): boolean {
  if (item.status !== "UNPAID" || !item.dueDate) return false;
  return new Date(item.dueDate).getTime() < Date.now();
}

function toBillingStatus(item: RevenueItem): BillingStatus {
  if (item.status === "PAID") return "완료";
  if (item.status === "UNPAID") return isOverdue(item) ? "연체" : "미완료";
  return "대기";
}

function getColumns(
  onUpdateStatus: (id: string, status: "PAID" | "UNPAID") => void,
): ColumnProps[] {
  return [
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
      label: "상세내용",
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
      label: "학생",
      render: (item: RevenueItem) => (
        <p className="text-[12.5px] font-medium text-slate-900 text-center">
          {item.studentName}
        </p>
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
          <BillingStatusBadge status={toBillingStatus(item)} />
        </div>
      ),
    },
    {
      key: "actions",
      label: "액션",
      render: (item: RevenueItem) => (
        <div className="text-center">
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
                onClick={() => onUpdateStatus(item.id, "PAID")}
                className="text-[12px] px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-slate-700 rounded-sm"
              >
                완료로 변경
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdateStatus(item.id, "UNPAID")}
                className="text-[12px] px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-slate-700 rounded-sm"
              >
                미완료로 변경
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}

export function BillingTransactionTable() {
  const { tab, setTab, categoryFilter, setCategoryFilter, page, setPage } =
    useBillingStore();
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  const { data, isLoading } = usePayments({
    type: "INCOME",
    paymentType: toPaymentTypeFilter(tab),
    page,
    limit: BILLING_PAGE_SIZE,
  });

  // "미완료"/"연체"는 서버에서 UNPAID까지만 걸러주므로, 납부기한 경과 여부로
  // 한 번 더 나눈다. "전체"는 REFUNDED를 제외한 완료/미완료/연체만 남긴다.
  const filteredData = data
    ? {
        ...data,
        data: data.data.filter((item: RevenueItem) => {
          if (tab === "완료") return item.status === "PAID";
          if (tab === "미완료") return item.status === "UNPAID" && !isOverdue(item);
          if (tab === "연체") return item.status === "UNPAID" && isOverdue(item);
          return item.status === "PAID" || item.status === "UNPAID"; // "all"
        }),
      }
    : { data: [], total: 0, totalPages: 1 };

  const columns = getColumns((id, status) =>
    updatePaymentStatus({ id, paymentType: status }),
  );

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Select
            value={categoryFilter}
          >
            <SelectTrigger className="w-28 text-[12.5px]" size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BILLING_CATEGORY_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-[12.5px]"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <BillingFilterTabs
          active={tab}
          onChange={(v) => setTab(v as BillingTabFilter)}
        />
      </div>

      <Table
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        rowKey="id"
        showCheckbox={false}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}