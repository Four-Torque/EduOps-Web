import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  login,
  logout,
  register,
  registerVerifyMail,
  resetPassword,
  resetPasswordVerifyMail,
  sendResetPasswordMail,
} from "./api";
import { clearStoredTabs } from "@/shared/hooks/useTabs";

export function useRegister() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
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
      toast.success(data.message);
      router.push("/login");
    },
  });
  return mutation;
}

export function useLogin() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useLogout() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearStoredTabs();
      router.push("/login");
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
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
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
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
