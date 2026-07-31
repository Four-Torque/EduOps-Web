import { Users, GraduationCap, BarChart3 } from "lucide-react";
import type { AcademyOverview } from "@/features/academy/type";

interface AcademyOverviewPanelProps {
  overview: AcademyOverview;
}

export function AcademyOverviewPanel({ overview }: AcademyOverviewPanelProps) {
  const items = [
    {
      icon: Users,
      label: "총 학생 수",
      value: overview.totalStudents.toLocaleString(),
    },
    {
      icon: GraduationCap,
      label: "총 임직원 수",
      value: overview.totalEnrolled.toLocaleString(),
    },
    { icon: BarChart3, label: "재원생 비율", value: `${overview.usageRate}%` },
  ];

  return (
    <div className="w-[260px] min-w-[260px] border border-slate-200 rounded p-5">
      <h2 className="text-[15px] font-bold text-slate-900 mb-4">개요</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <item.icon className="w-3.5 h-3.5" />
              <span className="text-[12px]">{item.label}</span>
            </div>
            <span className="text-[13px] font-semibold text-slate-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
