import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod/v3";
import {
  findSubjectById,
  createSubject,
  editSubject,
  deleteSubjects,
  findSubjects,
} from "./api";
import { SubjectFormSchema } from "./schema";

export function useFindSubjects(paramns?: { search?: string }) {
  const query = useQuery({
    queryKey: ["subjects", paramns],
    queryFn: () => findSubjects(paramns),
  });
  return query;
}

export function useFindSubjectById(id?: string) {
  const query = useQuery({
    queryKey: ["subject", { id }],
    queryFn: () => findSubjectById(id),
    enabled: !!id,
  });
  return query;
}

export function useCreateSubject() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSubject,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useEditSubject(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof SubjectFormSchema>) =>
      editSubject(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["subject", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteSubjects() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => deleteSubjects(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
