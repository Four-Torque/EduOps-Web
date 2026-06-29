import type {
  PaymentTabFilter,
  PaymentUser,
  PaymentApprovalStatus,
  PaymentUserListResponse,
} from "../types/payment.types";
import { MOCK_PAYMENT_USERS } from "../constants/payment.constants";

// TODO: lib/axios 인스턴스로 교체
// import { apiClient } from "../lib/axios";

interface FetchPaymentUsersParams {
  date: string;
  tab: PaymentTabFilter;
}

export async function fetchPaymentUsers(
  params: FetchPaymentUsersParams,
): Promise<PaymentUserListResponse> {
  // TODO: return apiClient.get("/payment/users", { params });

  // mock
  await new Promise((res) => setTimeout(res, 300));

  const items =
    params.tab === "all"
      ? MOCK_PAYMENT_USERS
      : MOCK_PAYMENT_USERS.filter((u) => u.status === params.tab);

  return { items, totalItems: items.length, totalPages: 1 };
}

export async function updatePaymentUserStatus(
  userId: number,
  status: PaymentApprovalStatus,
): Promise<PaymentUser> {
  // TODO: return apiClient.patch(`/payment/users/${userId}/status`, { status });

  await new Promise((res) => setTimeout(res, 200));
  return { ...MOCK_PAYMENT_USERS.find((u) => u.id === userId)!, status };
}

export async function deletePaymentUsers(ids: number[]): Promise<void> {
  // TODO: return apiClient.delete("/payment/users", { data: { ids } });

  await new Promise((res) => setTimeout(res, 200));
}