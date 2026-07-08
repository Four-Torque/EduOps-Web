import type {
  BillingTabFilter,
  BillingListResponse,
} from "@/types/manager/billing.types";
import {
  MOCK_BILLING_TRANSACTIONS,
  BILLING_PAGE_SIZE,
} from "@/constants/manager/billing.constants";

// TODO: import { apiClient } from "@/lib/axios";

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

  const total      = filtered.length;
  const totalPages = Math.ceil(total / BILLING_PAGE_SIZE) || 1;
  const data       = filtered.slice((page - 1) * BILLING_PAGE_SIZE, page * BILLING_PAGE_SIZE);

  return { data, total, totalPages };
}
