"use client";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/shared/lib/calendar-localizer";
import { useScheduleStore } from "../store";
import { ScheduleEvent } from "../type";
import { useDeleteSchedule } from "../query";
import { useConfirm } from "@/shared/hooks/useConfirm";

interface ScheduleCalendarProps {
  events?: ScheduleEvent[];
}

export function ScheduleCalendar({ events = [] }: ScheduleCalendarProps) {
  const { view, date, setView, setDate } = useScheduleStore();
  const { mutate: deleteEvent } = useDeleteSchedule();

  const [ConfirmDialog, confirm] = useConfirm(
    "정말 이 시간표 항목을 삭제하시겠습니까?",
    "삭제된 스케줄 정보는 복구할 수 없습니다.",
  );

  const handleSelectEvent = async (event: ScheduleEvent) => {
    const ok = await confirm();
    if (ok) {
      deleteEvent(event.id);
    }
  };

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
      <ConfirmDialog />
    </div>
  );
}
