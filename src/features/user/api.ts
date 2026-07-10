import apiClient from "@/shared/lib/axios";
import type {
  TeacherListItem,
  TeacherDetail,
  TeacherStatus,
  TeacherClass,
  TeacherSalary,
  TeacherAttendanceRecord,
  UpdateTeacherInput,
  ClassStatus,
  SalaryStatus,
} from "./type";

// 백엔드 원시 응답 형태 (User_TB / Class_TB / salaries / staff_attendance)
interface ApiUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "ACTIVE" | "INACTIVE"; // 계정 활성 상태 (재직상태와는 다른 필드)
  employmentStatus: TeacherStatus; // 재직/휴직/퇴사
  joinedAt: string | null;
  resignedAt: string | null;
}

interface ApiPaginatedUser {
  total: number;
  page: number;
  data: ApiUser[];
}

interface ApiClass {
  id: string;
  name: string;
  fee: number;
  status: ClassStatus;
  startDate: string | null;
  endDate: string | null;
  currentStudents: number;
}

interface ApiPaginatedClass {
  page: number;
  total: number;
  data: ApiClass[];
}

interface ApiSalary {
  baseSalary: number;
  bonus: number;
  paymentDate: string | null;
  status: SalaryStatus;
  createdAt: string;
}

interface ApiStaffAttendance {
  workDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

function toDateOnly(iso: string | null): string | null {
  return iso ? iso.slice(0, 10) : null;
}

function toTimeOnly(iso: string | null): string | null {
  return iso ? iso.slice(11, 16) : null;
}

function toTeacherListItem(user: ApiUser): TeacherListItem {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.employmentStatus,
    hireDate: toDateOnly(user.joinedAt) ?? "",
    leaveDate: toDateOnly(user.resignedAt),
    // 담당 강좌/원생 수는 이 목록 API가 제공하지 않는다.
    // TODO: 백엔드가 집계값을 내려주면 그대로 매핑, 그전까지는 0으로 표시
    classCount: 0,
    studentCount: 0,
  };
}

export async function fetchTeachers(): Promise<TeacherListItem[]> {
  // GET /user는 status(계정 활성 상태)가 필수 파라미터라 ACTIVE/INACTIVE 둘 다 조회해 합친다.
  const [activeRes, inactiveRes] = await Promise.all([
    apiClient.get<{ body: ApiPaginatedUser }>("/user", {
      params: { role: "TEACHER", status: "ACTIVE", page: 1, limit: 100 },
    }),
    apiClient.get<{ body: ApiPaginatedUser }>("/user", {
      params: { role: "TEACHER", status: "INACTIVE", page: 1, limit: 100 },
    }),
  ]);

  return [...activeRes.data.body.data, ...inactiveRes.data.body.data].map(
    toTeacherListItem,
  );
}

export async function fetchTeacherDetail(id: string): Promise<TeacherDetail> {
  // 기본 정보(user)는 필수, 나머지(강좌/급여/근태)는 개별 API 장애가 상세 조회 전체를
  // 막지 않도록 allSettled로 조회해 실패 시 빈 값으로 대체한다.
  const userRes = await apiClient.get<{ body: ApiUser }>(`/user/${id}`);
  const user = userRes.data.body;

  const [classRes, pendingSalaryRes, completeSalaryRes, attendanceRes] =
    await Promise.allSettled([
      apiClient.get<{ body: ApiPaginatedClass }>("/class", {
        params: { teacherId: id, limit: 100 },
      }),
      apiClient.get<{ body: ApiSalary[] }>("/salary", {
        params: { userId: id, status: "PENDING" },
      }),
      apiClient.get<{ body: ApiSalary[] }>("/salary", {
        params: { userId: id, status: "COMPLETE" },
      }),
      apiClient.get<{ body: ApiStaffAttendance[] }>("/staff-attendance", {
        params: { userId: id },
      }),
    ]);

  const classes: TeacherClass[] =
    classRes.status === "fulfilled"
      ? classRes.value.data.body.data.map((cls) => ({
          id: cls.id,
          name: cls.name,
          fee: cls.fee,
          status: cls.status,
          startDate: toDateOnly(cls.startDate),
          endDate: toDateOnly(cls.endDate),
          studentCount: cls.currentStudents,
        }))
      : [];

  // status가 필수 파라미터라 PENDING/COMPLETE 두 번 조회 후, 가장 최근 건을 현재 급여로 사용.
  // 둘 중 하나라도 실패하면 성공한 쪽만으로 계산한다.
  const salaries = [
    ...(pendingSalaryRes.status === "fulfilled"
      ? pendingSalaryRes.value.data.body
      : []),
    ...(completeSalaryRes.status === "fulfilled"
      ? completeSalaryRes.value.data.body
      : []),
  ];
  const latestSalary = salaries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];
  const salary: TeacherSalary | null = latestSalary
    ? {
        baseSalary: latestSalary.baseSalary,
        bonus: latestSalary.bonus,
        paymentDate: toDateOnly(latestSalary.paymentDate),
        status: latestSalary.status,
      }
    : null;

  const recentAttendance: TeacherAttendanceRecord[] =
    attendanceRes.status === "fulfilled"
      ? attendanceRes.value.data.body
          .slice()
          .sort((a, b) => b.workDate.localeCompare(a.workDate))
          .slice(0, 5)
          .map((record) => ({
            workDate: record.workDate,
            checkInTime: toTimeOnly(record.checkInTime),
            checkOutTime: toTimeOnly(record.checkOutTime),
          }))
      : [];

  return {
    ...toTeacherListItem(user),
    classes,
    salary,
    recentAttendance,
  };
}

export async function deleteTeacher(id: string): Promise<void> {
  await apiClient.delete(`/user/${id}`);
}

export async function updateTeacher(
  id: string,
  data: UpdateTeacherInput,
): Promise<void> {
  // UpdateUserRequest는 name/phone/role/status(계정 활성 상태)가 필수라
  // 폼에서 다루지 않는 값은 현재 사용자 정보를 조회해 그대로 유지한다.
  const current = (await apiClient.get<{ body: ApiUser }>(`/user/${id}`)).data
    .body;

  await apiClient.patch(`/user/${id}`, {
    name: data.name,
    phone: data.phone,
    role: current.role,
    status: current.status,
    employmentStatus: data.status,
    joinedAt: data.hireDate ? new Date(data.hireDate).toISOString() : undefined,
    resignedAt: data.leaveDate ? new Date(data.leaveDate).toISOString() : null,
  });
}
