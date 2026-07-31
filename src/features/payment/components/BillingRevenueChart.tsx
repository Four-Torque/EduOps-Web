import { MonthlyRevenue } from "@/features/payment/type";
import { MOCK_MONTHLY_REVENUE } from "@/shared/constants/manager/billing.constants";

export function BillingRevenueChart() {
  const data = MOCK_MONTHLY_REVENUE;
  const maxVal = Math.max(...data.map((d) => d.amount ?? 0), 1);

  return (
    <div className="flex-1 border border-slate-200 rounded p-5 bg-white">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-[13px] font-semibold text-slate-900">월별 수익</p>
          <p className="text-[11px] text-slate-400">2026 회계년도</p>
        </div>
        <button className="text-[11.5px] text-slate-500 border border-slate-200 rounded px-2.5 py-1 hover:bg-slate-50 transition-colors">
          최근 6개월 ▾
        </button>
      </div>

      {/* 바 차트 */}
      <div className="flex items-end gap-3 h-[160px] mt-4 mb-2">
        {data.map((d: MonthlyRevenue) => (
          <div
            key={d.month}
            className="flex-1 rounded-t-sm bg-slate-800 min-h-[2px] transition-all"
            style={{ height: `${((d.amount ?? 0) / maxVal) * 100}%` }}
          />
        ))}
      </div>

      {/* X축 */}
      <div className="flex gap-3">
        {data.map((d: MonthlyRevenue) => (
          <div
            key={d.month}
            className="flex-1 text-center text-[11px] text-slate-400"
          >
            {d.month}
          </div>
        ))}
      </div>
    </div>
  );
}
