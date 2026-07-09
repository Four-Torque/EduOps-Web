"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { BillingTabFilter, UserStatus } from "@/features/finance/type";

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

      setPage: (page) => set((s) => ({ filter: { ...s.filter, page } })),

      resetFilter: () => set({ filter: DEFAULT_FILTER }),
    }),
    { name: "eduops-finance" },
  ),
);

interface BillingUIState {
  tab: BillingTabFilter;
  page: number;

  setTab: (tab: BillingTabFilter) => void;
  setPage: (page: number) => void;
}

export const useBillingStore = create<BillingUIState>()(
  devtools(
    (set) => ({
      tab: "all",
      page: 1,

      setTab: (tab) => set({ tab, page: 1 }, false, "billing/set-tab"),

      setPage: (page) => set({ page }, false, "billing/set-page"),
    }),
    { name: "BillingStore" },
  ),
);
