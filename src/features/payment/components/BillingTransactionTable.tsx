"use client";

import { Table, type ColumnProps } from "@/shared/components/Table";
import { BillingFilterTabs } from "./BillingFilterTabs";
import { BillingStatusBadge } from "./BillingStatusBadge";
import { useBillingStore } from "@/features/payment/store";
import { usePayments, useUpdatePayment } from "@/features/payment/query";
import {
  BillingCategoryFilter,
  BillingStatus,
  BillingTabFilter,
  PaymentItem,
} from "@/features/payment/type";
import {
  BILLING_CATEGORY_OPTIONS,
  BILLING_PAGE_SIZE,
} from "@/shared/constants/manager/billing.constants";
import { formatDate, formatWon } from "@/shared/lib/utils";
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
function toPaymentTypeFilter(
  tab: BillingTabFilter,
): "PAID" | "UNPAID" | undefined {
  if (tab === "완료") return "PAID";
  if (tab === "미완료" || tab === "연체") return "UNPAID";
  return undefined;
}

// 미납(UNPAID) 상태이면서 납부기한이 지났으면 연체로 본다.
function isOverdue(item: PaymentItem): boolean {
  if (item.paymentType !== "UNPAID" || !item.dueDate) return false;
  return new Date(item.dueDate).getTime() < Date.now();
}

function toBillingStatus(item: PaymentItem): BillingStatus {
  if (item.paymentType === "PAID") return "완료";
  if (item.paymentType === "UNPAID") return isOverdue(item) ? "연체" : "미완료";
  return "대기";
}

function getColumns(
  onUpdateStatus: (id: string, status: "PAID" | "UNPAID") => void,
): ColumnProps[] {
  return [
    {
      key: "date",
      label: "날짜",
      render: (item: PaymentItem) => (
        <div className="text-center text-[12px] text-slate-400">
          {formatDate(item.paymentDate ?? item.createdAt)}
        </div>
      ),
    },
    {
      key: "title",
      label: "상세내용",
      render: (item: PaymentItem) => (
        <div className="text-center">
          <p className="text-[12.5px] font-medium text-slate-900 leading-tight">
            {item.title}
          </p>
          <p className="text-[10.5px] text-slate-400 mt-0.5">
            {item.className || "일반 청구"}
          </p>
        </div>
      ),
    },
    {
      key: "studentName",
      label: "학생",
      render: (item: PaymentItem) => (
        <p className="text-[12.5px] font-medium text-slate-900 text-center">
          {item.studentName}
        </p>
      ),
    },
    {
      key: "amount",
      label: "금액",
      render: (item: PaymentItem) => (
        <div className="text-center text-[12.5px] font-medium text-slate-800">
          {formatWon(item.amount)}
        </div>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: (item: PaymentItem) => (
        <div className="text-center">
          <BillingStatusBadge status={toBillingStatus(item)} />
        </div>
      ),
    },
    {
      key: "actions",
      label: "액션",
      render: (item: PaymentItem) => (
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

  // 미완료/연체는 납부기한 경과 여부로 클라이언트에서 한 번 더 나눠야 해서,
  // 페이지네이션 없이 해당 paymentType 전체를 가져온 뒤 직접 건수를 세고 자른다.
  // (서버가 준 total/totalPages를 그대로 쓰면 미완료+연체 합친 개수가 나와서 틀어진다)
  const { data, isLoading } = usePayments({
    paymentType: toPaymentTypeFilter(tab),
    page: 1,
    limit: 1000,
  });

  const filteredItems = (data?.data ?? []).filter((item: PaymentItem) => {
    if (tab === "완료") return item.paymentType === "PAID";
    if (tab === "미완료")
      return item.paymentType === "UNPAID" && !isOverdue(item);
    if (tab === "연체") return item.paymentType === "UNPAID" && isOverdue(item);
    return item.paymentType === "PAID" || item.paymentType === "UNPAID"; // "all" (REFUNDED 제외)
  });

  const total = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(total / BILLING_PAGE_SIZE));
  const filteredData = {
    data: filteredItems.slice(
      (page - 1) * BILLING_PAGE_SIZE,
      page * BILLING_PAGE_SIZE,
    ),
    total,
    totalPages,
  };

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
            onValueChange={(v) => setCategoryFilter(v as BillingCategoryFilter)}
          >
            <SelectTrigger className="w-28 text-[12.5px]" size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
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
