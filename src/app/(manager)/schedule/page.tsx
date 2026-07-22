"use client";

import { useMemo } from "react";
import { ScheduleFilterBar } from "@/features/schedule/components/ScheduleFilterBar";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar";
import { useWeeklySchedule } from "@/features/schedule/query";
import { useScheduleStore } from "@/features/schedule/store";
import { startOfWeek, addDays } from "date-fns";
import { isWithinDateRange } from "@/shared/lib/utils";

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
    return scheduleItems
      .flatMap((item) => {
        const startDay = addDays(startOfActiveWeek, item.dayOfWeek);
        if (!isWithinDateRange(startDay, item.classStartDate, item.classEndDate)) return [];

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

        return [
          {
            id: item.id,
            classId: item.classId,
            title: item.className,
            instructor: item.instructor,
            room: item.room,
            start: new Date(startStr),
            end: new Date(endStr),
          },
        ];
      });
  }, [scheduleItems, startOfActiveWeek]);

  if (isLoading) {
    return (
      <p className="text-[12.5px] text-slate-400">시간표 불러오는 중...</p>
    );
  }

  return (
    <>
      <ScheduleFilterBar />
      <ScheduleCalendar events={events} />
    </>
  );
}
