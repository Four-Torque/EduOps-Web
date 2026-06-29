export type PaymentStatus = "paid" | "unpaid";

export type RevenueCategory = "수강료" | "교재" | "특강" | "실습비" | "기타";

export interface RevenueItem {
  id: string;
  date: string;
  itemTitle: string;
  itemSub: string;
  studentName: string;
  amount: number;
  status: PaymentStatus;
  category: RevenueCategory;
}

export interface RevenueStats {
  totalRevenue: number;
  unpaidAmount: number;
  unpaidCount: number;
  newEnrollments: number;
  refundCount: number;
  refundAmount: number;
}

export interface MonthlyRevenue {
  month: string;
  current: number;
  previous: number;
}
