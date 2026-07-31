import { create } from "zustand";
import { subMonths, addMonths, addYears, subYears } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface FinanceState {
  currentDate: Date;
  startDate: string;
  endDate: string;
  todayActual: Date;
  setCurrentDate: (date: Date) => void;
  setStartDate: (date: Date, type: "MONTHLY" | "YEARLY") => void;
  setEndDate: (date: Date, type: "MONTHLY" | "YEARLY") => void;
  handlePrev: (type: "MONTHLY" | "YEARLY") => void;
  handleNext: (type: "MONTHLY" | "YEARLY") => void;
  jumpToToday: (type: "MONTHLY" | "YEARLY") => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => {
  const today = toZonedTime(new Date(), "Asia/Seoul");

  return {
    currentDate: today,
    todayActual: today,
    startDate: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`,
    endDate: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`,

    setCurrentDate: (currentDate) => set({ currentDate }),
    setStartDate: (currentDate: Date, type: "MONTHLY" | "YEARLY") =>
      set({
        startDate:
          type === "MONTHLY"
            ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`
            : `${currentDate.getFullYear()}-01-01`,
      }),
    setEndDate: (currentDate: Date, type: "MONTHLY" | "YEARLY") =>
      set({
        endDate:
          type === "MONTHLY"
            ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()}`
            : `${currentDate.getFullYear()}-12-31`,
      }),

    handlePrev: (type: "MONTHLY" | "YEARLY") => {
      const { currentDate, setStartDate, setEndDate } = get();
      const newDate =
        type === "YEARLY"
          ? subYears(currentDate, 1)
          : subMonths(currentDate, 1);
      set({ currentDate: newDate });
      setStartDate(newDate, type);
      setEndDate(newDate, type);
    },

    handleNext: (type: "MONTHLY" | "YEARLY") => {
      const { currentDate, setStartDate, setEndDate } = get();

      const newDate =
        type === "YEARLY"
          ? addYears(currentDate, 1)
          : addMonths(currentDate, 1);

      set({ currentDate: newDate });
      setStartDate(newDate, type);
      setEndDate(newDate, type);
    },

    jumpToToday: (type: "MONTHLY" | "YEARLY") => {
      const { todayActual, setStartDate, setEndDate } = get();
      set({ currentDate: todayActual });
      setStartDate(todayActual, type);
      setEndDate(todayActual, type);
    },
  };
});

interface FilterState {
  showExpense: boolean;
  showIncome: boolean;
  toggleExpense: () => void;
  toggleIncome: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  showExpense: true,
  showIncome: true,
  toggleExpense: () => set((state) => ({ showExpense: !state.showExpense })),
  toggleIncome: () => set((state) => ({ showIncome: !state.showIncome })),
}));
