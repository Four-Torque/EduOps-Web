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

export function useStudents(params: {
  page: string;
  limit: string;
  tab: StudentTabFilter;
  search: string;
}) {
  return useQuery({
    queryKey: studentQueryKeys.list(params),
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