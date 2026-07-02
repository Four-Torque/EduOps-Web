// Schedule_TB + Class_TB 기반 주간 반복 시간표

// 한 주에 반복되는 수업 1칸
export interface ScheduleItem {
  id: number; // Schedule_TB.id
  classId: number; // Class_TB.id
  className: string; // Class_TB.name
  dayOfWeek: number; // 0(일) ~ 6(토)
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

// Schedule-X가 요구하는 이벤트 형태 (실제 날짜가 박힌 형태)
export interface CalendarEvent {
  id: string | number;
  title: string;
  start: string; // "YYYY-MM-DD HH:mm"
  end: string; // "YYYY-MM-DD HH:mm"
}