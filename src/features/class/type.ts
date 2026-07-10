// @/types/manager/course.types.ts

export type CourseLevelFilter = "all" | "available" | "full";

export interface Course {
  id: string;
  title: string;              // 미적분 II (수능 대비반)
  tags: string[];            // ["수학", "고급반"]
  isFull: boolean;           // Full 표시 여부
  instructor: string;        // Dr. DRE 강사
  schedule: string;          // 월, 수, 금 / 10:00 - 11:30
  room: string;              // 205호
  currentStudents: number;   // 24
  maxStudents: number;       // 30
}

export interface CourseListResponse {
  items: Course[];
  totalItems: number;
  totalPages: number;
}

// 강좌 안에 중첩된 요일 반복 시간표 1칸 (GET /class 응답의 schedules[])
export interface ClassSchedule {
  id: string;
  classId: string;
  dayOfWeek: number; // 0(일) ~ 6(토)
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  room: string;
}

export interface ClassInfo {
  id: string;
  teacherId: string;
  name: string;
  fee: number;
  capacity: number;
  startDate: string | null;
  endDate: string | null;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  schedules: ClassSchedule[];
}

export interface PaginatedClassResponse {
  page: number;
  total: number;
  data: ClassInfo[];
}