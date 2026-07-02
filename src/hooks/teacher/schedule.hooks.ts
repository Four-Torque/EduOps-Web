import { useQuery } from "@tanstack/react-query";
import { fetchWeeklySchedule } from "@/services/teacher/schedule.service";

export const scheduleQueryKeys = {
  all: () => ["teacher", "schedule"] as const,
  weekly: () => [...scheduleQueryKeys.all(), "weekly"] as const,
};

export function useWeeklySchedule() {
  return useQuery({
    queryKey: scheduleQueryKeys.weekly(),
    queryFn: fetchWeeklySchedule,
  });
}