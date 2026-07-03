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