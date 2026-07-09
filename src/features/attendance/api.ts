import {
  ATTENDANCE_PAGE_SIZE,
  MOCK_ATTENDANCE_EMPLOYEES,
} from "@/shared/constants/manager/attendance.constants";
import { AttendanceFilter, AttendanceListResponse, ClassStudentAttendance } from "./type";
import apiClient from "@/shared/lib/axios";

export async function fetchAttendance(
  filter: AttendanceFilter,
): Promise<AttendanceListResponse> {
  // TODO: return apiClient.get("/attendance", { params: filter });

  await new Promise((res) => setTimeout(res, 300));

  const filtered = MOCK_ATTENDANCE_EMPLOYEES.filter((emp) => {
    const matchDept =
      filter.department === "전체" || emp.department === filter.department;
    const matchSearch =
      filter.search === "" || emp.name.includes(filter.search);
    return matchDept && matchSearch;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ATTENDANCE_PAGE_SIZE) || 1;
  const items = filtered.slice(
    (filter.page - 1) * ATTENDANCE_PAGE_SIZE,
    filter.page * ATTENDANCE_PAGE_SIZE,
  );

  return { items, totalItems, totalPages };
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
