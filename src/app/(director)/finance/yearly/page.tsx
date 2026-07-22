"use client";

import { useFinanceStore } from "@/features/finance/store";
import { useGetFinanceYearlyDetail } from "@/features/finance/query";
import { FinancesDateChart } from "@/features/finance/components/FinancesDateChart";
import Navigation from "@/features/finance/components/Navigation";
import { CardContent } from "@/shared/components/ui/card";

export default function FinancePage() {
  const { startDate, endDate } = useFinanceStore();
  const { data, isLoading } = useGetFinanceYearlyDetail({
    startDate,
    endDate,
  });
  if (isLoading) return null;
  return (
    <>
      <Navigation type="YEARLY" />
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
                viewMode="MONTH"
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
                viewMode="MONTH"
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
                viewMode="MONTH"
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
                }, [])}
                startDate={startDate}
                endDate={endDate}
                type="TOTAL"
                viewMode="MONTH"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
