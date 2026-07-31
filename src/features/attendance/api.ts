import {
  AttendanceFilter,
  ClassStudentAttendance,
  AttendanceEmployee,
  AttendanceStats,
} from "./type";
import apiClient from "@/shared/lib/axios";

export async function fetchAttendance(
  filter: AttendanceFilter,
): Promise<{
  items: AttendanceEmployee[];
  stats: AttendanceStats;
  totalItems: number;
  totalPages: number;
}> {
  const response = await apiClient.get("/staff-attendance/weekly", {
    params: {
      weekStart: filter.weekStart || undefined,
      department: filter.department !== "전체" ? filter.department : undefined,
      search: filter.search || undefined,
      page: filter.page ?? undefined,
      limit: (filter as any).limit ?? undefined,
    },
  });

  const body = response.data.body ?? response.data;
  return {
    items: body.items ?? [],
    stats:
      body.stats ?? {
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0,
        lateOrEtc: 0,
      },
    totalItems: body.totalItems ?? body.total ?? (body.items ?? []).length,
    totalPages: body.totalPages ?? Math.ceil((body.totalItems ?? (body.items ?? []).length) / ((filter as any).limit ?? 10)),
  };
}

// =============================================================================== //
// 학생 출결 관련 Api
// =============================================================================== //

export async function fetchClassAttendances(
  classId: string,
  lectureDate: string,
): Promise<ClassStudentAttendance[]> {
  const response = await apiClient.get(`/class/${classId}/attendance`, {
    params: { lectureDate },
  });
  return response.data.body ?? response.data;
}

export async function createStudentAttendance(data: {
  studentId: string;
  classId: string;
  lectureDate: string;
  status: string;
}) {
  const response = await apiClient.post("/student-attendance", data);
  return response.data.body ?? response.data;
}

export async function updateStudentAttendance(id: string, status: string) {
  const response = await apiClient.patch(`/student-attendance/${id}`, {
    status,
  });
  return response.data.body ?? response.data;
}

export async function createStaffAttendance(values: {
  userId: string;
  workDate?: Date | string;
  checkInTime?: Date;
}) {
  const response = await apiClient.post("/staff-attendance/check-in", values);
  return response.data;
}

export async function updateStaffAttendance(values: {
  userId: string;
  checkOutTime?: Date;
  workDate?: Date | string;
}) {
  const response = await apiClient.patch(`/staff-attendance/check-out`, values);
  return response.data;
}

