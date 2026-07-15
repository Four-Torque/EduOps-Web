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
