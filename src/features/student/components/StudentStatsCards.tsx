import { Users, UserPlus, MessageCircle } from "lucide-react";
import { useStudentStats } from "@/features/student/query";

export function StudentStatsCards() {
  const { data: stats } = useStudentStats();
  if (!stats) return null;

  const cards = [
    {
      label: "총 학생 수",
      value: stats.totalStudents.toLocaleString(),
      sub: `↗ +${stats.totalStudentsGrowthRate}% vs last year`,
      subClass: "text-emerald-600",
      icon: Users,
      iconClass: "bg-slate-100 text-slate-500",
    },
    {
      label: "신규 등록",
      value: stats.newRegistrations.toString(),
      sub: "This Month",
      subClass: "text-slate-400",
      icon: UserPlus,
      iconClass: "bg-slate-100 text-slate-500",
    },
    {
      label: "대기중인 상담",
      value: stats.waitingConsultations.toString(),
      sub: "Require immediate action",
      subClass: "text-slate-400",
      icon: MessageCircle,
      iconClass: "bg-red-50 text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="border border-slate-200 rounded p-5 bg-white flex items-start justify-between">
          <div>
            <p className="text-[12px] text-slate-500 mb-2">{card.label}</p>
            <p className="text-[26px] font-bold text-slate-900 mb-1">{card.value}</p>
            <p className={`text-[11px] ${card.subClass}`}>{card.sub}</p>
          </div>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${card.iconClass}`}>
            <card.icon className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}