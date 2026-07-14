"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  BillingTabFilter,
  BillingCategoryFilter,
  RevenueStatus,
  TransactionType,
} from "@/features/finance/type";

interface FinanceFilter {
  search: string;
  status: RevenueStatus | "all";
  type: TransactionType | "all";
  dateRange: string;
  page: number;
}

interface FinanceStore {
  filter: FinanceFilter;
  setSearch: (search: string) => void;
  setStatus: (status: RevenueStatus | "all") => void;
  setType: (type: TransactionType | "all") => void;
  setDateRange: (dateRange: string) => void;
  setPage: (page: number) => void;
  resetFilter: () => void;
}

const DEFAULT_FILTER: FinanceFilter = {
  search: "",
  status: "all",
  type: "all",
  dateRange: "전체 기간",
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

      setType: (type) =>
        set((s) => ({ filter: { ...s.filter, type, page: 1 } })),

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
  categoryFilter: BillingCategoryFilter;
  page: number;

  setTab: (tab: BillingTabFilter) => void;
  setCategoryFilter: (categoryFilter: BillingCategoryFilter) => void;
  setPage: (page: number) => void;
}

export const useBillingStore = create<BillingUIState>()(
  devtools(
    (set) => ({
      tab: "all",
      categoryFilter: "all",
      page: 1,

      setTab: (tab) => set({ tab, page: 1 }, false, "billing/set-tab"),

      setCategoryFilter: (categoryFilter) =>
        set({ categoryFilter, page: 1 }, false, "billing/set-category-filter"),

      setPage: (page) => set({ page }, false, "billing/set-page"),
    }),
    { name: "BillingStore" },
  ),
);
