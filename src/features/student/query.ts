import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_STUDENTS, MOCK_STUDENT_STATS } from "@/shared/constants/manager/student.constants";
import type { StudentTabFilter } from "./type";

export const studentQueryKeys = {
  all:   () => ["students"]              as const,
  list:  (params: object) => ["students", "list", params] as const,
  stats: () => ["students", "stats"]     as const,
};

import apiClient from "@/shared/lib/axios";

export function useStudents(params: {
  page: string;
  limit: string;
  tab: StudentTabFilter;
  search: string;
}) {
  return useQuery({
    queryKey: studentQueryKeys.list(params),
    queryFn: async () => {
      let status: string | undefined;
      if (params.tab === "학생") status = "ENROLLED";
      else if (params.tab === "졸업생 / 비활동 회원") status = "EXPELLED";

      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;

      const response = await apiClient.get("/student", {
        params: {
          status,
          name: params.search || undefined,
          page,
          limit,
        },
      });

      const body = response.data.body || response.data;
      return {
        data: body.data || [],
        total: body.total || 0,
        totalPages: Math.ceil((body.total || 0) / limit) || 1,
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