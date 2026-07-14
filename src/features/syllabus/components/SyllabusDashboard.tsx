"use client";

import { useSyllabuses } from "../query";
import { CreateSyllabusModal } from "./CreateSyllabusModal";
import { SyllabusListTable } from "./SyllabusListTable";

export function SyllabusDashboard() {
  const { data: response, isLoading } = useSyllabuses(1, 100);
  const syllabuses = response?.data || [];

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-800">강의계획서 관리</h1>
          <p className="text-sm text-slate-500">
            새로운 강좌 개설을 위한 계획서를 제출하고 승인 상태를 확인합니다.
          </p>
        </div>
        <CreateSyllabusModal />
      </div>

      <SyllabusListTable syllabuses={syllabuses} isLoading={isLoading} />
    </div>
  );
}
