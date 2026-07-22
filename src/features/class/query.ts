import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchClasses,
  fetchClassById,
  createClass,
  updateClass,
  deleteClass,
} from "./api";
import { CreateClassPayload } from "./type";
import { ClassFormSchema } from "./schema";
import { z } from "zod/v3";
import toast from "react-hot-toast";

export const useClasses = (
  params: {
    page?: number;
    limit?: number;
    name?: string;
    teacherId?: string;
    status?: string;
  } = {},
) => {
  return useQuery({
    queryKey: ["classes", params],
    queryFn: () => fetchClasses(params),
  });
};

export const useClass = (id: string | null) => {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => fetchClassById(id as string),
    enabled: !!id,
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: z.infer<typeof ClassFormSchema>) =>
      createClass(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CreateClassPayload>;
    }) => updateClass(id, payload),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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
