import apiClient from "@/shared/lib/axios";
import type {
  TeacherListItem,
  TeacherDetail,
  TeacherStatus,
  TeacherSalary,
  TeacherAttendanceRecord,
  UpdateTeacherInput,
  SalaryStatus,
} from "./type";
import z from "zod/v3";
import { UserFormSchema } from "./schema";

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

interface ApiSalary {
  id: string;
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
  // 기본 정보(user)는 필수, 나머지(급여/근태)는 개별 API 장애가 상세 조회 전체를
  // 막지 않도록 allSettled로 조회해 실패 시 빈 값으로 대체한다.
  const userRes = await apiClient.get<{ body: ApiUser }>(`/user/${id}`);
  const user = userRes.data.body;

  const [pendingSalaryRes, completeSalaryRes, attendanceRes] =
    await Promise.allSettled([
      apiClient.get<{ body: ApiSalary[] }>("/salary", {
        params: { userId: id, status: "PENDING" },
      }),
      apiClient.get<{ body: ApiSalary[] }>("/salary", {
        params: { userId: id, status: "COMPLETED" },
      }),
      apiClient.get<{ body: ApiStaffAttendance[] }>("/staff-attendance", {
        params: { userId: id },
      }),
    ]);

  // status가 필수 파라미터라 PENDING/COMPLETED를 각각 조회해 합친다.
  // 한 강사에게 PENDING이 여러 건 있을 수 있어 "현재 급여" 하나를 고르지 않고
  // 전부 목록으로 반환한다 (최신순으로 정렬만 해서 보여준다).
  // 둘 중 하나라도 실패하면 성공한 쪽만으로 계산한다.
  const rawSalaries = [
    ...(pendingSalaryRes.status === "fulfilled"
      ? pendingSalaryRes.value.data.body
      : []),
    ...(completeSalaryRes.status === "fulfilled"
      ? completeSalaryRes.value.data.body
      : []),
  ];
  const salaries: TeacherSalary[] = rawSalaries
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((s) => ({
      id: s.id,
      baseSalary: s.baseSalary,
      bonus: s.bonus,
      paymentDate: toDateOnly(s.paymentDate),
      status: s.status,
    }));

  const recentAttendance: TeacherAttendanceRecord[] =
    attendanceRes.status === "fulfilled"
      ? attendanceRes.value.data.body
          .slice()
          .sort((a, b) => b.workDate.localeCompare(a.workDate))
          .map((record) => ({
            workDate: record.workDate,
            checkInTime: toTimeOnly(record.checkInTime),
            checkOutTime: toTimeOnly(record.checkOutTime),
          }))
      : [];

  return {
    ...toTeacherListItem(user),
    salaries,
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

// 기존 급여 지급 정보를 직접 수정한다 (지급일이 되기 전 금액/지급일/지급여부를 정정하는 용도).
export async function updateTeacherSalary(
  salaryId: string,
  data: {
    baseSalary?: number;
    bonus?: number;
    paymentDate?: string;
    status?: SalaryStatus;
  },
): Promise<void> {
  await apiClient.patch(`/salary/${salaryId}`, {
    baseSalary: data.baseSalary,
    bonus: data.bonus,
    paymentDate: data.paymentDate
      ? new Date(data.paymentDate).toISOString()
      : undefined,
    status: data.status,
  });
}

// 급여를 실제로 지급 완료 처리한다 (PENDING → COMPLETED, 되돌릴 수 없음).
export async function payTeacherSalary(salaryId: string): Promise<void> {
  await apiClient.patch(`/salary/${salaryId}/pay`);
}

export async function findUsers(params: {
  page?: string;
  limit?: string;
  search?: string;
  isApproved?: boolean;
}) {
  const response = await apiClient.get("/user", {
    params,
  });
  return response.data.body;
}

export async function approveUser(id: string) {
  const response = await apiClient.put(`/user/${id}/approve`);
  return response.data;
}

export async function createUser(values: z.infer<typeof UserFormSchema>) {
  const { resignedAt, ...rest } = values;
  const response = await apiClient.post("/user", rest);
  return response.data;
}

export async function updateUser(
  id: string,
  values: z.infer<typeof UserFormSchema>,
) {
  const { password, ...rest } = values;
  const payload = {
    ...rest,
  };
  const response = await apiClient.patch(`/user/${id}`, payload);
  return response.data;
}

export async function deactivateUsers(ids: string[]) {
  const response = await Promise.all(
    ids.map((id) =>
      apiClient.patch(`/user/${id}`, {
        status: "INACTIVE",
        employmentStatus: "RESIGNED",
        resignedAt: new Date().toISOString(),
      }),
    ),
  );
}
