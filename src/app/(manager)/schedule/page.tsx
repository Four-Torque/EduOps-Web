"use client";

import { useMemo } from "react";
import { ScheduleFilterBar } from "@/features/schedule/components/ScheduleFilterBar";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar";
import { useWeeklySchedule } from "@/features/schedule/query";
import { useScheduleStore } from "@/features/schedule/store";
import { startOfWeek, addDays, eachDayOfInterval, getDay } from "date-fns";
import { isWithinDateRange } from "@/shared/lib/utils";

export default function SchedulePage() {
  const { date: activeDate, room, instructor, subject } = useScheduleStore();
  const { data: scheduleItems = [], isLoading } = useWeeklySchedule(
    room,
    instructor,
    subject,
  );

  // 캘린더(calendar-localizer.ts)가 월요일 시작으로 렌더링하므로, 여기서도
  // 반드시 같은 기준으로 주를 잡아야 한다 — 기준이 어긋나면 그 차이만큼
  // 특정 요일의 계산된 날짜가 캘린더가 그리는 주 범위 밖으로 밀려나 안 보이게 된다.
  const activeWeekDays = useMemo(() => {
    const monday = startOfWeek(activeDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: monday, end: addDays(monday, 6) });
  }, [activeDate]);

  const events = useMemo(() => {
    return scheduleItems
      .flatMap((item) => {
        // item.dayOfWeek: 0(일)~6(토), JS Date.getDay()와 동일 기준으로 실제 날짜를 찾는다.
        const startDay = activeWeekDays.find((d) => getDay(d) === item.dayOfWeek);
        if (!startDay) return [];
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
  }, [scheduleItems, activeWeekDays]);

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
