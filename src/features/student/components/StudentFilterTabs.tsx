"use client";

import { useStudentStore } from "@/features/student/store";
import type { StudentTabFilter } from "@/features/student/type";

const TABS: StudentTabFilter[] = ["전체", "학생", "졸업생 / 비활동 회원"];

export function StudentFilterTabs() {
  const { tab, setTab } = useStudentStore();

  return (
    <div className="flex gap-1 px-4 pt-3 border-b border-slate-200">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={[
            "px-3 py-2 text-[12.5px] font-medium border-b-2 transition-colors",
            tab === t
              ? "text-slate-900 border-slate-800"
              : "text-slate-400 border-transparent hover:text-slate-600",
          ].join(" ")}
        >
          {t}
        </button>
      ))}
    </div>
  );
}