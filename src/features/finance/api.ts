import type {
  BillingTabFilter,
  BillingListResponse,
  RevenueStats,
  MonthlyRevenue,
  RevenueStatus,
} from "@/features/finance/type";
import {
  MOCK_BILLING_TRANSACTIONS,
  BILLING_PAGE_SIZE,
} from "@/shared/constants/manager/billing.constants";
import apiClient from "@/shared/lib/axios";

export async function fetchBillingTransactions(
  tab: BillingTabFilter,
  page: number,
): Promise<BillingListResponse> {
  // TODO: return apiClient.get("/billing", { params: { status: tab, page, pageSize: BILLING_PAGE_SIZE } });

  await new Promise((res) => setTimeout(res, 300));

  const filtered =
    tab === "all"
      ? MOCK_BILLING_TRANSACTIONS
      : MOCK_BILLING_TRANSACTIONS.filter((t) => t.status === tab);

  const total = filtered.length;
  const totalPages = Math.ceil(total / BILLING_PAGE_SIZE) || 1;
  const data = filtered.slice(
    (page - 1) * BILLING_PAGE_SIZE,
    page * BILLING_PAGE_SIZE,
  );

  return { data, total, totalPages };
}

export async function fetchPayments(params?: {
  studentId?: string;
  classId?: string;
  paymentType?: RevenueStatus;
  search?: string;
  type?: "all" | "INCOME" | "EXPENSE";
  page?: number;
  limit?: number;
}) {
  const response = await apiClient.get("/payment", { params });
  return response.data.body;
}

export async function updatePayment(
  id: string,
  paymentType: RevenueStatus,
): Promise<any> {
  const response = await apiClient.patch(`/payment/${id}`, { paymentType });
  return response.data.body;
}

export async function fetchPaymentStats(): Promise<RevenueStats> {
  const response = await apiClient.get("/payment/stats");
  return response.data.body;
}

export async function fetchPaymentMonthlyTrends(): Promise<MonthlyRevenue[]> {
  const response = await apiClient.get("/payment/monthly-trends");
  return response.data.body;
}
