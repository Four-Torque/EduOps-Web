import { apiClient } from "@/lib/axios";
import { ClassStudentAttendance } from "@/types/teacher/attendance.type";

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
