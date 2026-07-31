import apiClient from "@/shared/lib/axios";
import z from "zod/v3";
import { SubjectFormSchema } from "./schema";

export async function findSubjects(params?: { search?: string }) {
  const response = await apiClient.get("/subject", { params });
  return response.data.body;
}

export async function findSubjectById(id?: string) {
  const response = await apiClient.get(`/subject/${id}`);
  return response.data.body;
}

export async function createSubject(values: z.infer<typeof SubjectFormSchema>) {
  const response = await apiClient.post("/subject", values);
  return response.data;
}

export async function editSubject(
  values: z.infer<typeof SubjectFormSchema>,
  id?: string,
) {
  const response = await apiClient.put(`/subject/${id}`, values);
  return response.data;
}

export async function deleteSubjects(ids: string[]) {
  const response = await apiClient.delete("/subject", { data: { ids } });
  return response.data;
}
