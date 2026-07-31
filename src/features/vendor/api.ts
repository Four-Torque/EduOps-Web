import apiClient from "@/shared/lib/axios";
import z from "zod/v3";
import { VendorFormSchema } from "./schema";

export async function findVendors(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  const response = await apiClient.get("/vendor", { params });
  return response.data.body;
}

export async function findVendorById(id?: string) {
  const response = await apiClient.get(`/vendor/${id}`);
  return response.data.body;
}

export async function createVendor(values: z.infer<typeof VendorFormSchema>) {
  const response = await apiClient.post("/vendor", values);
  return response.data;
}

export async function editVendor(
  values: z.infer<typeof VendorFormSchema>,
  id?: string,
) {
  const response = await apiClient.put(`/vendor/${id}`, values);
  return response.data;
}

export async function deleteVendors(ids: string[]) {
  const response = await apiClient.delete("/vendor", { data: { ids } });
  return response.data;
}
