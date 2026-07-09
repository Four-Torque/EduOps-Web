export type AttendanceStatus = "present" | "late" | "absent";
export type DepartmentType = "강사" | "관리자" | "전체";

export interface AttendanceDay {
  day: "월" | "화" | "수" | "목" | "금";
  status: AttendanceStatus;
}

export interface AttendanceEmployee {
  id: number;
  employeeCode: string;
  name: string;
  avatarInitial: string;
  department: string;
  weeklyAttendance: AttendanceDay[];
}

export interface AttendanceStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateOrEtc: number;
}

export interface AttendanceListResponse {
  items: AttendanceEmployee[];
  totalItems: number;
  totalPages: number;
}

export interface AttendanceFilter {
  month: string;
  department: DepartmentType;
  search: string;
  page: number;
}
