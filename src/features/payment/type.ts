export type BillingStatus = "완료" | "미완료" | "대기" | "연체";
export type BillingTabFilter = "all" | BillingStatus;
export type BillingCategoryFilter = "all";

export type PaymentItemStatus = "PAID" | "UNPAID" | "REFUNDED";

// GET /payment 목록 한 건. 서버 PaymentResponse와 대응 (findAll이 Payment 전용으로 단순화됨).
export interface PaymentItem {
  id: string;
  classId: string;
  studentId: string;
  title: string;
  amount: number;
  paymentType: PaymentItemStatus;
  paymentDate: string | null;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
  studentName?: string;
  className?: string;
}

export interface BillingStats {
  totalRevenue: number;
  revenueGrowthRate: number;
  paidRate: number;
  paidCount: number;
  unpaidCount: number;
}

export interface MonthlyRevenue {
  month: string;
  amount?: number;
}

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
