import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchPayments, updatePayment } from "./api";
import type { BillingStats, MonthlyRevenue, PaymentItem } from "./type";

export const paymentQueryKeys = {
  all:  () => ["payments"]                    as const,
  list: (filters: any) => ["payments", "list", filters] as const,
  summary: () => ["payments", "summary"]      as const,
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
    queryFn:  () => fetchPayments(filters),
  });
}

// 상단 통계 카드·월별 차트용 요약.
// 전용 서버 엔드포인트(/payment/stats 등)가 비활성 상태라, 결제 목록(GET /payment)을
// 넉넉한 limit으로 전량 조회해 클라이언트에서 집계한다.
export function useBillingSummary() {
  return useQuery({
    queryKey: paymentQueryKeys.summary(),
    queryFn: async () => {
      const { data } = await fetchPayments({ limit: 1000 });
      return buildBillingSummary(data);
    },
  });
}

// 결제 목록을 상단 통계(BillingStats) + 최근 6개월 매출(MonthlyRevenue[])로 집계한다.
// 매출(totalRevenue)·월별 금액은 PAID 건의 amount 합계 기준.
export function buildBillingSummary(items: PaymentItem[]): {
  stats: BillingStats;
  monthly: MonthlyRevenue[];
} {
  const now = new Date();
  const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

  // 최근 6개월 버킷 (오래된 달 → 최신 달)
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      key: monthKey(d),
      label: d.toLocaleString("en-US", { month: "short" }),
      amount: 0,
    };
  });
  const indexByKey = new Map(months.map((m, i) => [m.key, i]));

  const thisKey = monthKey(now);
  const lastKey = monthKey(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  let paidCount = 0;
  let unpaidCount = 0;
  let totalRevenue = 0;
  let thisMonthRevenue = 0;
  let lastMonthRevenue = 0;

  for (const p of items) {
    if (p.paymentType === "PAID") {
      paidCount++;
      totalRevenue += p.amount;

      const paidAt = new Date(p.paymentDate ?? p.createdAt);
      const key = monthKey(paidAt);
      const idx = indexByKey.get(key);
      if (idx !== undefined) months[idx].amount += p.amount;
      if (key === thisKey) thisMonthRevenue += p.amount;
      else if (key === lastKey) lastMonthRevenue += p.amount;
    } else if (p.paymentType === "UNPAID") {
      unpaidCount++;
    }
  }

  const denom = paidCount + unpaidCount;
  const paidRate = denom === 0 ? 0 : Math.round((paidCount / denom) * 100);
  const revenueGrowthRate =
    lastMonthRevenue === 0
      ? 0
      : Math.round(
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100,
        );

  return {
    stats: { totalRevenue, revenueGrowthRate, paidRate, paidCount, unpaidCount },
    monthly: months.map((m) => ({ month: m.label, amount: m.amount })),
  };
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
      toast.success("결제 상태가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: paymentQueryKeys.all() });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
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