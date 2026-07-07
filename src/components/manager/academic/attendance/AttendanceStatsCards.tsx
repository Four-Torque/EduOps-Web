import { Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { AttendanceStats } from "@/types/manager/attendance.types";

interface AttendanceStatsCardsProps {
  stats: AttendanceStats;
}

export function AttendanceStatsCards({ stats }: AttendanceStatsCardsProps) {
  const cards = [
    {
      label: "총 직원 수",
      value: stats.totalEmployees,
      icon: Users,
      iconClass: "text-slate-500 bg-slate-100",
      valueClass: "text-slate-900",
      border: "",
    },
    {
      label: "오늘 출근",
      value: stats.presentToday,
      icon: CheckCircle,
      iconClass: "text-emerald-500 bg-emerald-50",
      valueClass: "text-slate-900",
      border: "",
    },
    {
      label: "오늘 결근",
      value: stats.absentToday,
      icon: XCircle,
      iconClass: "text-red-500 bg-red-50",
      valueClass: "text-slate-900",
      border: "border-l-4 border-l-red-400",
    },
    {
      label: "지각 / 기타",
      value: stats.lateOrEtc,
      icon: AlertCircle,
      iconClass: "text-amber-500 bg-amber-50",
      valueClass: "text-slate-900",
      border: "",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`border border-slate-200 rounded p-4 bg-white flex items-start justify-between ${card.border}`}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <card.icon className={`w-3.5 h-3.5 ${card.iconClass.split(" ")[0]}`} />
              <p className="text-[12px] text-slate-500">{card.label}</p>
            </div>
            <p className={`text-[26px] font-bold ${card.valueClass}`}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
