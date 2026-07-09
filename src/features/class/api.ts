import apiClient from "@/shared/lib/axios";
import { PaginatedClassResponse } from "./type";

export async function fetchTeacherClasses(teacherId: string): Promise<PaginatedClassResponse> {
  const response = await apiClient.get("/class", {
    params: { teacherId },
  });
  
  // 글로벌 응답 래퍼(body)가 있을 경우를 대비한 처리
  return response.data.body ?? response.data;
}