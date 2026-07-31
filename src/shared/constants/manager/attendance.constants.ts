import type { DepartmentType } from "@/features/attendance/type";

export const ATTENDANCE_PAGE_SIZE = 8;

export const MONTH_OPTIONS = [
  "1월 2025년", "2월 2025년", "3월 2025년", "4월 2025년",
  "5월 2025년", "6월 2025년", "7월 2025년", "8월 2025년",
  "9월 2025년", "10월 2025년", "11월 2025년", "12월 2025년",
  "1월 2026년", "2월 2026년", "3월 2026년", "4월 2026년",
  "5월 2026년", "6월 2026년", "7월 2026년", "8월 2026년",
  "9월 2026년", "10월 2026년", "11월 2026년", "12월 2026년",
];

export const DEPARTMENT_OPTIONS: { label: string; value: DepartmentType }[] = [
  { label: "전체",   value: "전체" },
  { label: "강사",   value: "강사" },
  { label: "관리자", value: "관리자" },
];

export const DAYS = ["월", "화", "수", "목", "금"] as const;
