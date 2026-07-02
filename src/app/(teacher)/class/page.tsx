"use client";

import { useWeeklySchedule } from "@/hooks/teacher/schedule.hooks";
import { toCalendarEvents } from "@/utils/schedule";
import ScheduleCalendar from "@/components/teacher/schedule/ScheduleCalendar";

export default function ClassPage() {
  const { data: schedule, isLoading, error } = useWeeklySchedule();

  if (isLoading)
    return <div className="p-8 text-sm text-slate-400">불러오는 중...</div>;
  if (error || !schedule)
    return <div className="p-8 text-sm text-red-500">시간표를 불러오지 못했습니다.</div>;

  const events = toCalendarEvents(schedule);

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">수업 시간표</h1>
      <div className="flex-1 min-h-0">
        <ScheduleCalendar events={events} />
      </div>
    </div>
  );
}