import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAcademyInfo, updateAcademyBasicInfo } from "@/services/manager/academy-info.service";
import type { AcademyBasicInfo } from "@/types/manager/academy-info.types";

export const academyInfoQueryKeys = {
  all: () => ["academy-info"] as const,
};

export function useAcademyInfo() {
  return useQuery({
    queryKey: academyInfoQueryKeys.all(),
    queryFn: fetchAcademyInfo,
  });
}

export function useUpdateAcademyBasicInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (info: AcademyBasicInfo) => updateAcademyBasicInfo(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: academyInfoQueryKeys.all() });
    },
  });
}
