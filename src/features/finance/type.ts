export type PeriodType = "WEEK" | "MONTH" | "YEAR";

export interface CategoryLabel {
  name: string;
  color: string;
  icon: string;
}

export type Finance = {
  date: string;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  details: FinanceDetail[];
};

export type FinanceDetail = {
  id: string;
  date: string;
  time: string;
  type: "EXPENSE" | "INCOME";
  amount: number;
  category: "ASSET" | "SALARY" | "ENROLLMENT_FEE";
  title: string;
  status: string;
};

export interface MonthlyRevenue {
  month: string;
  current: number;
  previous: number;
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

export interface RevenueItem {
  id: string;
  date: string;
  itemTitle: string;
  itemSub: string;
  studentName: string;
  amount: number;
  status: string;
  category: string;
  type: "INCOME" | "EXPENSE";
}

export type RevenueStatus = "PAID" | "UNPAID" | "REFUNDED" | "COMPLETED" | "PENDING";



