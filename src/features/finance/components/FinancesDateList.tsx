"use client";

import { CardContent } from "@/shared/components/ui/card";
import TransactionDetailHeader from "./FinanceDetailHeader";
import TransactionDetailItem from "./FinanceDetailItem";
import { useFilteredFinances } from "../hook";
import { Finance, FinanceDetail } from "../type";

interface FinancesDateListProps {
  finances: Finance[];
}

export default function FinancesDateList({ finances }: FinancesDateListProps) {
  const {
    finances: filteredFinances,
    expandedDates,
    toggleDetails,
  } = useFilteredFinances(finances);
  return (
    <div className="w-full p-0">
      <CardContent className="p-0">
        <div className="w-full rounded-md border shadow-md">
          {filteredFinances.length > 0 ? (
            filteredFinances.map((finance) => {
              const totalAmount = finance.details.reduce(
                (sum: number, detail: FinanceDetail) => {
                  const raw = Number(detail.amount) || 0;
                  const amt =
                    detail.type === "EXPENSE" ? -Math.abs(raw) : Math.abs(raw);
                  return sum + amt;
                },
                0,
              );

              return (
                <div key={finance.date} className="border-t leading-11">
                  <TransactionDetailHeader
                    finance={finance}
                    totalAmount={totalAmount}
                    toggleDetails={toggleDetails}
                  />

                  {expandedDates.includes(finance.date) && (
                    <ul>
                      {finance.details.map((detail: FinanceDetail) => (
                        <TransactionDetailItem
                          key={detail.id}
                          detail={detail}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          ) : (
            <div className="w-full rounded-md border h-50 flex justify-center items-center">
              <p className="text-muted-foreground font-semibold">
                해당 월의 데이터가 없습니다.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
