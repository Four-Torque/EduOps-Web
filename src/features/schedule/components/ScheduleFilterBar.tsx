// @/components/manager/academic/schedule/ScheduleFilterBar.tsx
"use client";

import { useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useScheduleStore } from "../store";
import { useAllClasses } from "../query";
import { useTeachers } from "@/features/user/query";
import type { ClassInfo } from "@/features/class/type";
import { useFindSubjects } from "@/features/subject/query";
import { Subject } from "@/features/subject/type";

export function ScheduleFilterBar() {
  const {
    room,
    instructor,
    subject,
    setRoom,
    setInstructor,
    setSubject,
    clearFilters,
    onCreateOpen,
  } = useScheduleStore();

  // 강의실 목록은 별도 엔티티가 없어서, 실제 등록된 강좌들의 스케줄에서
  // 쓰이고 있는 room 값을 모아 중복 제거해 만든다 (하드코딩 목업 대신 실데이터 기반).
  const { data: classes = [] } = useAllClasses();
  const roomOptions = useMemo(() => {
    const rooms = new Set<string>();
    (classes as ClassInfo[]).forEach((cls) =>
      cls.schedules?.forEach((s) => rooms.add(s.room)),
    );
    return [
      { value: "all", label: "강의장: 전체" },
      ...Array.from(rooms)
        .sort()
        .map((r) => ({ value: r, label: r })),
    ];
  }, [classes]);

  // 강사 목록은 실제 강사 관리 API(useTeachers)에서 그대로 가져온다.
  const { data: teachers = [] } = useTeachers();
  const instructorOptions = useMemo(
    () => [
      { value: "all", label: "강사: 전체" },
      ...teachers.map((t) => ({ value: t.name, label: t.name })),
    ],
    [teachers],
  );

  const { data: subjects = [] } = useFindSubjects();
  const subjectOptions = useMemo(
    () => [
      { value: "all", label: "과목: 전체" },
      ...subjects.map((s: Subject) => ({ value: s.id, label: s.name })),
    ],
    [subjects],
  );

  return (
    <div className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-2 mb-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-500">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium">필터:</span>
        </div>

        <Select value={room} onValueChange={setRoom}>
          <SelectTrigger className="text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roomOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={instructor} onValueChange={setInstructor}>
          <SelectTrigger className="text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {instructorOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjectOptions.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(subject !== "all" || room !== "all" || instructor !== "all") && (
          <button
            onClick={clearFilters}
            className="text-[12px] text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            초기화
          </button>
        )}
      </div>

      <button
        onClick={onCreateOpen}
        className="text-[11.5px] font-medium text-white bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700 transition-colors cursor-pointer"
      >
        + 추가
      </button>
    </div>
  );
}
