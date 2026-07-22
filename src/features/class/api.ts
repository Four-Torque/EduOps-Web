import apiClient from "@/shared/lib/axios";
import { ClassInfo, CreateClassPayload, PaginatedClassResponse } from "./type";
import z from "zod/v3";
import { ClassFormSchema } from "./schema";

export async function fetchTeacherClasses(
  teacherId: string,
): Promise<PaginatedClassResponse> {
  const response = await apiClient.get("/class", {
    params: { teacherId },
  });
  return response.data.body ?? response.data;
}

export const fetchClasses = async (
  params: {
    page?: number;
    limit?: number;
    name?: string;
    teacherId?: string;
    status?: string;
  } = {},
): Promise<PaginatedClassResponse> => {
  const response = await apiClient.get("/class", { params });
  return response.data.body ?? response.data;
};

export const fetchClassById = async (id: string): Promise<ClassInfo> => {
  const response = await apiClient.get(`/class/${id}`);
  return response.data.body ?? response.data;
};

export const createClass = async (payload: z.infer<typeof ClassFormSchema>) => {
  const response = await apiClient.post("/class", payload);
  return response.data;
};

export const updateClass = async (
  id: string,
  payload: Partial<CreateClassPayload>,
) => {
  const response = await apiClient.patch(`/class/${id}`, payload);
  return response.data.body ?? response.data;
};

export const deleteClass = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/class/${id}`);
  return response.data;
};
