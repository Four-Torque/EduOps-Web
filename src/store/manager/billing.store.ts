import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BillingTabFilter } from "@/types/manager/billing.types";

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

      setTab: (tab) =>
        set({ tab, page: 1 }, false, "billing/set-tab"),

      setPage: (page) =>
        set({ page }, false, "billing/set-page"),
    }),
    { name: "BillingStore" },
  ),
);
