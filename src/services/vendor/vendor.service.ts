import apiClient from "@/lib/axios";

export async function findVendors(params: { page: string; limit: string }) {
  const response = await apiClient.get("/vendor", { params });
  return response.data.body;
}
