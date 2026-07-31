import type { BillingStats } from "@/features/payment/type";

interface BillingStatsPanelProps {
  stats: BillingStats;
}

export function BillingStatsPanel({ stats }: BillingStatsPanelProps) {
  return (
    <div className="w-[280px] min-w-[280px] flex flex-col gap-4">
      {/* 총 수익 */}
      <div className="border border-slate-200 rounded p-5 bg-white">
        <p className="text-[12px] text-slate-500 mb-2">총 수익</p>
        <p className="text-[22px] font-bold text-slate-900">
          ₩{stats.totalRevenue.toLocaleString()}
        </p>
        <p className="text-[11px] text-emerald-600 mt-1">
          ↗ 정일 대비 +{stats.revenueGrowthRate}%
        </p>
      </div>

      {/* 수업료 현황 */}
      <div className="border border-slate-200 rounded p-5 bg-white">
        <p className="text-[13px] font-semibold text-slate-900 mb-0.5">
          수업료 현황
        </p>
        <p className="text-[11px] text-slate-400 mb-3">2024 가을학기</p>

        {/* 프로그레스 바 */}
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-[11px] text-slate-600 w-[70px] shrink-0">
            {stats.paidRate}% 납입완료
          </p>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-800 rounded-full"
              style={{ width: `${stats.paidRate}%` }}
            />
          </div>
          <p className="text-[11px] text-red-400 shrink-0">
            {100 - stats.paidRate}% 대기
          </p>
        </div>

        {/* 범례 */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <span className="text-[10.5px] text-slate-500">
              완료 ({stats.paidCount}명)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-300" />
            <span className="text-[10.5px] text-slate-500">
              미완료 ({stats.unpaidCount}명)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
