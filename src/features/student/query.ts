import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_STUDENTS, MOCK_STUDENT_STATS } from "@/shared/constants/manager/student.constants";
import type { StudentTabFilter } from "./type";

export const studentQueryKeys = {
  all:   () => ["students"]              as const,
  list:  (params: object) => ["students", "list", params] as const,
  stats: () => ["students", "stats"]     as const,
};

export function useStudents(params: {
  page: string;
  limit: string;
  tab: StudentTabFilter;
  search: string;
}) {
  return useQuery({
    queryKey: studentQueryKeys.list(params),
    queryFn: async () => {
      let filtered = [...MOCK_STUDENTS];

      // 탭별 필터링
      if (params.tab === "학생")
        filtered = filtered.filter((s) => s.status === "active");
      else (params.tab === "졸업생 / 비활동 회원")
        filtered = filtered.filter((s) => s.status === "inactive");
      // "전체"는 필터링 없이 전체 반환

      // 검색 필터링
      if (params.search)
        filtered = filtered.filter(
          (s) => s.name.includes(params.search)
        );

      const page  = Number(params.page)  || 1;
      const limit = Number(params.limit) || 10;
      const data  = filtered.slice((page - 1) * limit, page * limit);

      return {
        data,
        total:      filtered.length,
        totalPages: Math.ceil(filtered.length / limit) || 1,
      };
    },
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: studentQueryKeys.stats(),
    queryFn:  async () => MOCK_STUDENT_STATS,
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => ({ message: "삭제되었습니다." }), // TODO: API 연동
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
  });
}