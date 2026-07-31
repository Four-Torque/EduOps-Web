import apiClient from "@/shared/lib/axios";
import { PaginatedClassFileResponse } from "./type";

export interface UploadClassFileRequest {
  classId: string;
  urls: string[];
  existingDocuments?: string[];
  fileName?: string;
  fileSize?: number;
}

export async function createClassFile(data: UploadClassFileRequest) {
  const response = await apiClient.post("/class-file/create", data);
  return response.data;
}

export async function uploadClassFile(formData: FormData) {
  const response = await apiClient.post(`class-file`, formData);
  return response.data;
}

export async function findClassFiles(params: {
  classId?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedClassFileResponse> {
  const response = await apiClient.get("/class-file", {
    params,
  });

  return response.data.body;
}

export async function deleteClassFile(ids: string[]) {
  const response = await apiClient.delete(`/class-file`, { data: { ids } });
  return response.data;
}
