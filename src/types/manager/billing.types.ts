export type BillingStatus = "완료" | "미완료" | "대기" | "연체";
export type BillingTabFilter = "all" | BillingStatus;

export interface BillingTransaction {
  id: string;
  studentName: string;
  studentCode: string;
  avatarInitial: string;
  description: string;
  amount: number;
  date: string;
  status: BillingStatus;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface BillingStats {
  totalRevenue: number;
  revenueGrowthRate: number;
  paidRate: number;
  paidCount: number;
  unpaidCount: number;
}

export interface BillingListResponse {
  data: BillingTransaction[];
  total: number;
  totalPages: number;
}
