"use client";

import { useMemo } from "react";
import { RevenueKpi } from "@/components/director/finance/RevenueKpi";
import { RevenueFilterBar } from "@/components/director/finance/RevenueFilterBar";
import { RevenueTable } from "@/components/director/finance/RevenueTable";
import { RevenueChart } from "@/components/director/finance/RevenueChart";
import { QuickActions } from "@/components/director/finance/QuickActions";
import {
  MOCK_REVENUE_STATS,
  MOCK_REVENUE_ITEMS,
  MOCK_MONTHLY_REVENUE,
} from "@/constants/director/finance.mock";
import { useFinanceStore } from "@/store/director/finance.store";

const PAGE_SIZE = 5;

export default function FinancePage() {
  const { filter, setSearch, setStatus, setDateRange, setPage } =
    useFinanceStore();

  const filtered = useMemo(() => {
    return MOCK_REVENUE_ITEMS.filter((item) => {
      const matchSearch =
        filter.search === "" ||
        item.studentName.includes(filter.search) ||
        item.itemTitle.toLowerCase().includes(filter.search.toLowerCase());

      const matchStatus =
        filter.status === "all" || item.status === filter.status;

      return matchSearch && matchStatus;
    });
  }, [filter.search, filter.status]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice(
    (filter.page - 1) * PAGE_SIZE,
    filter.page * PAGE_SIZE,
  );

  return (
    <div>
      <RevenueKpi stats={MOCK_REVENUE_STATS} />

      <RevenueFilterBar
        search={filter.search}
        status={filter.status}
        dateRange={filter.dateRange}
        onSearchChange={setSearch}
        onStatusChange={(v) => setStatus(v as typeof filter.status)}
        onDateRangeChange={setDateRange}
        onExcelExport={() => alert("엑셀 다운로드")}
      />

      <RevenueTable
        items={paginated}
        page={filter.page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      <div className="flex gap-5">
        <RevenueChart data={MOCK_MONTHLY_REVENUE} />
        <QuickActions achievementRate={82} />
      </div>
    </div>
  );
}
