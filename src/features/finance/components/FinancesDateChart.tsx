"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/shared/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useFilterStore } from "../store";
import { Finance } from "../type";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { ko } from "date-fns/locale";

interface ChartDataPoint {
  day: string;
  expense: number;
  income: number;
}

export type ChartSectionType = "TOTAL" | "ASSET" | "PAYMENT" | "SALARY";

interface FinancesDateChartProps {
  finances?: Finance[];
  startDate: string;
  endDate: string;
  type?: ChartSectionType;
  viewMode?: "DAY" | "MONTH";
}

export function FinancesDateChart({
  finances = [],
  startDate,
  endDate,
  type = "TOTAL",
  viewMode,
}: FinancesDateChartProps) {
  const { showExpense, showIncome } = useFilterStore();

  const autoViewMode = viewMode
    ? viewMode
    : differenceInDays(new Date(endDate), new Date(startDate)) > 90
      ? "MONTH"
      : "DAY";

  const formattedData = fillEmptyDates(
    finances,
    startDate,
    endDate,
    autoViewMode,
  );

  const chartConfig = {
    expense: { label: "지출", color: "#ff616a" },
    income: { label: "수입", color: "#4a74fb" },
  } satisfies ChartConfig;

  const shouldRenderExpense =
    type === "TOTAL" ? showExpense : ["ASSET", "SALARY"].includes(type);

  const shouldRenderIncome = type === "TOTAL" ? showIncome : type === "PAYMENT";

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        data={formattedData}
        margin={{ top: 15, left: 10, right: 10, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => (v == 0 ? "0" : `${v / 10000}만원`)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        {shouldRenderExpense && (
          <Line
            dataKey="expense"
            type="monotone"
            stroke="#ff616a"
            strokeWidth={2}
            dot={autoViewMode === "MONTH"}
          />
        )}
        {shouldRenderIncome && (
          <Line
            dataKey="income"
            type="monotone"
            stroke="#4a74fb"
            strokeWidth={2}
            dot={autoViewMode === "MONTH"}
          />
        )}
      </LineChart>
    </ChartContainer>
  );
}

export function fillEmptyDates(
  finances: Finance[],
  startDate: string,
  endDate: string,
  viewMode: "DAY" | "MONTH",
): ChartDataPoint[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (viewMode === "DAY") {
    const allDays = eachDayOfInterval({ start, end });
    const financeMap = new Map<
      string,
      { totalExpense: number; totalIncome: number }
    >();

    finances.forEach((item) => {
      financeMap.set(item.date, {
        totalExpense: item.totalExpense,
        totalIncome: item.totalIncome,
      });
    });

    return allDays.map((day) => {
      const dateKey = format(day, "MM/dd (EEE)", { locale: ko });
      const actualData = financeMap.get(dateKey);

      return {
        day: format(day, "d일", { locale: ko }),
        expense: actualData ? actualData.totalExpense : 0,
        income: actualData ? actualData.totalIncome : 0,
      };
    });
  }

  const monthlyDataMap = new Map<string, { expense: number; income: number }>();

  for (let m = 1; m <= 12; m++) {
    const monthKey = `${String(m).padStart(2, "0")}월`;
    monthlyDataMap.set(monthKey, { expense: 0, income: 0 });
  }

  finances.forEach((item) => {
    try {
      let monthStr = "";

      if (item.date.includes("/")) {
        monthStr = item.date.split("/")[0].trim().padStart(2, "0");
      } else if (item.date.includes("-")) {
        monthStr = item.date.split("-")[1].trim().padStart(2, "0");
      }

      if (monthStr) {
        const monthKey = `${monthStr}월`;
        const currentVal = monthlyDataMap.get(monthKey);

        if (currentVal) {
          monthlyDataMap.set(monthKey, {
            expense: currentVal.expense + item.totalExpense,
            income: currentVal.income + item.totalIncome,
          });
        }
      }
    } catch (e) {
      console.error("월 데이터 파싱 실패: ", item.date, e);
    }
  });

  return Array.from(monthlyDataMap.entries()).map(([monthKey, value]) => ({
    day: format(
      new Date(`${start.getFullYear()}-${monthKey.replace("월", "")}-01`),
      "M월",
      { locale: ko },
    ),
    expense: value.expense,
    income: value.income,
  }));
}
