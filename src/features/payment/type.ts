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

// GET /payment/stats, /payment/monthly-trends는 서버에서 주석 처리돼 지금은 안 씀.
// (BillingStatsPanel/BillingRevenueChart도 렌더 자체가 꺼져있어 목데이터만 씀)

// 아래는 상단 차트/통계(BillingRevenueChart, BillingStatsPanel)용 타입.
// 두 컴포넌트는 BillingSection에서 렌더 자체가 주석 처리돼 있어 아직 목데이터를 쓴다.
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
