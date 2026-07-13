export type AttendanceStatus = "present" | "late" | "absent";
export type DepartmentType = "강사" | "관리자" | "전체";

export interface AttendanceDay {
  day: "월" | "화" | "수" | "목" | "금";
  status: AttendanceStatus;
  checkedOut?: boolean;
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
  weekStart?: string;
}

// =============================================================================== //
// 학생 출결 관련 Type
// =============================================================================== //

export type StudentAttendanceStatus = "ATTENDED" | "TARDY" | "ABSENT" | "LEFT_EARLY" | null;

export interface ClassStudentAttendance {
  studentId: string;
  studentName: string;
  studentPhone: string;
  attendanceId: string | null;
  lectureDate: string | null;
  status: "ATTENDED" | "ABSENT" | "TARDY" | "LEFT_EARLY" | null;
}

export interface StudentAttendance {
  id: string;
  name: string;
  phone: string;
  status: StudentAttendanceStatus;
}