import type { ScheduleItem, CalendarEvent } from "@/types/teacher/schedule.types";

function formatYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 주간 반복 시간표(요일 기반)를 특정 주의 실제 날짜 이벤트로 변환한다.
// baseDate가 속한 주의 일요일을 기준으로 각 요일의 날짜를 계산한다.
export function toCalendarEvents(
  items: ScheduleItem[],
  baseDate: Date = new Date(),
): CalendarEvent[] {
  const sunday = new Date(baseDate);
  sunday.setDate(baseDate.getDate() - baseDate.getDay()); // 이번 주 일요일(0)

  return items.map((item) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + item.dayOfWeek);
    const ymd = formatYmd(date);
    return {
      id: item.id,
      title: item.className,
      start: `${ymd} ${item.startTime}`,
      end: `${ymd} ${item.endTime}`,
    };
  });
}