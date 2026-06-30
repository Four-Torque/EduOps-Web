import { register, registerVerifyMail } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        // toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useRegisterVerifyMail() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (token?: string) => registerVerifyMail(token),
    onSuccess: (data) => {
      // toast.success(data.message);
      router.push("/login");
    },
  });
  return mutation;
}
