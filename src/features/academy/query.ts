import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAcademyInfo, updateAcademyBasicInfo } from "./api";
import type { AcademyBasicInfo } from "./type";

export const academyQueryKeys = {
  all: () => ["academy-info"] as const,
  info: () => ["academy-info", "detail"] as const,
};

export function useAcademyInfo() {
  return useQuery({
    queryKey: academyQueryKeys.info(),
    queryFn: fetchAcademyInfo,
  });
}

export function useUpdateAcademyBasicInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (info: AcademyBasicInfo) => updateAcademyBasicInfo(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: academyQueryKeys.all() });
    },
  });
}