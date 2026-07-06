import apiClient from "@/lib/axios";
import { AssetApplicationFormSchema } from "@/validations/asset.valid";
import z from "zod/v3";

export async function findAssetApplications(params: {
  page: string;
  limit: string;
  status?: string;
}) {
  const response = await apiClient.get("asset-application", {
    params,
  });
  return response.data.body;
}

export async function findAssets(params: {
  page: string;
  limit: string;
  search?: string;
}) {
  const response = await apiClient.get("asset", {
    params,
  });
  return response.data.body;
}

export async function createAssetApplication(
  data: z.infer<typeof AssetApplicationFormSchema>,
) {
  const response = await apiClient.post("asset-application", data);
  return response.data;
}

export async function deleteAssetApplications(ids: string[]) {
  const response = await apiClient.delete("asset-application", {
    data: { ids },
  });
  return response.data;
}
