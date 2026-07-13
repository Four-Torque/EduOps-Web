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
import { BILLING_PAGE_SIZE } from "@/shared/constants/manager/billing.constants";
import { formatDate } from "@/shared/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

// 지금은 완료(PAID)/미완료(UNPAID)만 실제 데이터와 연동한다.
// 대기/연체는 서버에 대응하는 개념이 없어 항상 빈 목록으로 표시한다.
function toPaymentTypeFilter(tab: BillingTabFilter): "PAID" | "UNPAID" | undefined {
  if (tab === "완료") return "PAID";
  if (tab === "미완료") return "UNPAID";
  return undefined;
}

function toBillingStatus(status: RevenueItem["status"]): BillingStatus {
  if (status === "PAID") return "완료";
  if (status === "UNPAID") return "미완료";
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
          <BillingStatusBadge status={toBillingStatus(item.status)} />
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
  const { tab, setTab, page, setPage } = useBillingStore();
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  // "연체"는 아직 지원하지 않아 조회 자체를 막고 빈 목록을 보여준다.
  const isUnsupportedTab = tab === "연체";

  const { data, isLoading } = usePayments({
    type: "INCOME",
    paymentType: toPaymentTypeFilter(tab),
    page,
    limit: BILLING_PAGE_SIZE,
  });

  // "전체" 탭은 서버가 REFUNDED까지 함께 내려주므로, 완료/미완료만 남기고 걸러낸다.
  const filteredData =
    !isUnsupportedTab && data
      ? {
          ...data,
          data: data.data.filter(
            (item: RevenueItem) =>
              item.status === "PAID" || item.status === "UNPAID",
          ),
        }
      : { data: [], total: 0, totalPages: 1 };

  const columns = getColumns((id, status) =>
    updatePaymentStatus({ id, paymentType: status }),
  );

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-slate-900">
          최근 거래내역
        </h2>
        <BillingFilterTabs
          active={tab}
          onChange={(v) => setTab(v as BillingTabFilter)}
        />
      </div>

      <Table
        columns={columns}
        data={filteredData}
        isLoading={!isUnsupportedTab && isLoading}
        rowKey="id"
        showCheckbox={false}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}