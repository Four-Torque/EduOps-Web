export interface ScheduleEvent {
  id: string;
  title: string;          // 물리 수능대비반
  instructor: string;     // Dr. DRE
  room: string;           // 203호
   start: Date;   // ← Date 객체로 변경
  end: Date;     // ← Date 객체로 변경
}

export interface ScheduleResponse {
  events: ScheduleEvent[];
}