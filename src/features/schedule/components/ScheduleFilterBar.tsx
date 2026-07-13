// @/components/manager/academic/schedule/ScheduleFilterBar.tsx
"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  SCHEDULE_ROOM_OPTIONS,
  SCHEDULE_INSTRUCTOR_OPTIONS,
  SCHEDULE_SUBJECT_OPTIONS,
} from "@/shared/constants/manager/schedule.constants";
import { useScheduleStore } from "../store";

export function ScheduleFilterBar() {
  const {
    room,
    instructor,
    subject,
    setRoom,
    setInstructor,
    setSubject,
    clearFilters,
  } = useScheduleStore();

  return (
    <div className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-2 mb-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-500">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium">Filters:</span>
        </div>

        <Select value={room} onValueChange={setRoom}>
          <SelectTrigger className="w-[110px] text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SCHEDULE_ROOM_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={instructor} onValueChange={setInstructor}>
          <SelectTrigger className="w-[90px] text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SCHEDULE_INSTRUCTOR_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[110px] text-[12px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SCHEDULE_SUBJECT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={clearFilters}
        className="text-[12px] text-slate-500 hover:text-slate-700 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
