import type {
  UserTabFilter,
  DirectorUser,
  UserApprovalStatus,
  DirectorUserListResponse,
} from "@/types/director/user.types";
import { MOCK_DIRECTOR_USERS } from "@/constants/director/user.constants";

// TODO: import { apiClient } from "@/lib/axios";

export const USER_PAGE_SIZE = 5;

export async function fetchDirectorUsers(
  tab: UserTabFilter,
  page: number,
): Promise<DirectorUserListResponse> {
  // TODO: return apiClient.get("/users", { params: { status: tab, page, pageSize: USER_PAGE_SIZE } });

  await new Promise((res) => setTimeout(res, 300));

  const filtered =
    tab === "all"
      ? MOCK_DIRECTOR_USERS
      : MOCK_DIRECTOR_USERS.filter((u) => u.status === tab);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / USER_PAGE_SIZE);
  const items = filtered.slice((page - 1) * USER_PAGE_SIZE, page * USER_PAGE_SIZE);

  return { items, totalItems, totalPages };
}

export async function updateDirectorUserStatus(
  userId: number,
  status: UserApprovalStatus,
): Promise<DirectorUser> {
  // TODO: return apiClient.patch(`/users/${userId}/status`, { status });

  await new Promise((res) => setTimeout(res, 200));
  return { ...MOCK_DIRECTOR_USERS.find((u) => u.id === userId)!, status };
}

export async function deleteDirectorUsers(ids: number[]): Promise<void> {
  // TODO: return apiClient.delete("/users", { data: { ids } });

  await new Promise((res) => setTimeout(res, 200));
}