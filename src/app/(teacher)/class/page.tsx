"use client";

import { useMemo } from "react";
import type { View } from "react-big-calendar";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useSession } from "@/shared/hooks/useSession";
import { useTeacherClasses } from "@/features/attendance/query";
import type { ClassInfo } from "@/features/class/type";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar";
import { useScheduleStore } from "@/features/schedule/store";
import type { ScheduleEvent } from "@/features/schedule/type";

function toTimeOfDay(base: Date, time: string): Date {
  const [hour, minute] = time.split(":").map(Number);
  return setMinutes(setHours(base, hour), minute);
}

// 현재 화면(주/월/일)에 실제로 보이는 날짜 범위. 월 뷰는 앞뒤로 걸치는 주까지 포함해야
// react-big-calendar가 그리는 달력 칸 전체를 채울 수 있다.
function getVisibleRange(view: View, date: Date): { start: Date; end: Date } {
  if (view === "month") {
    return {
      start: startOfWeek(startOfMonth(date), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(date), { weekStartsOn: 1 }),
    };
  }
  if (view === "week") {
    return {
      start: startOfWeek(date, { weekStartsOn: 1 }),
      end: endOfWeek(date, { weekStartsOn: 1 }),
    };
  }
  return { start: date, end: date };
}

// 강좌별 요일 반복 시간표(ClassInfo.schedules)를 화면에 보이는 기간 안의 실제
// 날짜/시간 이벤트로 변환한다. 매주 반복되는 수업이라 기간 내 요일 수만큼 펼쳐진다.
function toScheduleEvents(
  classes: ClassInfo[],
  range: { start: Date; end: Date },
  instructor: string,
): ScheduleEvent[] {
  const days = eachDayOfInterval(range);

  return classes.flatMap((cls) =>
    (cls.schedules ?? []).flatMap((schedule) =>
      days
        .filter((day) => {
          const jsDay = getDay(day); // 0 (Sun) ~ 6 (Sat)
          const mappedDay = jsDay === 0 ? 6 : jsDay - 1; // 0 (Mon) ~ 6 (Sun)
          return mappedDay === schedule.dayOfWeek;
        })
        .map((day) => ({
          id: `${schedule.id}-${day.toISOString()}`,
          title: cls.name,
          instructor,
          room: schedule.room,
          start: toTimeOfDay(day, schedule.startTime),
          end: toTimeOfDay(day, schedule.endTime),
        })),
    ),
  );
}

export default function ClassPage() {
  const { data: session } = useSession();
  const teacherId = session?.id ?? "";

  const { data: classesRes, isLoading } = useTeacherClasses(teacherId);
  const { view, date } = useScheduleStore();

  const events = useMemo(() => {
    if (!classesRes) return [];
    return toScheduleEvents(
      classesRes.data,
      getVisibleRange(view, date),
      session?.name ?? "",
    );
  }, [classesRes, view, date, session?.name]);

  if (isLoading) {
    return (
      <p className="text-center text-[12px] text-slate-400 py-8">
        불러오는 중...
      </p>
    );
  }

  return (
    <div>
      <ScheduleCalendar events={events} />
    </div>
  );
}
