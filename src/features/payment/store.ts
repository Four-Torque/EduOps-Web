"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BillingTabFilter, BillingCategoryFilter } from "./type";

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