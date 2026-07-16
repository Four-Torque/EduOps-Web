import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";

const locales = { ko };

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // 월요일 시작
  getDay,
  locales,
});

// react-big-calendar 툴바("Today"/"Back"/"Next"/"Month"/"Week"/"Day" 등) 한글화
export const calendarMessages = {
  date: "날짜",
  time: "시간",
  event: "일정",
  allDay: "종일",
  week: "주",
  work_week: "근무 주",
  day: "일",
  month: "월",
  previous: "이전",
  next: "다음",
  yesterday: "어제",
  tomorrow: "내일",
  today: "오늘",
  agenda: "일정 목록",
  noEventsInRange: "해당 기간에 일정이 없습니다.",
  showMore: (total: number) => `+${total}개 더보기`,
};