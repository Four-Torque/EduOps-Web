export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE" | "LEAVED";
};

export type UserRole = "DIRECTOR" | "TEACHER" | "MANAGER";

export type UserApprovalStatus = "pending";
export type UserRoleType = "선생님" | "관리자";
export type UserTabFilter = "all" | UserApprovalStatus;

export interface DirectorUser {
  id: number;
  name: string;
  phone: string;
  requestedAt: string;
  role: UserRoleType;
  status: UserApprovalStatus;
}

export interface DirectorUserListResponse {
  items: DirectorUser[];
  totalItems: number;
  totalPages: number;
}

// ERD 기준 강사(User_TB, role=TEACHER) 관련 타입
// id는 백엔드(UUID 문자열) 기준을 따른다.

export type TeacherStatus = "WORKING" | "RESIGNED" | "ON_LEAVE"; // 재직, 휴직, 퇴사
export type SalaryStatus = "PENDING" | "COMPLETED";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: TeacherStatus;
  hireDate: string; // 근무 시작일 (YYYY-MM-DD)
  leaveDate: string | null; // 퇴사일 (재직 중이면 null)
}

// 급여 (GET /salary?userId=&status=)
export interface TeacherSalary {
  id: string; // PATCH /salary/{id}로 이 레코드를 직접 수정할 때 필요
  baseSalary: number;
  bonus: number;
  paymentDate: string | null;
  status: SalaryStatus;
}

// 근태 1일 기록 (GET /staff-attendance?userId=)
export interface TeacherAttendanceRecord {
  workDate: string; // YYYY-MM-DD
  checkInTime: string | null;
  checkOutTime: string | null;
}

// 목록 행: 기본 정보
export type TeacherListItem = Teacher;

// 상세: 기본 정보 + 급여 목록 + 최근 근태 (여러 API를 조합해 구성)
export interface TeacherDetail extends Teacher {
  salaries: TeacherSalary[]; // 한 강사에게 PENDING이 여러 건 있을 수 있어 배열로 관리
  recentAttendance: TeacherAttendanceRecord[];
}

// 강사 기본 정보 수정 시 편집 가능한 필드
// email은 백엔드 수정 API(UpdateUserRequest)에 없어 편집 대상에서 제외
export type UpdateTeacherInput = Pick<
  Teacher,
  "name" | "phone" | "status" | "hireDate" | "leaveDate"
>;
