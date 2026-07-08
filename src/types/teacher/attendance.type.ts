export type AttendanceStatus = "ATTENDED" | "TARDY" | "ABSENT" | "LEFT_EARLY" | null;

export interface ClassStudentAttendance {
  studentId: string;
  studentName: string;
  studentPhone: string;
  attendanceId: string | null;
  lectureDate: string | null;
  status: "ATTENDED" | "ABSENT" | "TARDY" | "LEFT_EARLY" | null;
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  status: AttendanceStatus;
}