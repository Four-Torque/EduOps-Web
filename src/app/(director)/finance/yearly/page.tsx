"use client";

import { useFinanceStore } from "@/features/finance/store";
import { useGetFinanceYearlyDetail } from "@/features/finance/query";
import { FinancesDateChart } from "@/features/finance/components/FinancesDateChart";
import Navigation from "@/features/finance/components/Navigation";

export default function FinancePage() {
  const { startDate, endDate } = useFinanceStore();
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  const { data, isLoading } = useGetFinanceYearlyDetail({
    startDate,
    endDate,
  });
  if (isLoading) return null;

  console.log("data", data);
  return (
    <>
      <Navigation type="YEARLY" />
      <div className="w-full flex flex-col gap-4 items-center mt-4">
        <div className="w-full flex flex-col">
          <h2 className="text-lg font-semibold mb-4 border-b">수강료</h2>
          <div className="h-75">
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
      </div>
    </>
  );
}
