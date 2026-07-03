// @/components/manager/academic/schedule/ScheduleCalendar.tsx
"use client";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/lib/calendar-localizer";
import { useSchedule } from "@/hooks/manager/schedule.hooks";
import { useScheduleStore } from "@/store/manager/schedule.store";
import type { ScheduleEvent } from "@/types/manager/schedule.types";

export function ScheduleCalendar() {
  const { data, isLoading } = useSchedule();
  const { view, date, setView, setDate } = useScheduleStore();

  const events = data?.events ?? [];

  if (isLoading) {
    return <p className="text-center text-[12px] text-slate-400 py-8">불러오는 중...</p>;
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white h-[700px]">
      <Calendar<ScheduleEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        views={["week", "month", "day"]}
        min={new Date(1970, 0, 1, 9, 0)}   // 09:00부터
        max={new Date(1970, 0, 1, 18, 0)}  // 18:00까지
        step={60}
        timeslots={1}
        // 이벤트 클릭
        onSelectEvent={(event) => {
          console.log("이벤트 클릭:", event);
          // TODO: 수정 모달 열기
        }}
        // 커스텀 이벤트 렌더링 (강사/강의실 표시)
        components={{
          event: ({ event }) => (
            <div className="text-[10px] leading-tight">
              <p className="font-semibold">{event.title}</p>
              <p className="opacity-70">{event.instructor} · {event.room}</p>
            </div>
          ),
        }}
        // 이벤트 스타일
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#e2e8f0",
            border: "1px solid #cbd5e1",
            color: "#1e293b",
            borderRadius: "4px",
            fontSize: "10px",
          },
        })}
      />
    </div>
  );
}