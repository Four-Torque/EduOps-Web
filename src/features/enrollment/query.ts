import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEnrollment, fetchClassEnrollments, deleteEnrollment } from "./api";
import { CreateEnrollmentRequest, EnrollmentResponse } from "./type";

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation<EnrollmentResponse, any, CreateEnrollmentRequest>({
    mutationFn: (payload: Parameters<typeof createEnrollment>[0]) => createEnrollment(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", { classId: variables.classId }] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useClassEnrollments = (classId: string) => {
  return useQuery<EnrollmentResponse[], any>({
    queryKey: ["enrollments", { classId }],
    queryFn: () => fetchClassEnrollments(classId),
    enabled: !!classId,
  });
};

export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
