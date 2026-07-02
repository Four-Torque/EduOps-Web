"use client";

import Link from "next/link";
import { useTeachers } from "@/hooks/manager/teacher.hooks";
import { useUIStore } from "@/store/ui.store";
import type { TeacherStatus } from "@/types/manager/teacher.types";

const STATUS_LABEL: Record<TeacherStatus, string> = {
  ACTIVE: "재직",
  INACTIVE: "휴직",
  LEAVE: "퇴사",
};

const STATUS_STYLE: Record<TeacherStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600",
  INACTIVE: "bg-amber-50 text-amber-600",
  LEAVE: "bg-slate-100 text-slate-400",
};

export default function TeacherMgmtPage() {
  const { data: teachers, isLoading, error } = useTeachers();
  const addTab = useUIStore((s) => s.addTab);

  if (isLoading) return <div className="p-8 text-sm text-slate-400">불러오는 중...</div>;
  if (error) return <div className="p-8 text-sm text-red-500">목록을 불러오지 못했습니다.</div>;

  return (
    <div className="p-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2.5 font-medium">이름</th>
            <th className="py-2.5 font-medium">연락처</th>
            <th className="py-2.5 font-medium">이메일</th>
            <th className="py-2.5 font-medium text-right">담당 강좌</th>
            <th className="py-2.5 font-medium text-right">담당 원생</th>
            <th className="py-2.5 font-medium text-center">상태</th>
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher) => (
            <tr key={teacher.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-3">
                <Link
                  href={`/teacher-mgmt/${teacher.id}`}
                  onClick={() => addTab({ label: teacher.name, href: `/teacher-mgmt/${teacher.id}` })}
                  className="font-medium text-[#0069A8] hover:underline"
                >
                  {teacher.name}
                </Link>
              </td>
              <td className="py-3 text-slate-600">{teacher.phone}</td>
              <td className="py-3 text-slate-600">{teacher.email}</td>
              <td className="py-3 text-right text-slate-600">{teacher.classCount}개</td>
              <td className="py-3 text-right text-slate-600">{teacher.studentCount}명</td>
              <td className="py-3 text-center">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE[teacher.status]}`}>
                  {STATUS_LABEL[teacher.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}