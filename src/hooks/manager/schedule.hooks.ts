// @/hooks/manager/schedule.hooks.ts
import { useQuery } from "@tanstack/react-query";
import { MOCK_SCHEDULE } from "@/constants/manager/schedule.constants";
import { useScheduleStore } from "@/store/manager/schedule.store";
import type { ScheduleResponse } from "@/types/manager/schedule.types";

export function useSchedule() {
  const { date, room, instructor, subject } = useScheduleStore();

  return useQuery<ScheduleResponse>({
    queryKey: ["schedule", date.toISOString(), room, instructor, subject],
    queryFn: async () => {
      // TODO: 실제 API 연결
      return MOCK_SCHEDULE;
    },
  });
}