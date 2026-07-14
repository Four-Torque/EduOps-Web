import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchStudents,
  fetchStudentStats,
  registerStudent,
  deleteStudent,
  updateStudent,
  fetchStudentDetail,
} from "./api";
import type { StudentTabFilter, StudentRegisterFormState } from "./type";

export const studentQueryKeys = {
  all: () => ["students"] as const,
  lists: () => ["students", "list"] as const,
  list: (params: object) => ["students", "list", params] as const,
  stats: () => ["students", "stats"] as const,
  detail: (id: string) => ["students", "detail", id] as const,
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
// <<<<<<< HEAD
//     queryFn: async () => {
//       let filtered = [...MOCK_STUDENTS];

//       // 탭별 필터링
//       if (params.tab === "학생")
//         filtered = filtered.filter((s) => s.status === "active");
//       else if (params.tab === "졸업생 / 비활동 회원")
//         filtered = filtered.filter((s) => s.status === "inactive");
//       // "전체"는 필터링 없이 전체 반환

//       // 검색 필터링
//       if (params.search)
//         filtered = filtered.filter(
//           (s) => s.name.includes(params.search) || s.studentCode.includes(params.search),
//         );

//       const page  = Number(params.page)  || 1;
//       const limit = Number(params.limit) || 10;
//       const data  = filtered.slice((page - 1) * limit, page * limit);

//       return {
//         data,
//         total:      filtered.length,
//         totalPages: Math.ceil(filtered.length / limit) || 1,
//       };
//     },
// =======
    queryFn: () => fetchStudents(params.tab, params.search, Number(params.page)),
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: studentQueryKeys.stats(),
    queryFn: fetchStudentStats,
  });
}

export function useRegisterStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: StudentRegisterFormState) => registerStudent(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
  });
}



export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: StudentRegisterFormState;
    }) => updateStudent(id, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
  });
}

export function useStudentDetail(id: string | null) {
  return useQuery({
    queryKey: studentQueryKeys.detail(id ?? ""),
    queryFn: () => fetchStudentDetail(id ?? ""),
    enabled: !!id,
  });
}