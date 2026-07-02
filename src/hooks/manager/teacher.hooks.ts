import { useQuery } from "@tanstack/react-query";
import {
  fetchTeachers,
  fetchTeacherDetail,
} from "@/services/manager/teacher.service";

export const teacherQueryKeys = {
  all: () => ["manager", "teacher"] as const,
  list: () => [...teacherQueryKeys.all(), "list"] as const,
  detail: (id: number) => [...teacherQueryKeys.all(), "detail", id] as const,
};

export function useTeachers() {
  return useQuery({
    queryKey: teacherQueryKeys.list(),
    queryFn: fetchTeachers,
  });
}

export function useTeacherDetail(id: number) {
  return useQuery({
    queryKey: teacherQueryKeys.detail(id),
    queryFn: () => fetchTeacherDetail(id),
    enabled: Number.isFinite(id),
  });
}
