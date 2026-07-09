import type {
  StudentTabFilter,
  StudentListResponse,
} from "@/features/student/type";
import { StudentRegisterFormState } from "@/types/manager/student-register.types";
import { MOCK_STUDENTS } from "@/shared/constants/manager/student.constants";

// TODO: import { apiClient } from "@/lib/axios";

export const STUDENT_PAGE_SIZE = 8;

export async function fetchStudents(
  tab: StudentTabFilter,
  searchQuery: string,
  page: number,
): Promise<StudentListResponse> {
  // TODO: return apiClient.get("/students", { params: { tab, search: searchQuery, page, pageSize: STUDENT_PAGE_SIZE } });

  await new Promise((res) => setTimeout(res, 300));

  const filtered = MOCK_STUDENTS.filter((student) => {
    const matchTab =
      (tab === "active" && student.status === "active") ||
      (tab === "graduated" && student.status === "inactive") ||
      tab === "waiting"; // waiting은 별도 데이터 연결 예정

    const matchSearch =
      searchQuery === "" ||
      student.name.includes(searchQuery) ||
      student.studentCode.includes(searchQuery);

    return matchTab && matchSearch;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / STUDENT_PAGE_SIZE) || 1;
  const items = filtered.slice(
    (page - 1) * STUDENT_PAGE_SIZE,
    page * STUDENT_PAGE_SIZE,
  );

  return { items, totalItems, totalPages };
}

export async function registerStudent(
  form: StudentRegisterFormState,
): Promise<void> {
  // TODO: return apiClient.post("/students", form);

  await new Promise((res) => setTimeout(res, 300));
  console.log("registered student (mock):", form);
}
