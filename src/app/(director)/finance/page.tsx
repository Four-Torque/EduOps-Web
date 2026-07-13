"use client";

import { useMemo } from "react";

import { RevenueChart } from "@/features/finance/components/RevenueChart";
import { RevenueFilterBar } from "@/features/finance/components/RevenueFilterBar";
import { RevenueKpi } from "@/features/finance/components/RevenueKpi";
import { Table } from "@/shared/components/Table";
import { getColumns } from "./column";

import { useFinanceStore } from "@/features/finance/store";
import {
  usePayments,
  useUpdatePayment,
  usePaymentStats,
  usePaymentMonthlyTrends,
} from "@/features/finance/query";

const PAGE_SIZE = 5;

export default function FinancePage() {
  const { filter, setDateRange, setPage } = useFinanceStore();

  const { data: paymentsData } = usePayments({
    search: filter.search || undefined,
    paymentType: filter.status === "all" ? undefined : (filter.status as any),
    type: filter.type,
    page: filter.page,
    limit: PAGE_SIZE,
  });

  const { data: statsData } = usePaymentStats();
  const { data: trendsData } = usePaymentMonthlyTrends();
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  const columns = useMemo(() => {
    return getColumns((id, status) =>
      updatePaymentStatus({ id, paymentType: status }),
    );
  }, [updatePaymentStatus]);

  const stats = statsData ?? {
    totalRevenue: 0,
    totalExpense: 0,
    netProfit: 0,
    unpaidAmount: 0,
    unpaidCount: 0,
    newEnrollments: 0,
    refundCount: 0,
    refundAmount: 0,
  };
  const monthlyRevenueData = trendsData ?? [];

  return (
    <div>
      <RevenueKpi stats={stats} />

      <RevenueFilterBar
        search={filter.search}
        status={filter.status}
        type={filter.type}
        dateRange={filter.dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="mb-[18px]">
        <Table
          columns={columns}
          data={paymentsData}
          showCheckbox={false}
          rowKey="id"
          onPageChange={setPage}
          currentPage={filter.page}
        />
      </div>

      <div className="flex gap-5">
        <RevenueChart data={monthlyRevenueData} />
      </div>
    </div>
  );
}
