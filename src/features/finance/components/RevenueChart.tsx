import type { MonthlyRevenue } from "@/features/finance/type";

interface RevenueChartProps {
  data: MonthlyRevenue[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxVal = Math.max(...data.flatMap((d) => [d.current, d.previous]));

  return (
    <div className="flex-1">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12.5px] font-semibold text-slate-800">
          월간 매출 추이
        </span>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#1e3a5f]" />
            당월
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#f5e6a3]" />
            전월
          </span>
        </div>
      </div>

      {/* 바 차트 */}
      <div className="flex items-end gap-2.5 h-[120px]">
        {data.map((d) => (
          <div key={d.month} className="flex-1 flex items-end gap-[3px]">
            <div
              className="flex-1 rounded-t-sm bg-[#f5e6a3] min-h-1"
              style={{ height: `${(d.previous / maxVal) * 100}%` }}
            />
            <div
              className="flex-1 rounded-t-sm bg-[#1e3a5f] min-h-1"
              style={{ height: `${(d.current / maxVal) * 100}%` }}
            />
          </div>
        ))}
      </div>

      {/* X축 */}
      <div className="flex border-t border-slate-100 pt-1.5 mt-1.5">
        {data.map((d) => (
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
