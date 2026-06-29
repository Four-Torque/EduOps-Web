export type UserApprovalStatus = "pending" | "approved" | "cancelled";
export type UserRoleType = "선생님" | "관리자";
export type UserTabFilter = "all" | UserApprovalStatus;

export interface DirectorUser {
  id: number;
  name: string;
  phone: string;
  requestedAt: string;
  role: UserRoleType;
  status: UserApprovalStatus;
}

export interface DirectorUserListResponse {
  items: DirectorUser[];
  totalItems: number;
  totalPages: number;
}
