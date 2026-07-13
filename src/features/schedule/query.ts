import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBulkSchedule, fetchClassSchedules, deleteSchedule } from "./api";

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
