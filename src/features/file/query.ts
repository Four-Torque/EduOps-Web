import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClassFile, deleteClassFile, findClassFiles } from "./api";
import toast from "react-hot-toast";

export function useCreateFile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createClassFile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["classFiles"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindClassFiles(params: {
  page: number;
  limit: number;
  search?: string;
  classId?: string;
}) {
  const query = useQuery({
    queryKey: ["classFiles", params],
    queryFn: () => findClassFiles(params),
  });
  return query;
}

export function useDeleteClassFiles() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => deleteClassFile(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["classFiles"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
