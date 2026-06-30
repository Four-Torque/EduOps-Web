import { setCachedSession } from "@/lib/session";
import {
  login,
  register,
  registerVerifyMail,
  resetPassword,
  resetPasswordVerifyMail,
  sendResetPasswordMail,
} from "@/services/auth/auth.service";
import { getSession } from "@/services/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useResetPasswordVerifyMail(token?: string) {
  const query = useQuery({
    queryKey: ["resetPasswordVerifyMail", { token }],
    queryFn: () => resetPasswordVerifyMail(token),
  });
  return query;
}

export function useResetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: resetPassword,
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

export function useSendResetPasswordMail() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: sendResetPasswordMail,
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
