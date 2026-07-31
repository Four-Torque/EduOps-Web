import apiClient from "@/shared/lib/axios";
import { CreateEnrollmentRequest, EnrollmentResponse } from "./type";

export const createEnrollment = async (
  request: CreateEnrollmentRequest,
): Promise<EnrollmentResponse> => {
  const response = await apiClient.post("/enrollment", request);
  return response.data.body ?? response.data;
};

export const fetchClassEnrollments = async (
  classId: string,
): Promise<EnrollmentResponse[]> => {
  const response = await apiClient.get("/enrollment", { params: { classId } });
  return response.data.body ?? response.data;
};

export const deleteEnrollment = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/enrollment/${id}`);
  return response.data;
};
