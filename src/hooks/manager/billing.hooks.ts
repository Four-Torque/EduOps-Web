import { useQuery } from "@tanstack/react-query";
import { fetchBillingTransactions } from "@/services/manager/billing.service";
import { useBillingStore } from "@/store/manager/billing.store";

export const billingQueryKeys = {
  all:  ()                            => ["billing"]                      as const,
  list: (tab: string, page: number)   => ["billing", "list", tab, page]   as const,
};

export function useBillingTransactions() {
  const { tab, page } = useBillingStore();

  return useQuery({
    queryKey: billingQueryKeys.list(tab, page),
    queryFn:  () => fetchBillingTransactions(tab, page),
    placeholderData: (prev) => prev,
  });
}
