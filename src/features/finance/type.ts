export type TransactionType = "INCOME" | "EXPENSE";

export type RevenueStatus = "PAID" | "UNPAID" | "REFUNDED" | "PENDING" | "COMPLETED";

export type RevenueCategory = "수강료" | "교재" | "급여" | "비품" | "기타";

export interface RevenueItem {
  id: string;
  date: string;
  itemTitle: string;
  itemSub: string;
  studentName: string;
  amount: number;
  status: RevenueStatus;
  category: RevenueCategory;
  type: TransactionType;
}

export interface RevenueStats {
  totalRevenue: number;
  totalExpense: number;
  netProfit: number;
  unpaidAmount: number;
  unpaidCount: number;
  newEnrollments: number;
  refundCount: number;
  refundAmount: number;
}

export interface MonthlyRevenue {
  month: string;
  current?: number;
  previous?: number;
  amount?: number;
}

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
