import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWeeklySchedule,
  createScheduleBulk,
  deleteSchedule,
} from "./api";
import apiClient from "@/shared/lib/axios";

export const scheduleQueryKeys = {
  all: () => ["schedules"] as const,
  list: (room?: string, instructor?: string, subject?: string) =>
    ["schedules", "list", { room, instructor, subject }] as const,
  classes: () => ["schedules", "classes"] as const,
};

export function useWeeklySchedule(
  room?: string,
  instructor?: string,
  subject?: string,
) {
  return useQuery({
    queryKey: scheduleQueryKeys.list(room, instructor, subject),
    queryFn: () => fetchWeeklySchedule(room, instructor, subject),
  });
}

export function useCreateScheduleBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScheduleBulk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all() });
    },
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all() });
    },
  });
}

export function useAllClasses() {
  return useQuery({
    queryKey: scheduleQueryKeys.classes(),
    queryFn: async () => {
      const response = await apiClient.get("/class", {
        params: { limit: 1000 },
      });
      const res = response.data.body ?? response.data;
      return res.data ?? [];
    },
  });
}
