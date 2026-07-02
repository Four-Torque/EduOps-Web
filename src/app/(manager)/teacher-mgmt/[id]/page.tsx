"use client";

import { useParams } from "next/navigation";
import { useTeacherDetail } from "@/hooks/manager/teacher.hooks";
import type {
  TeacherStatus,
  ClassStatus,
  SalaryStatus,
} from "@/types/manager/teacher.types";

const TEACHER_STATUS_LABEL: Record<TeacherStatus, string> = {
  ACTIVE: "재직",
  INACTIVE: "휴직",
  LEAVE: "퇴사",
};

const TEACHER_STATUS_STYLE: Record<TeacherStatus, string> = {
  ACTIVE: "bg-[#0069A8]/10 text-[#0069A8]",
  INACTIVE: "bg-amber-50 text-amber-600",
  LEAVE: "bg-slate-100 text-slate-400",
};

const CLASS_STATUS_LABEL: Record<ClassStatus, string> = {
  OPEN: "진행중",
  CLOSE: "종료",
};

const SALARY_STATUS_LABEL: Record<SalaryStatus, string> = {
  PENDING: "지급 대기",
  COMPLETE: "지급 완료",
};

function formatWon(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

// 공통 카드 셸
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[13px] font-semibold text-slate-800 mb-4">{children}</h2>;
}

export default function TeacherDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: teacher, isLoading, error } = useTeacherDetail(id);

  if (isLoading) return <div className="text-sm text-slate-400">불러오는 중...</div>;
  if (error || !teacher)
    return <div className="text-sm text-red-500">강사 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-5xl space-y-5">
      {/* 프로필 카드 */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0069A8] flex items-center justify-center text-white text-lg font-bold shrink-0">
            {teacher.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{teacher.name}</h1>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${TEACHER_STATUS_STYLE[teacher.status]}`}>
                {TEACHER_STATUS_LABEL[teacher.status]}
              </span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">
              {teacher.email} · {teacher.phone}
            </p>
          </div>
        </div>
      </Card>

      {/* 기본 정보 + 급여 (2열) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <CardTitle>기본 정보</CardTitle>
          <dl className="grid grid-cols-[80px_1fr] gap-y-3 text-[13px]">
            <dt className="text-slate-400">이메일</dt>
            <dd className="text-slate-700">{teacher.email}</dd>
            <dt className="text-slate-400">연락처</dt>
            <dd className="text-slate-700">{teacher.phone}</dd>
            <dt className="text-slate-400">재직상태</dt>
            <dd className="text-slate-700">{TEACHER_STATUS_LABEL[teacher.status]}</dd>
          </dl>
        </Card>

        <Card className="p-6">
          <CardTitle>급여</CardTitle>
          {!teacher.salary ? (
            <p className="text-[13px] text-slate-400">급여 정보가 없습니다.</p>
          ) : (
            <dl className="grid grid-cols-[80px_1fr] gap-y-3 text-[13px]">
              <dt className="text-slate-400">기본급</dt>
              <dd className="text-slate-700">{formatWon(teacher.salary.baseSalary)}</dd>
              <dt className="text-slate-400">보너스</dt>
              <dd className="text-slate-700">{formatWon(teacher.salary.bonus)}</dd>
              <dt className="text-slate-400">지급일</dt>
              <dd className="text-slate-700">{teacher.salary.paymentDate ?? "-"}</dd>
              <dt className="text-slate-400">상태</dt>
              <dd className="text-slate-700">{SALARY_STATUS_LABEL[teacher.salary.status]}</dd>
            </dl>
          )}
        </Card>
      </div>

      {/* 담당 강좌 */}
      <Card className="p-6">
        <CardTitle>담당 강좌 ({teacher.classes.length})</CardTitle>
        {teacher.classes.length === 0 ? (
          <p className="text-[13px] text-slate-400">담당 중인 강좌가 없습니다.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="pb-2.5 font-medium">강좌명</th>
                <th className="pb-2.5 font-medium text-right">수강료</th>
                <th className="pb-2.5 font-medium text-right">원생 수</th>
                <th className="pb-2.5 font-medium text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {teacher.classes.map((cls) => (
                <tr key={cls.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 text-slate-700">{cls.name}</td>
                  <td className="py-2.5 text-right text-slate-600">{formatWon(cls.fee)}</td>
                  <td className="py-2.5 text-right text-slate-600">{cls.studentCount}명</td>
                  <td className="py-2.5 text-center text-slate-500">{CLASS_STATUS_LABEL[cls.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* 최근 근태 */}
      <Card className="p-6">
        <CardTitle>최근 근태</CardTitle>
        {teacher.recentAttendance.length === 0 ? (
          <p className="text-[13px] text-slate-400">근태 기록이 없습니다.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="pb-2.5 font-medium">날짜</th>
                <th className="pb-2.5 font-medium text-center">출근</th>
                <th className="pb-2.5 font-medium text-center">퇴근</th>
              </tr>
            </thead>
            <tbody>
              {teacher.recentAttendance.map((record) => (
                <tr key={record.workDate} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 text-slate-700">{record.workDate}</td>
                  <td className="py-2.5 text-center text-slate-600">{record.checkInTime ?? "-"}</td>
                  <td className="py-2.5 text-center text-slate-600">{record.checkOutTime ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}