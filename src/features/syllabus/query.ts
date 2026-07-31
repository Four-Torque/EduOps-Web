import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
      toast.success("강좌가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
};

export const useApproveSyllabus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveSyllabus,
    onSuccess: () => {
      toast.success("강좌가 승인되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
};

export const useRejectSyllabus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectedReason }: { id: string; rejectedReason: string }) =>
      rejectSyllabus(id, rejectedReason),
    onSuccess: () => {
      toast.success("강좌가 반려되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["class-syllabuses"] });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
};