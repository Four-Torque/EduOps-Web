import type {
  TeacherListItem,
  TeacherDetail,
} from "@/types/manager/teacher.types";

// TODO: import apiClient from "@/lib/axios";

const MOCK_TEACHERS: TeacherListItem[] = [
  { id: 1, name: "김강사", email: "kim@edu.com", phone: "010-1111-2222", status: "ACTIVE", classCount: 3, studentCount: 42 },
  { id: 2, name: "이선생", email: "lee@edu.com", phone: "010-3333-4444", status: "ACTIVE", classCount: 2, studentCount: 25 },
  { id: 3, name: "박튜터", email: "park@edu.com", phone: "010-5555-6666", status: "LEAVE", classCount: 0, studentCount: 0 },
];

const MOCK_DETAILS: Record<number, TeacherDetail> = {
  1: {
    id: 1,
    name: "김강사",
    email: "kim@edu.com",
    phone: "010-1111-2222",
    status: "ACTIVE",
    classes: [
      { id: 101, name: "중등 수학 A", fee: 250000, status: "OPEN", startDate: "2026-03-02", endDate: null, studentCount: 18 },
      { id: 102, name: "중등 수학 B", fee: 250000, status: "OPEN", startDate: "2026-03-02", endDate: null, studentCount: 15 },
      { id: 103, name: "고등 수학 특강", fee: 320000, status: "CLOSE", startDate: "2026-01-05", endDate: "2026-02-28", studentCount: 9 },
    ],
    salary: { baseSalary: 3000000, bonus: 300000, paymentDate: "2026-06-25", status: "COMPLETE" },
    recentAttendance: [
      { workDate: "2026-07-01", checkInTime: "09:02", checkOutTime: "18:10" },
      { workDate: "2026-06-30", checkInTime: "08:58", checkOutTime: "18:05" },
      { workDate: "2026-06-29", checkInTime: "09:10", checkOutTime: "17:55" },
    ],
  },
  2: {
    id: 2,
    name: "이선생",
    email: "lee@edu.com",
    phone: "010-3333-4444",
    status: "ACTIVE",
    classes: [
      { id: 201, name: "초등 영어 A", fee: 200000, status: "OPEN", startDate: "2026-03-02", endDate: null, studentCount: 13 },
      { id: 202, name: "초등 영어 B", fee: 200000, status: "OPEN", startDate: "2026-03-02", endDate: null, studentCount: 12 },
    ],
    salary: { baseSalary: 2800000, bonus: 0, paymentDate: null, status: "PENDING" },
    recentAttendance: [
      { workDate: "2026-07-01", checkInTime: "09:00", checkOutTime: "18:00" },
    ],
  },
  3: {
    id: 3,
    name: "박튜터",
    email: "park@edu.com",
    phone: "010-5555-6666",
    status: "LEAVE",
    classes: [],
    salary: null,
    recentAttendance: [],
  },
};

export async function fetchTeachers(): Promise<TeacherListItem[]> {
  // TODO: return apiClient.get<{ body: TeacherListItem[] }>("/manager/teachers").then((r) => r.data.body);

  await new Promise((res) => setTimeout(res, 300));
  return MOCK_TEACHERS;
}

export async function fetchTeacherDetail(id: number): Promise<TeacherDetail> {
  // TODO: return apiClient.get<{ body: TeacherDetail }>(`/manager/teachers/${id}`).then((r) => r.data.body);

  await new Promise((res) => setTimeout(res, 300));
  const detail = MOCK_DETAILS[id];
  if (!detail) throw new Error("강사를 찾을 수 없습니다.");
  return detail;
}
