import { apiClient } from "@/lib/axios";
import { PaginatedClassResponse } from "@/types/teacher/class.types";

/**
 * 특정 교사가 담당하는 강좌(수업) 목록을 조회합니다.
 * @param teacherId 교사 ID
 * @returns 교사의 강좌 목록 (페이지네이션 포맷)
 */
export async function fetchTeacherClasses(teacherId: string): Promise<PaginatedClassResponse> {
  const response = await apiClient.get("/class", {
    params: { teacherId },
  });
  
  // 글로벌 응답 래퍼(body)가 있을 경우를 대비한 처리
  return response.data.body ?? response.data;
}
