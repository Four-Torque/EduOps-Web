import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PaymentTabFilter } from "@/types/director/pament.types";

// ─── UI 상태만 관리 (서버 데이터는 TanStack Query) ────────────────────────────

interface PaymentUIState {
  date: string;
  tab: PaymentTabFilter;
  selectedIds: number[];

  setDate: (date: string) => void;
  setTab: (tab: PaymentTabFilter) => void;
  toggleSelect: (id: number) => void;
  toggleSelectAll: (ids: number[]) => void;
  clearSelection: () => void;
}

export const usePaymentStore = create<PaymentUIState>()(
  devtools(
    (set) => ({
      date: new Date().toISOString().slice(0, 10),
      tab: "all",
      selectedIds: [],

      setDate: (date) =>
        set({ date }, false, "payment/set-date"),

      setTab: (tab) =>
        set({ tab, selectedIds: [] }, false, "payment/set-tab"),

      toggleSelect: (id) =>
        set(
          (state) => ({
            selectedIds: state.selectedIds.includes(id)
              ? state.selectedIds.filter((x) => x !== id)
              : [...state.selectedIds, id],
          }),
          false,
          "payment/toggle-select",
        ),

      toggleSelectAll: (ids) =>
        set(
          (state) => {
            const allSelected = ids.every((id) => state.selectedIds.includes(id));
            return { selectedIds: allSelected ? [] : [...ids] };
          },
          false,
          "payment/toggle-select-all",
        ),

      clearSelection: () =>
        set({ selectedIds: [] }, false, "payment/clear-selection"),
    }),
    { name: "PaymentStore" },
  ),
);