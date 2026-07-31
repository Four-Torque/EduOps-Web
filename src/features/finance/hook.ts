import { useEffect, useState } from "react";
import { useFilterStore } from "./store";
import { Finance } from "./type";

export function useFilteredFinances(rawData: Finance[] | undefined) {
  const { showExpense, showIncome } = useFilterStore();
  const [expandedDates, setExpandedDates] = useState<string[]>([]);

  const finances: Finance[] = (rawData ?? [])
    .map((finance: Finance) => ({
      ...finance,
      details: finance.details.filter((detail: any) => {
        if (detail.type === "EXPENSE" && !showExpense) return false;
        if (detail.type === "INCOME" && !showIncome) return false;
        return true;
      }),
    }))
    .filter((finance: Finance) => finance.details.length > 0);

  useEffect(() => {
    setExpandedDates((rawData ?? []).map((finance: Finance) => finance.date));
  }, [rawData]);

  const toggleDetails = (date: string) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  return { finances, expandedDates, toggleDetails };
}
