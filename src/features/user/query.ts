import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTeachers,
  fetchTeacherDetail,
  deleteTeacher,
  updateTeacher,
  updateTeacherSalary,
  payTeacherSalary,
} from "./api";
import type {
  TeacherListItem,
  TeacherDetail,
  UpdateTeacherInput,
  SalaryStatus,
} from "./type";

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

// 목록 화면 전용: 검색/페이지 계산까지 끝낸 { data, total, totalPages } 형태로 반환한다.
// /user API가 이름 검색을 지원하지 않아 서버에서 받은 전체 목록을 클라이언트에서 필터링·슬라이싱한다.
// (같은 queryKey를 쓰므로 useTeachers()와 캐시를 공유한다)
export function useTeacherList(params: { page: string; limit: string; search: string }) {
  return useQuery({
    queryKey: teacherQueryKeys.list(),
    queryFn: fetchTeachers,
    select: (all) => {
      const limit = Number(params.limit);
      const page = Number(params.page);
      const filtered = all.filter((t) => t.name.includes(params.search.trim()));
      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const data = filtered.slice((page - 1) * limit, page * limit);
      return { data, total, totalPages };
    },
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

export function useUpdateTeacherSalary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      salaryId,
      data,
    }: {
      salaryId: string;
      userId: string;
      data: {
        baseSalary?: number;
        bonus?: number;
        paymentDate?: string;
        status?: SalaryStatus;
      };
    }) => updateTeacherSalary(salaryId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.detail(variables.userId),
      });
    },
  });
}

export function usePayTeacherSalary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ salaryId }: { salaryId: string; userId: string }) =>
      payTeacherSalary(salaryId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.detail(variables.userId),
      });
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

// import { useDirectorUserStore } from "./store";
// import { UserApprovalStatus, DirectorUserListResponse } from "./type";

// export const directorUserQueryKeys = {
//   all: () => ["director-users"] as const,
//   list: (tab: string, page: number) =>
//     ["director-users", "list", tab, page] as const,
// };

// export function useDirectorUsers() {
//   const { tab, page } = useDirectorUserStore();

//   return useQuery({
//     queryKey: directorUserQueryKeys.list(tab, page),
//     queryFn: () => fetchDirectorUsers(tab, page),
//     placeholderData: (prev) => prev,
//   });
// }

// export function useUpdateDirectorUserStatus() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       userId,
//       status,
//     }: {
//       userId: number;
//       status: UserApprovalStatus;
//     }) => updateDirectorUserStatus(userId, status),

//     onMutate: async ({ userId, status }) => {
//       await queryClient.cancelQueries({
//         queryKey: directorUserQueryKeys.all(),
//       });

//       const previousData = queryClient.getQueriesData<DirectorUserListResponse>(
//         {
//           queryKey: directorUserQueryKeys.all(),
//         },
//       );

//       queryClient.setQueriesData(
//         { queryKey: directorUserQueryKeys.all() },
//         (old: DirectorUserListResponse | undefined) => {
//           if (!old?.items) return old;
//           return {
//             ...old,
//             items: old.items.map((u) =>
//               u.id === userId ? { ...u, status } : u,
//             ),
//           };
//         },
//       );

//       return { previousData };
//     },

//     onError: (_error, _variables, context) => {
//       context?.previousData.forEach(([key, data]) => {
//         queryClient.setQueryData(key, data);
//       });
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: directorUserQueryKeys.all() });
//     },
//   });
// }

// export function useDeleteDirectorUsers() {
//   const queryClient = useQueryClient();
//   const clearSelection = useDirectorUserStore((state) => state.clearSelection);

//   return useMutation({
//     mutationFn: deleteDirectorUsers,
//     onSuccess: () => {
//       clearSelection();
//       queryClient.invalidateQueries({ queryKey: directorUserQueryKeys.all() });
//     },
//   });
// }
