import { Mail, CreditCard } from "lucide-react";

interface QuickTask {
  icon: React.ReactNode;
  label: string;
}

const QUICK_TASKS: QuickTask[] = [
  { icon: <Mail className="w-3.5 h-3.5" />, label: "미납 안내 발송 (7건)" },
  { icon: <CreditCard className="w-3.5 h-3.5" />, label: "신규 수강료 등록" },
];

interface QuickActionsProps {
  achievementRate: number;
}

export function QuickActions({ achievementRate }: QuickActionsProps) {
  return (
    <div className="w-[300px] min-w-[300px]">
      <p className="text-[12.5px] font-semibold text-slate-800 pb-2 mb-2.5 border-b border-slate-100">
        빠른 업무
      </p>

      {QUICK_TASKS.map((task) => (
        <button
          key={task.label}
          className="flex items-center gap-2.5 w-full py-2.5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors rounded text-left"
        >
          <div className="w-[26px] h-[26px] rounded-md bg-blue-50 flex items-center justify-center text-[#0069A8] shrink-0">
            {task.icon}
          </div>
          <span className="text-[12.5px] text-slate-700">{task.label}</span>
        </button>
      ))}

      {/* 목표 달성률 */}
      <div className="pt-3">
        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
          <span>목표 달성률</span>
          <span className="font-semibold text-[#0069A8]">{achievementRate}%</span>
        </div>
        <div className="h-[5px] bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0069A8] rounded-full transition-all duration-500"
            style={{ width: `${achievementRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
