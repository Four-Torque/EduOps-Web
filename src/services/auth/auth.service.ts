import { apiClient } from "@/lib/axios";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
} from "@/validations/auth.valid";
import { z } from "zod/v3";

export async function register(values: z.infer<typeof RegisterFormSchema>) {
  const { confirmPassword, terms, ...payload } = values;
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
}

export async function registerVerifyMail(token?: string) {
  const values = { token, type: "register" };
  const response = await apiClient.post("/auth/verify", values);
  return response.data;
}

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const response = await apiClient.post("/auth/login", values);
  return response.data;
}

export async function sendResetPasswordMail(email: string) {
  const values = { email, type: "reset" };
  const response = await apiClient.post("/auth/reset-password/send", values);
  return response.data;
}

export async function resetPasswordVerifyMail(token?: string) {
  const response = await apiClient.get("/auth/reset-password/verify", {
    params: { token },
  });
  return response.data.body;
}

export async function resetPassword(
  values: z.infer<typeof ResetPasswordFormSchema>,
) {
  const { confirmNewPassword, ...rest } = values;
  const response = await apiClient.put("/auth/reset-password", rest);

  return response.data;
}
