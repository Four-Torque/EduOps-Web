"use client";

import { useState } from "react";
import { useTeachers } from "@/hooks/manager/teacher.hooks";
import { CardModal } from "@/components/common/CardModal";
import TeacherDetail from "@/components/manager/teacher/TeacherDetail";
import type { TeacherStatus } from "@/types/manager/teacher.types";

const STATUS_LABEL: Record<TeacherStatus, string> = {
  ACTIVE: "재직",
  INACTIVE: "휴직",
  LEAVE: "퇴사",
};

const STATUS_STYLE: Record<TeacherStatus, string> = {
  ACTIVE: "bg-[#0069A8]/10 text-[#0069A8]",
  INACTIVE: "bg-amber-50 text-amber-600",
  LEAVE: "bg-slate-100 text-slate-400",
};

export default function TeacherMgmtPage() {
  const { data: teachers, isLoading, error } = useTeachers();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) return <div className="p-8 text-sm text-slate-400">불러오는 중...</div>;
  if (error) return <div className="p-8 text-sm text-red-500">목록을 불러오지 못했습니다.</div>;

  return (
    <div className="p-1 overflow-x-auto">
      <table className="w-full max-w-4xl min-w-[720px] table-fixed text-sm">
        <colgroup>
          <col className="w-[140px]" />
          <col className="w-[150px]" />
          <col className="w-[150px]" />
          <col className="w-[110px]" />
          <col className="w-[110px]" />
          <col className="w-[90px]" />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2.5 font-medium">이름</th>
            <th className="py-2.5 font-medium">연락처</th>
            <th className="py-2.5 font-medium">이메일</th>
            <th className="py-2.5 font-medium">담당 강좌</th>
            <th className="py-2.5 font-medium">담당 원생</th>
            <th className="py-2.5 font-medium">상태</th>
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher) => (
            <tr
              key={teacher.id}
              onClick={() => setSelectedId(teacher.id)}
              className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
            >
              <td className="py-3 font-medium text-[#0069A8] truncate">{teacher.name}</td>
              <td className="py-3 text-slate-600 truncate">{teacher.phone}</td>
              <td className="py-3 text-slate-600 truncate">{teacher.email}</td>
              <td className="py-3 text-slate-600 ">{teacher.classCount}개</td>
              <td className="py-3 text-slate-600">{teacher.studentCount}명</td>
              <td className="py-3">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[teacher.status]}`}>
                  {STATUS_LABEL[teacher.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CardModal
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        title="강사 상세"
        size="lg"
        bodyClassName="bg-slate-50"
      >
        {selectedId !== null && <TeacherDetail id={selectedId} />}
      </CardModal>
    </div>
  );
}