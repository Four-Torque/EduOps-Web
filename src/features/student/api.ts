import apiClient from "@/shared/lib/axios";
import type { StudentRegisterFormState } from "./type";

export async function createStudent(form: StudentRegisterFormState) {
  const response = await apiClient.post("/student", {
    name:    form.name,
    phone:   form.phone,
    birth:   form.birthDate,
    address: form.addressDetail
      ? `${form.address} ${form.addressDetail}`.trim()
      : form.address,
  });
  return response.data;
}