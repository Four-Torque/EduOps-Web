import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserTabFilter } from "@/types/director/user.types";

interface DirectorUserUIState {
  date: string;
  tab: UserTabFilter;
  page: number;
  selectedIds: number[];

  setDate: (date: string) => void;
  setTab: (tab: UserTabFilter) => void;
  setPage: (page: number) => void;
  toggleSelect: (id: number) => void;
  toggleSelectAll: (ids: number[]) => void;
  clearSelection: () => void;
}

export const useDirectorUserStore = create<DirectorUserUIState>()(
  devtools(
    (set) => ({
      date: new Date().toISOString().slice(0, 10),
      tab: "all",
      page: 1,
      selectedIds: [],

      setDate: (date) =>
        set({ date, page: 1 }, false, "director-user/set-date"),

      setTab: (tab) =>
        set({ tab, page: 1, selectedIds: [] }, false, "director-user/set-tab"),

      setPage: (page) => set({ page }, false, "director-user/set-page"),

      toggleSelect: (id) =>
        set(
          (state) => ({
            selectedIds: state.selectedIds.includes(id)
              ? state.selectedIds.filter((x) => x !== id)
              : [...state.selectedIds, id],
          }),
          false,
          "director-user/toggle-select",
        ),

      toggleSelectAll: (ids) =>
        set(
          (state) => {
            const allSelected = ids.every((id) =>
              state.selectedIds.includes(id),
            );
            return { selectedIds: allSelected ? [] : [...ids] };
          },
          false,
          "director-user/toggle-select-all",
        ),

      clearSelection: () =>
        set({ selectedIds: [] }, false, "director-user/clear-selection"),
    }),
    { name: "DirectorUserStore" },
  ),
);
