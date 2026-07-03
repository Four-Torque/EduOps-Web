import type { AcademyInfoResponse, AcademyBasicInfo } from "@/types/manager/academy-info.types";
import {
  MOCK_ACADEMY_BASIC_INFO,
  MOCK_ACADEMY_OVERVIEW,
  MOCK_ACADEMY_BRANCHES,
} from "@/constants/manager/academy-info.constants";

// TODO: import { apiClient } from "@/lib/axios";

export async function fetchAcademyInfo(): Promise<AcademyInfoResponse> {
  // TODO: return apiClient.get("/academy/info");

  await new Promise((res) => setTimeout(res, 300));

  return {
    basicInfo: MOCK_ACADEMY_BASIC_INFO,
    overview: MOCK_ACADEMY_OVERVIEW,
    branches: MOCK_ACADEMY_BRANCHES,
  };
}

export async function updateAcademyBasicInfo(info: AcademyBasicInfo): Promise<AcademyBasicInfo> {
  // TODO: return apiClient.put("/academy/info", info);

  await new Promise((res) => setTimeout(res, 300));
  return info;
}
