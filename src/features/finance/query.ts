import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPayments,
  updatePayment,
  fetchPaymentStats,
  fetchPaymentMonthlyTrends,
} from "./api";

export const financeQueryKeys = {
  all: () => ["payments"] as const,
  lists: () => ["payments", "list"] as const,
  list: (filters: any) => ["payments", "list", filters] as const,
  stats: () => ["payments", "stats"] as const,
  trends: () => ["payments", "trends"] as const,
};

export function usePayments(filters?: {
  studentId?: string;
  classId?: string;
  paymentType?: "PAID" | "UNPAID" | "REFUNDED";
  search?: string;
  type?: "all" | "INCOME" | "EXPENSE";
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: financeQueryKeys.list(filters || {}),
    queryFn: () => fetchPayments(filters),
  });
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      paymentType,
    }: {
      id: string;
      paymentType: "PAID" | "UNPAID" | "REFUNDED";
    }) => updatePayment(id, paymentType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeQueryKeys.all() });
    },
  });
}

export function usePaymentStats() {
  return useQuery({
    queryKey: financeQueryKeys.stats(),
    queryFn: fetchPaymentStats,
  });
}

export function usePaymentMonthlyTrends() {
  return useQuery({
    queryKey: financeQueryKeys.trends(),
    queryFn: fetchPaymentMonthlyTrends,
  });
}
