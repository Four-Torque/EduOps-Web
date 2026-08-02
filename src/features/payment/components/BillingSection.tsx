"use client";

import { BillingRevenueChart }    from "./BillingRevenueChart";
import { BillingStatsPanel }      from "./BillingStatsPanel";
import { BillingTransactionTable } from "./BillingTransactionTable";
import { useBillingSummary } from "@/features/payment/query";

export function BillingSection() {
  const { data: summary } = useBillingSummary();

  return (
    <div>
      {/* 상단 차트 + 통계 */}
      {summary && (
        <div className="flex gap-5 mb-8">
          <BillingRevenueChart data={summary.monthly} />
          <BillingStatsPanel stats={summary.stats} />
        </div>
      )}

      {/* 거래내역 테이블 */}
      <BillingTransactionTable />
    </div>
  );
}
