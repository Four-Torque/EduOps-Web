import type { RevenueStats } from "@/types/director/finance.types";

interface RevenueKpiProps {
  stats: RevenueStats;
}

function formatKRW(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

export function RevenueKpi({ stats }: RevenueKpiProps) {
  return (
    <div className="flex border-t border-b border-slate-200 mb-[18px]">
      {/* 총 매출 */}
      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5">총 매출 금액</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-slate-900">
            {formatKRW(stats.totalRevenue)}
          </span>
          <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
            +12%
          </span>
        </div>
      </div>

      {/* 미수금 */}
      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5">미수금</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-red-600">
            {formatKRW(stats.unpaidAmount)}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {stats.unpaidCount}건
        </p>
      </div>

      {/* 신규 등록 */}
      <div className="flex-1 px-5 py-[14px] border-r border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5">신규 등록</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-slate-900">
            {stats.newEnrollments}명
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">당월</p>
      </div>

      {/* 환불/취소 */}
      <div className="flex-1 px-5 py-[14px]">
        <p className="text-[11px] text-slate-400 mb-1.5">환불/취소</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-slate-900">
            {stats.refundCount}건
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {formatKRW(stats.refundAmount)}
        </p>
      </div>
    </div>
  );
}
