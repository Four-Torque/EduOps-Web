import apiClient from "@/shared/lib/axios";
import { PaginatedClassFileResponse } from "./type";

export interface UploadClassFileRequest {
  classId: string;
  urls: string[];
  existingDocuments?: [];
}

export async function createClassFile(data: UploadClassFileRequest) {
  const response = await apiClient.post("/class-file/create", data);

  return response.data;
}

export async function documentUpload(formData: FormData) {
  const response = await apiClient.post(`class-file`, formData);
  return response.data;
}

export async function fetchClassFiles(
  classId?: string,
  fileName?: string,
  page?: number,
  limit?: number,
): Promise<PaginatedClassFileResponse> {
  const response = await apiClient.get("/class-file", {
    params: { classId, fileName, page, limit },
  });

  console.log(response);
  return response.data.body ?? response.data;
}

export async function deleteClassFile(id: string): Promise<void> {
  await apiClient.delete(`/class-file/${id}`);
}
