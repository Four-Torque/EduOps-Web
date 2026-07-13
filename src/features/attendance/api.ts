import {
  ATTENDANCE_PAGE_SIZE,
  MOCK_ATTENDANCE_EMPLOYEES,
} from "@/shared/constants/manager/attendance.constants";
import {
  AttendanceFilter,
  AttendanceListResponse,
  ClassStudentAttendance,
  AttendanceEmployee,
  AttendanceStats,
} from "./type";
import apiClient from "@/shared/lib/axios";

export async function fetchAttendance(
  filter: AttendanceFilter,
): Promise<{ items: AttendanceEmployee[]; stats: AttendanceStats }> {
  const response = await apiClient.get("/staff-attendance/weekly", {
    params: {
      weekStart: filter.weekStart || undefined,
      department: filter.department !== "전체" ? filter.department : undefined,
      search: filter.search || undefined,
    },
  });

  const body = response.data.body ?? response.data;
  return {
    items: body.items ?? [],
    stats: body.stats ?? {
      totalEmployees: 0,
      presentToday: 0,
      absentToday: 0,
      lateOrEtc: 0,
    },
  };
}

// =============================================================================== //
// 학생 출결 관련 Api
// =============================================================================== //

export async function fetchClassAttendances(classId: string, lectureDate: string): Promise<ClassStudentAttendance[]> {
  const response = await apiClient.get(`/class/${classId}/attendance`, {
    params: { lectureDate },
  });
  return response.data.body ?? response.data;
}

export async function createStudentAttendance(data: { studentId: string; classId: string; lectureDate: string; status: string }) {
  const response = await apiClient.post("/student-attendance", data);
  return response.data.body ?? response.data;
}

export async function updateStudentAttendance(id: string, status: string) {
  const response = await apiClient.patch(`/student-attendance/${id}`, { status });
  return response.data.body ?? response.data;
}
