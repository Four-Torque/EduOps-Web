"use client";

import { CardContent } from "@/shared/components/ui/card";
import { useFinanceStore } from "@/features/finance/store";
import { useGetFinanceMonthlyDetail } from "@/features/finance/query";
import { FinancesDateChart } from "@/features/finance/components/FinancesDateChart";
import Navigation from "@/features/finance/components/Navigation";

export default function FinancePage() {
  const { startDate, endDate } = useFinanceStore();
  const { data, isLoading } = useGetFinanceMonthlyDetail({
    startDate,
    endDate,
  });

  if (isLoading) return null;

  return (
    <>
      <Navigation type="MONTHLY" />

      <CardContent className="w-full flex flex-col gap-4 mt-4 items-center">
        <div className="w-full flex gap-4">
          <div className="w-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b">수강료</h2>
            <div className="h-75 flex gap-4">
              <FinancesDateChart
                finances={data?.[0]}
                startDate={startDate}
                endDate={endDate}
                type="PAYMENT"
                viewMode="DAY"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b">급여</h2>
            <div className="h-75">
              <FinancesDateChart
                finances={data?.[1]}
                startDate={startDate}
                endDate={endDate}
                type="SALARY"
                viewMode="DAY"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b">자재</h2>
            <div className="h-75">
              <FinancesDateChart
                finances={data?.[2]}
                startDate={startDate}
                endDate={endDate}
                type="ASSET"
                viewMode="DAY"
              />
            </div>
          </div>

          <div className="w-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 border-b">총합</h2>
            <div className="h-75">
              <FinancesDateChart
                finances={data?.slice(0, 3).reduce((acc, curr) => {
                  if (!curr) return acc;
                  return acc.concat(curr);
                }, [] as any)}
                startDate={startDate}
                endDate={endDate}
                type="TOTAL"
                viewMode="DAY"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
