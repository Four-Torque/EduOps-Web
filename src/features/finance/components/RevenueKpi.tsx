import type { RevenueStats } from "@/features/finance/type";
import { formatWon as formatKRW } from "@/shared/lib/utils";

interface RevenueKpiProps {
  stats: RevenueStats;
}

export function RevenueKpi({ stats }: RevenueKpiProps) {
  const isNetProfitPositive = stats.netProfit >= 0;

  return (
    <div className="flex border-t border-b border-slate-200 mb-[18px] bg-white">
      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium">
          총 수입 (완납)
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-slate-900">
            {formatKRW(stats.totalRevenue)}
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium">
          총 지출 (급여/비품)
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-rose-600">
            {formatKRW(stats.totalExpense)}
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium">
          순수익 (수입 - 지출)
        </p>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-[20px] font-bold ${
              isNetProfitPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {formatKRW(stats.netProfit)}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5">당월 정산 기준</p>
      </div>

      <div className="flex-1 px-5 py-[14px]">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium">
          미납 미수금
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-amber-600">
            {formatKRW(stats.unpaidAmount)}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          총 {stats.unpaidCount}건 미납 상태
        </p>
      </div>
    </div>
  );
}
