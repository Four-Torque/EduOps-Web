import type { StudentRegisterFormState } from "@/types/manager/student-register.types";

// TODO: import { apiClient } from "@/lib/axios";

export async function registerStudent(form: StudentRegisterFormState): Promise<void> {
  // TODO: return apiClient.post("/students", form);

  await new Promise((res) => setTimeout(res, 300));
  console.log("registered student (mock):", form);
}
