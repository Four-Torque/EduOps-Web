import { apiClient } from "@/lib/axios";
import { LoginFormSchema, RegisterFormSchema } from "@/validations/auth.valid";
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
