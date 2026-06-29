export type PaymentApprovalStatus = "pending" | "approved" | "cancelled";
export type PaymentRoleType = "선생님" | "관리자";
export type PaymentTabFilter = "all" | PaymentApprovalStatus;

export interface PaymentUser {
  id: number;
  name: string;
  phone: string;
  requestedAt: string;
  role: PaymentRoleType;
  status: PaymentApprovalStatus;
}