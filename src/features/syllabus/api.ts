import apiClient from "@/shared/lib/axios";
import { CreateSyllabusPayload, PaginatedClassSyllabusResponse } from "./type";

export const fetchSyllabuses = async (page: number = 1, limit: number = 20): Promise<PaginatedClassSyllabusResponse> => {
  const response = await apiClient.get("/class-syllabus", {
    params: { page, limit },
  });
  return response.data.body ?? response.data;
};

export const createSyllabus = async (payload: CreateSyllabusPayload) => {
  const response = await apiClient.post("/class-syllabus", payload);
  return response.data.body ?? response.data;
};

export const approveSyllabus = async (id: string) => {
  const response = await apiClient.patch(`/class-syllabus/${id}/approve`);
  return response.data.body ?? response.data;
};

export const rejectSyllabus = async (id: string, rejectedReason: string) => {
  const response = await apiClient.patch(`/class-syllabus/${id}/reject`, { rejectedReason });
  return response.data.body ?? response.data;
};
