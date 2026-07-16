"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { IncomeExpenseFilter } from "@/features/finance/components/IncomeExpenseFilter";
import { FinancesDateChart } from "@/features/finance/components/FinancesDateChart";
import { useFinanceStore } from "@/features/finance/store";
import FinancesDateList from "@/features/finance/components/FinancesDateList";
import { useGetFinanceByPeriod } from "@/features/finance/query";
import Navigation from "@/features/finance/components/Navigation";

export default function FinancePage() {
  const { startDate, endDate } = useFinanceStore();
  const { data, isLoading } = useGetFinanceByPeriod({ startDate, endDate });
  if (isLoading) return null;

  return (
    <div className="space-y-4">
      <Navigation type="MONTHLY" />
      <Card className="w-full">
        <CardContent className="w-full flex md:justify-end items-center">
          <div className="flex-1">
            <IncomeExpenseFilter finances={data} />
          </div>
          <div className="h-75 flex-4">
            <FinancesDateChart
              finances={data}
              startDate={startDate}
              endDate={endDate}
              viewMode="DAY"
            />
          </div>
        </CardContent>
      </Card>
      <FinancesDateList finances={data} />
    </div>
  );
}
