// @/components/manager/academic/schedule/ScheduleCalendar.tsx
"use client";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/shared/lib/calendar-localizer";
import { useScheduleStore } from "../store";
import { ScheduleEvent } from "../type";

interface ScheduleCalendarProps {
  // 외부(각 page)에서 이미 조회/변환해 넣어주는 이벤트 목록. 이 컴포넌트는 데이터를
  // 직접 가져오지 않는다 — 관리자/강사 페이지가 서로 다른 범위의 데이터를 넣어 재사용한다.
  events?: ScheduleEvent[];
}

export function ScheduleCalendar({ events = [] }: ScheduleCalendarProps) {
  const { view, date, setView, setDate } = useScheduleStore();

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
        min={new Date(1970, 0, 1, 9, 0)} // 09:00부터
        max={new Date(1970, 0, 1, 18, 0)} // 18:00까지
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
              <p className="opacity-70">
                {event.instructor} · {event.room}
              </p>
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
