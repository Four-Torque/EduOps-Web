"use client";

import { useMemo } from "react";
import { ScheduleHeader } from "@/features/schedule/components/ScheduleHeader";
import { ScheduleFilterBar } from "@/features/schedule/components/ScheduleFilterBar";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar";
import { useWeeklySchedule } from "@/features/schedule/query";
import { useScheduleStore } from "@/features/schedule/store";
import { startOfWeek, addDays } from "date-fns";

export default function SchedulePage() {
  const { date: activeDate, room, instructor, subject } = useScheduleStore();
  const { data: scheduleItems = [], isLoading } = useWeeklySchedule(
    room,
    instructor,
    subject,
  );

  const startOfActiveWeek = useMemo(() => {
    return startOfWeek(activeDate, { weekStartsOn: 0 });
  }, [activeDate]);

  const events = useMemo(() => {
    return scheduleItems.map((item) => {
      const startDay = addDays(startOfActiveWeek, item.dayOfWeek);
      const startStr = `${startDay.getFullYear()}-${String(
        startDay.getMonth() + 1,
      ).padStart(2, "0")}-${String(startDay.getDate()).padStart(
        2,
        "0",
      )}T${item.startTime}:00`;
      const endStr = `${startDay.getFullYear()}-${String(
        startDay.getMonth() + 1,
      ).padStart(2, "0")}-${String(startDay.getDate()).padStart(
        2,
        "0",
      )}T${item.endTime}:00`;

      return {
        id: item.id,
        classId: item.classId,
        title: item.className,
        instructor: item.instructor,
        room: item.room,
        start: new Date(startStr),
        end: new Date(endStr),
      };
    });
  }, [scheduleItems, startOfActiveWeek]);

  if (isLoading) {
    return (
      <p className="text-[12.5px] text-slate-400">시간표 불러오는 중...</p>
    );
  }

  return (
    <div>
      <ScheduleHeader />
      <ScheduleFilterBar />
      <ScheduleCalendar events={events} />
    </div>
  );
}
