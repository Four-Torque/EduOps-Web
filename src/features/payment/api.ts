import apiClient from "@/shared/lib/axios";
import type { PaymentItem } from "./type";

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

// 서버 /payment/stats, /payment/monthly-trends 엔드포인트가 주석 처리돼 지금은 안 씀.
// export async function fetchPaymentStats(): Promise<PaymentStats> {
//   const response = await apiClient.get("/payment/stats");
//   return response.data.body;
// }
//
// export async function fetchPaymentMonthlyTrends(): Promise<MonthlyTrend[]> {
//   const response = await apiClient.get("/payment/monthly-trends");
//   return response.data.body;
// }
