import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerStudent } from "@/services/manager/student-register.service";
import { useStudentRegisterStore } from "@/store/manager/student-register.store";
import { studentQueryKeys } from "@/hooks/manager/student.hooks";

export function useRegisterStudent() {
  const queryClient = useQueryClient();
  const closeModal = useStudentRegisterStore((state) => state.closeModal);

  return useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    },
  });
}
