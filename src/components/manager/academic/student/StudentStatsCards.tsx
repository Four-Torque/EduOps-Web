import { Users, UserPlus, MessageCircle } from "lucide-react";
import type { StudentStats } from "@/types/director/student.types";

interface StudentStatsCardsProps {
  stats: StudentStats;
}

export function StudentStatsCards({ stats }: StudentStatsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* 총 학생 수 */}
      <div className="border border-slate-200 rounded p-5 flex items-start justify-between">
        <div>
          <p className="text-[12px] text-slate-500 mb-2">총 학생 수</p>
          <p className="text-[26px] font-bold text-slate-900 mb-1">{stats.totalStudents.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600">↗ +{stats.totalStudentsGrowthRate}% vs last year</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* 신규 등록 */}
      <div className="border border-slate-200 rounded p-5 flex items-start justify-between">
        <div>
          <p className="text-[12px] text-slate-500 mb-2">신규 등록</p>
          <p className="text-[26px] font-bold text-slate-900 mb-1">{stats.newRegistrations}</p>
          <p className="text-[11px] text-slate-400">This Month</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <UserPlus className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* 대기중인 상담 */}
      <div className="border border-slate-200 rounded p-5 flex items-start justify-between">
        <div>
          <p className="text-[12px] text-slate-500 mb-2">대기중인 상담</p>
          <p className="text-[26px] font-bold text-slate-900 mb-1">{stats.waitingConsultations}</p>
          <p className="text-[11px] text-slate-400">Require immediate action</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4 text-red-400" />
        </div>
      </div>
    </div>
  );
}
