"use client";

import { BillingRevenueChart }    from "./BillingRevenueChart";
import { BillingStatsPanel }      from "./BillingStatsPanel";
import { BillingTransactionTable } from "./BillingTransactionTable";

export function BillingSection() {
  return (
    <div>
      {/* 상단 차트 + 통계 */}
      <div className="flex gap-5 mb-8">
        <BillingRevenueChart />
        <BillingStatsPanel />
      </div>

      {/* 거래내역 테이블 */}
      <BillingTransactionTable />
    </div>
  );
}
