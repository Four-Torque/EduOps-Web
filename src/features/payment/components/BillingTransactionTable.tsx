"use client";

import { type ColumnProps } from "@/shared/components/Table";
import { BillingFilterTabs } from "./BillingFilterTabs";
import { BillingStatusBadge } from "./BillingStatusBadge";
import { useBillingStore } from "@/features/finance/store";
import { BillingTransaction, BillingTabFilter } from "@/features/finance/type";

const COLUMNS: ColumnProps[] = [
  { key: "id", label: "ID", type: "text" },
  {
    key: "student",
    label: "학생",
    render: (item: BillingTransaction) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
          {item.avatarInitial}
        </div>
        <div className="text-left">
          <p className="text-[12.5px] font-medium text-slate-900">
            {item.studentName}
          </p>
          <p className="text-[10.5px] text-slate-400">{item.studentCode}</p>
        </div>
      </div>
    ),
  },
  { key: "description", label: "상세내용", type: "text" },
  { key: "amount", label: "금액", type: "money" },
  { key: "date", label: "날짜", type: "text" },
  {
    key: "status",
    label: "상태",
    render: (item: BillingTransaction) => (
      <BillingStatusBadge status={item.status} />
    ),
  },
  { key: "actions", label: "액션" },
];

export function BillingTransactionTable() {
  const { tab, setTab } = useBillingStore();
  // const { data, isLoading } = useBillingTransactions();

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

      {/* <Table
        columns={COLUMNS}
        data={data}
        isLoading={isLoading}
        rowKey="id"
        showCheckbox={false}
        statusReadonly={true}
      /> */}
    </div>
  );
}
