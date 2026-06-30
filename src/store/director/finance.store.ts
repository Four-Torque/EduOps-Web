"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserStatus } from "@/types/director/finance.types";

interface FinanceFilter {
  search: string;
  status: UserStatus | "all";
  dateRange: string;
  page: number;
}

interface FinanceStore {
  filter: FinanceFilter;
  setSearch: (search: string) => void;
  setStatus: (status: UserStatus | "all") => void;
  setDateRange: (dateRange: string) => void;
  setPage: (page: number) => void;
  resetFilter: () => void;
}

const DEFAULT_FILTER: FinanceFilter = {
  search: "",
  status: "all",
  dateRange: "2023.10.01 - 10.31",
  page: 1,
};

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      filter: DEFAULT_FILTER,

      setSearch: (search) =>
        set((s) => ({ filter: { ...s.filter, search, page: 1 } })),

      setStatus: (status) =>
        set((s) => ({ filter: { ...s.filter, status, page: 1 } })),

      setDateRange: (dateRange) =>
        set((s) => ({ filter: { ...s.filter, dateRange, page: 1 } })),

      setPage: (page) =>
        set((s) => ({ filter: { ...s.filter, page } })),

      resetFilter: () => set({ filter: DEFAULT_FILTER }),
    }),
    { name: "eduops-finance" }
  )
);
