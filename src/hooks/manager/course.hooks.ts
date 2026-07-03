// @/hooks/manager/course.hooks.ts
import { useQuery } from "@tanstack/react-query";
import { MOCK_COURSES } from "@/constants/manager/course.constants";
import { useCourseStore } from "@/store/manager/course.store";
import type { CourseListResponse } from "@/types/manager/course.types";

export function useCourses() {
  const { searchQuery, subject, level, page } = useCourseStore();

  return useQuery<CourseListResponse>({
    queryKey: ["courses", searchQuery, subject, level, page],
    queryFn: async () => {
      // TODO: 실제 API 연결
      return MOCK_COURSES;
    },
  });
}