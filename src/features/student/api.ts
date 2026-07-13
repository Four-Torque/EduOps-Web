import type {
  StudentTabFilter,
  StudentListResponse,
  StudentRegisterFormState,
} from "@/features/student/type";
import apiClient from "@/shared/lib/axios";

export const STUDENT_PAGE_SIZE = 8;

export async function fetchStudents(
  tab: StudentTabFilter,
  searchQuery: string,
  page: number,
): Promise<StudentListResponse> {
  let status: string | undefined = undefined;
  if (tab === "학생") status = "ENROLLED";
  else if (tab === "졸업생 / 비활동 회원") status = "SUSPENDED";

  const response = await apiClient.get("/student", {
    params: {
      status,
      name: searchQuery || undefined,
      page,
      limit: STUDENT_PAGE_SIZE,
    },
  });

  const { data, total } = response.data.body;
  const totalPages = Math.ceil(total / STUDENT_PAGE_SIZE) || 1;

  const mappedData = (data ?? []).map((s: any) => ({
    id: s.id,
    name: s.name,
    avatarInitial: s.name ? s.name.slice(0, 1) : "",
    birthDate: s.birth ? s.birth.slice(0, 10) : "",
    address: s.address || "",
    Phonenumber: s.phone || "",
    status: s.status === "ENROLLED" ? ("active" as const) : ("inactive" as const),
  }));

  return { data: mappedData, total, totalPages };
}

export async function registerStudent(
  form: StudentRegisterFormState,
): Promise<void> {
  const backendForm = {
    name: form.name,
    birth: form.birthDate || undefined,
    phone: form.phone,
    address:
      form.address + (form.addressDetail ? ` ${form.addressDetail}` : ""),
    status: form.status === "active" ? "ENROLLED" : "SUSPENDED",
  };
  await apiClient.post("/student", backendForm);
}

export async function deleteStudent(id: string): Promise<void> {
  await apiClient.delete(`/student/${id}`);
}

export async function updateStudent(
  id: string,
  form: StudentRegisterFormState,
): Promise<void> {
  const backendForm = {
    name: form.name,
    birth: form.birthDate || undefined,
    phone: form.phone,
    address:
      form.address + (form.addressDetail ? ` ${form.addressDetail}` : ""),
    status: form.status === "active" ? "ENROLLED" : "SUSPENDED",
  };
  await apiClient.patch(`/student/${id}`, backendForm);
}

export async function fetchStudentStats(): Promise<any> {
  const response = await apiClient.get("/student/stats");
  return response.data.body;
}

export async function fetchStudentDetail(id: string): Promise<any> {
  const response = await apiClient.get(`/student/${id}`);
  const s = response.data.body;
  return {
    name: s.name,
    birthDate: s.birth ? s.birth.slice(0, 10) : "",
    phone: s.phone || "",
    address: s.address || "",
    addressDetail: "",
    status: s.status === "ENROLLED" ? "active" : "inactive",
  };
}
