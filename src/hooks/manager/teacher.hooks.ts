import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchTeachers,
  fetchTeacherDetail,
  deleteTeacher,
  updateTeacher,
} from "@/services/manager/teacher.service";
import type {
  TeacherListItem,
  TeacherDetail,
  UpdateTeacherInput,
} from "@/types/manager/teacher.types";

export const teacherQueryKeys = {
  all: () => ["manager", "teacher"] as const,
  list: () => [...teacherQueryKeys.all(), "list"] as const,
  detail: (id: string) => [...teacherQueryKeys.all(), "detail", id] as const,
};

export function useTeachers() {
  return useQuery({
    queryKey: teacherQueryKeys.list(),
    queryFn: fetchTeachers,
  });
}

export function useTeacherDetail(id: string) {
  return useQuery({
    queryKey: teacherQueryKeys.detail(id),
    queryFn: () => fetchTeacherDetail(id),
    enabled: !!id,
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeacherInput }) =>
      updateTeacher(id, data),

    // 낙관적 업데이트: 서버 응답 전에 캐시를 먼저 바꿔 UI를 즉시 반영
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.list() });
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.detail(id) });

      const prevList = queryClient.getQueryData<TeacherListItem[]>(teacherQueryKeys.list());
      const prevDetail = queryClient.getQueryData<TeacherDetail>(teacherQueryKeys.detail(id));

      queryClient.setQueryData<TeacherListItem[]>(teacherQueryKeys.list(), (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...data } : t)),
      );
      queryClient.setQueryData<TeacherDetail>(teacherQueryKeys.detail(id), (old) =>
        old ? { ...old, ...data } : old,
      );

      return { prevList, prevDetail, id };
    },

    // 실패 시 이전 상태로 롤백
    onError: (_err, _vars, context) => {
      if (context?.prevList) {
        queryClient.setQueryData(teacherQueryKeys.list(), context.prevList);
      }
      if (context?.prevDetail) {
        queryClient.setQueryData(teacherQueryKeys.detail(context.id), context.prevDetail);
      }
    },

    // 성공/실패 무관하게 서버와 최종 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all() });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeacher(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: teacherQueryKeys.list() });

      const prevList = queryClient.getQueryData<TeacherListItem[]>(teacherQueryKeys.list());

      queryClient.setQueryData<TeacherListItem[]>(teacherQueryKeys.list(), (old) =>
        old?.filter((t) => t.id !== id),
      );

      return { prevList };
    },

    onError: (_err, _id, context) => {
      if (context?.prevList) {
        queryClient.setQueryData(teacherQueryKeys.list(), context.prevList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all() });
    },
  });
}
