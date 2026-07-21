"use client";

import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isSameMonth, format } from "date-fns";
import { useFinanceStore } from "../store";

interface NavigationProps {
  type?: "MONTHLY" | "YEARLY";
}


export default function Navigation({ type = "MONTHLY" }: NavigationProps) {
  const { currentDate, todayActual, handlePrev, handleNext, jumpToToday } =
    useFinanceStore();

  const periodTitle = useMemo(() => {
    if (type === "YEARLY") {
      return format(currentDate, "yyyy년");
    } else {
      return format(currentDate, "yyyy년 MM월");
    }
  }, [currentDate]);

  const isNextDisabled = useMemo(() => {
    if (type === "YEARLY") {
      return currentDate.getFullYear() === todayActual.getFullYear();
    } else {
      return (
        isSameMonth(currentDate, todayActual) &&
        currentDate.getFullYear() === todayActual.getFullYear()
      );
    }
  }, [currentDate, todayActual]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pb-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePrev(type)}
          className="size-8"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="text-sm font-semibold min-w-35 text-center">
          {periodTitle}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleNext(type)}
          className="size-8"
          disabled={isNextDisabled}
        >
          <ChevronRight className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => jumpToToday(type)}
          className="text-xs"
        >
          오늘로 이동
        </Button>
      </div>
    </div>
  );
}
