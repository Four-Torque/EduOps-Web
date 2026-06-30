import { setCachedSession } from "@/lib/session";
import {
  login,
  register,
  registerVerifyMail,
} from "@/services/auth/auth.service";
import { getSession } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const session = await getSession();
      setCachedSession(session);
      queryClient.setQueryData(["session"], { session });
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        // toast.error(error.message);
      }
    },
  });
  return mutation;
}
