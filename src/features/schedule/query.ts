import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWeeklySchedule,
  createScheduleBulk,
  createBulkSchedule,
  deleteSchedule,
  fetchClassSchedules
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

// export function useDeleteSchedule() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteSchedule,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: scheduleQueryKeys.all() });
//     },
//   });
// }

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


export const useCreateBulkSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { classId: string; schedules: { dayOfWeek: number; startTime: string; endTime: string; room: string }[] }) => createBulkSchedule(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["classSchedules", variables.classId] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useClassSchedules = (classId: string) => {
  return useQuery({
    queryKey: ["classSchedules", classId],
    queryFn: () => fetchClassSchedules(classId),
    enabled: !!classId,
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classSchedules"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
