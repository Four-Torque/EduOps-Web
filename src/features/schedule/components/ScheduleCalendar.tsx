"use client";

import { useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, calendarMessages } from "@/shared/lib/calendar-localizer";
import { useScheduleStore } from "../store";
import { ScheduleEvent } from "../type";
import { ScheduleClassDetailModal } from "./ScheduleClassDetailModal";

interface ScheduleCalendarProps {
  events?: ScheduleEvent[];
}

export function ScheduleCalendar({ events = [] }: ScheduleCalendarProps) {
  const { view, date, setView, setDate } = useScheduleStore();

  // 같은 시간대 일정을 강의실(room) 기준 컬럼으로 나눠서 겹침 없이 보여준다.
  const resources = useMemo(() => {
    const rooms = Array.from(new Set(events.map((event) => event.room)));
    return rooms.map((room) => ({ id: room, title: room }));
  }, [events]);

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSelectEvent = (event: ScheduleEvent) => {
    setSelectedClassId(event.classId);
    setIsDetailOpen(true);
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white h-[700px]">
      <Calendar<ScheduleEvent>
        localizer={localizer}
        culture="ko"
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        views={["week", "month", "day"]}
        messages={calendarMessages}
        resources={resources.length > 1 ? resources : undefined}
        resourceAccessor="room"
        min={new Date(1970, 0, 1, 9, 0)} // 09:00부터
        max={new Date(1970, 0, 1, 23, 59)} // 23:59(밤 11시 칸까지, 자정 넘어가는 걸 피하려고 59분으로 설정)
        step={60}
        timeslots={1}
        onSelectEvent={handleSelectEvent}
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
      <ScheduleClassDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        classId={selectedClassId}
      />
    </div>
  );
}
