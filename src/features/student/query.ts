import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  all:    () => ["students"]                    as const,
  lists:  () => ["students", "list"]            as const,
  list:   (params: object) => ["students", "list", params] as const,
  stats:  () => ["students", "stats"]           as const,
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
    queryFn:  () => fetchStudents(params.tab, params.search, Number(params.page)),
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: studentQueryKeys.stats(),
    queryFn:  fetchStudentStats,
  });
}

export function useRegisterStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: StudentRegisterFormState) => registerStudent(form),
    onSuccess: () => {
      toast.success("학생이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      toast.success("학생이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: StudentRegisterFormState }) =>
      updateStudent(id, form),
    onSuccess: () => {
      toast.success("학생 정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
}

export function useStudentDetail(id: string | null) {
  return useQuery({
    queryKey: studentQueryKeys.detail(id ?? ""),
    queryFn:  () => fetchStudentDetail(id ?? ""),
    enabled:  !!id,
  });
}