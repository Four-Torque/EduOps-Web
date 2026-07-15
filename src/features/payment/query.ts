import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPayments, updatePayment } from "./api";

export const paymentQueryKeys = {
  all: () => ["payments"] as const,
  list: (filters: any) => ["payments", "list", filters] as const,
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
    queryKey: paymentQueryKeys.list(filters || {}),
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
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all() });
    },
  });
}

// 서버 /payment/stats, /payment/monthly-trends 엔드포인트가 주석 처리돼 지금은 안 씀.
// export function usePaymentStats() {
//   return useQuery({
//     queryKey: ["payments", "stats"],
//     queryFn: fetchPaymentStats,
//   });
// }
//
// export function usePaymentMonthlyTrends() {
//   return useQuery({
//     queryKey: ["payments", "trends"],
//     queryFn: fetchPaymentMonthlyTrends,
//   });
// }