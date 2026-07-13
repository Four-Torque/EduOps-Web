import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSyllabuses, createSyllabus, approveSyllabus, rejectSyllabus } from "./api";

export const useSyllabuses = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["syllabuses", page, limit],
    queryFn: () => fetchSyllabuses(page, limit),
  });
};

export const useCreateSyllabus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSyllabus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
    },
  });
};

export const useApproveSyllabus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveSyllabus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useRejectSyllabus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectedReason }: { id: string; rejectedReason: string }) => 
      rejectSyllabus(id, rejectedReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
    },
  });
};
