import { useQuery } from "@tanstack/react-query";
import {
  getAssetChart,
  getFinanceByPeriod,
  getPaymentChart,
  getSalaryChart,
} from "./api";

export function useGetFinanceByPeriod(params: {
  startDate: string;
  endDate: string;
}) {
  const query = useQuery({
    queryKey: ["finance", "period", params],
    queryFn: () => getFinanceByPeriod(params),
  });
  return query;
}

export function useGetFinanceMonthlyDetail(params: {
  startDate: string;
  endDate: string;
}) {
  const query = useQuery({
    queryKey: ["finance", "detail", "monthly", params],
    queryFn: () =>
      Promise.all([
        getPaymentChart(params),
        getSalaryChart(params),
        getAssetChart(params),
      ]),
  });
  return query;
}

export function useGetFinanceYearlyDetail(params: {
  startDate: string;
  endDate: string;
}) {
  const query = useQuery({
    queryKey: ["finance", "detail", "yearly", params],
    queryFn: () =>
      Promise.all([
        getPaymentChart(params),
        getSalaryChart(params),
        getAssetChart(params),
      ]),
  });
  return query;
}
