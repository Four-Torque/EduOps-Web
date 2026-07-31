import type {
  AttendanceEmployee,
  AttendanceStats,
  DepartmentType,
} from "@/features/attendance/type";

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

export const MOCK_ATTENDANCE_STATS: AttendanceStats = {
  totalEmployees: 142,
  presentToday:   135,
  absentToday:    4,
  lateOrEtc:      3,
};

export const MOCK_ATTENDANCE_EMPLOYEES: AttendanceEmployee[] = [
  {
    id: 1,
    employeeCode: "EMP-1042",
    name: "하인수",
    avatarInitial: "SK",
    department: "강사",
    weeklyAttendance: [
      { day: "월", status: "present" },
      { day: "화", status: "present" },
      { day: "수", status: "present" },
      { day: "목", status: "present" },
      { day: "금", status: "present" },
    ],
  },
  {
    id: 2,
    employeeCode: "EMP-1088",
    name: "이성재",
    avatarInitial: "JL",
    department: "관리자",
    weeklyAttendance: [
      { day: "월", status: "present" },
      { day: "화", status: "present" },
      { day: "수", status: "present" },
      { day: "목", status: "absent"  },
      { day: "금", status: "present" },
    ],
  },
  {
    id: 3,
    employeeCode: "EMP-1102",
    name: "박찬호",
    avatarInitial: "MP",
    department: "강사",
    weeklyAttendance: [
      { day: "월", status: "late"    },
      { day: "화", status: "late"    },
      { day: "수", status: "present" },
      { day: "목", status: "present" },
      { day: "금", status: "present" },
    ],
  },
];
