import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClasses, createClass, updateClass, deleteClass } from "./api";
import { CreateClassPayload } from "./type";

export const useClasses = (params: { page?: number; limit?: number; name?: string; teacherId?: string; status?: string } = {}) => {
  return useQuery({
    queryKey: ["classes", params],
    queryFn: () => fetchClasses(params),
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateClassPayload) => createClass(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateClassPayload> }) => updateClass(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
