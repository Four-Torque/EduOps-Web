"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek, createViewDay } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import type { CalendarEvent } from "@/types/teacher/schedule.types";

interface ScheduleCalendarProps {
  events: CalendarEvent[];
}

export default function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  // useNextCalendarApp: Next.js(SSR)에서 hydration 문제 없이 캘린더를 초기화하는 훅.
  // events가 이미 로드된 뒤에 이 컴포넌트를 렌더해야 초기 이벤트가 정상 반영된다.
  const calendar = useNextCalendarApp({
    views: [createViewWeek(), createViewDay()],
    defaultView: "week",
    events,
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
}