import apiClient from "@/lib/axios";

export async function getSession() {
  const response = await apiClient.get("/user/me");
  return response.data.body;
}
