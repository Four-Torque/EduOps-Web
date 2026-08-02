import apiClient from "@/shared/lib/axios";
import type { PaymentItem, BillingStats, MonthlyRevenue } from "./type";

interface PaginatedPaymentItems {
  page: number;
  total: number;
  totalPages: number;
  data: PaymentItem[];
}

export async function fetchPayments(params?: {
  studentId?: string;
  classId?: string;
  paymentType?: "PAID" | "UNPAID" | "REFUNDED";
  search?: string;
  type?: "all" | "INCOME" | "EXPENSE";
  page?: number;
  limit?: number;
}): Promise<PaginatedPaymentItems> {
  const response = await apiClient.get("/payment", { params });
  return response.data.body;
}

export async function updatePayment(
  id: string,
  paymentType: "PAID" | "UNPAID" | "REFUNDED",
): Promise<void> {
  await apiClient.patch(`/payment/${id}`, { paymentType });
}

// 상단 통계 카드·매출 차트용 요약. 서버가 기간 집계까지 끝낸 값을 반환한다.
// startDate/endDate 생략 시 서버가 최근 6개월을 기본값으로 사용.
export async function fetchBillingSummary(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<{ stats: BillingStats; monthly: MonthlyRevenue[] }> {
  const response = await apiClient.get("/payment/summary", { params });
  return response.data.body;
}
