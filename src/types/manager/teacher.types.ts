// ERD 기준 강사(User_TB, role=TEACHER) 관련 타입

export type TeacherStatus = "ACTIVE" | "INACTIVE" | "LEAVE"; // 재직, 휴직, 퇴사
export type ClassStatus = "OPEN" | "CLOSE";
export type SalaryStatus = "PENDING" | "COMPLETE";

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: TeacherStatus;
  hireDate: string; // 근무 시작일 (YYYY-MM-DD)
  leaveDate: string | null; // 퇴사일 (재직 중이면 null)
}

// 담당 강좌 (Class_TB + enrollments 집계)
export interface TeacherClass {
  id: number;
  name: string;
  fee: number;
  status: ClassStatus;
  startDate: string | null;
  endDate: string | null;
  studentCount: number;
}

// 급여 (salaries)
export interface TeacherSalary {
  baseSalary: number;
  bonus: number;
  paymentDate: string | null;
  status: SalaryStatus;
}

// 근태 1일 기록 (staff_attendance)
export interface TeacherAttendanceRecord {
  workDate: string; // YYYY-MM-DD
  checkInTime: string | null;
  checkOutTime: string | null;
}

// 목록 행: 기본 정보 + 집계값
export interface TeacherListItem extends Teacher {
  classCount: number;
  studentCount: number;
}

// 상세: 기본 정보 + 담당 강좌 + 급여 + 최근 근태
export interface TeacherDetail extends Teacher {
  classes: TeacherClass[];
  salary: TeacherSalary | null;
  recentAttendance: TeacherAttendanceRecord[];
}