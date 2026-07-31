"use client";

import { useSyllabuses } from "../query";
import { SyllabusListTable } from "./SyllabusListTable";

export function SyllabusDashboard() {
  const { data: response, isLoading } = useSyllabuses(1, 100);
  const syllabuses = response?.data || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      <SyllabusListTable syllabuses={syllabuses} isLoading={isLoading} />
    </div>
  );
}
