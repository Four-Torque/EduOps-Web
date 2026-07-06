import apiClient from "@/lib/axios";

export async function findCategories() {
  const response = await apiClient.get("category");
  return response.data.body;
}
