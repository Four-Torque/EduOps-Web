import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_ACADEMY_INFO } from "@/shared/constants/manager/academy-info.constants";
import type { AcademyBasicInfo } from "./type";

export const academyQueryKeys = {
  all:  () => ["academy-info"]           as const,
  info: () => ["academy-info", "detail"] as const,
};

export function useAcademyInfo() {
  return useQuery({
    queryKey: academyQueryKeys.info(),
    queryFn:  async () => MOCK_ACADEMY_INFO,
  });
}

export function useUpdateAcademyBasicInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: AcademyBasicInfo) => info, // TODO: API 연동
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: academyQueryKeys.all() });
    },
  });
}

export function useDeleteAcademyBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => id, // TODO: API 연동
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: academyQueryKeys.all() });
    },
  });
}