import { apiClient } from "@/shared/lib/axios";
import type { AcademyBasicInfo, AcademyInfoResponse } from "./type";

export async function fetchAcademyInfo(): Promise<AcademyInfoResponse> {
  const { data } = await apiClient.get("/academy/info");
  return data;
}

export async function updateAcademyBasicInfo(
  info: AcademyBasicInfo,
): Promise<AcademyBasicInfo> {
  const { data } = await apiClient.put("/academy/info", info);
  return data;
}

export async function deleteAcademyBranch(id: number): Promise<void> {
  await apiClient.delete(`/academy/branches/${id}`);
}
