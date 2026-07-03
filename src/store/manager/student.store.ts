import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { StudentTabFilter } from "@/types/manager/student.types"

interface StudentUIState {
  tab: StudentTabFilter;
  searchQuery: string;
  page: number;
  selectedIds:  string[]; 

  setTab: (tab: StudentTabFilter) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  toggleSelect: (id: string) => void;
  toggleSelectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

export const useStudentStore = create<StudentUIState>()(
  devtools(
    (set) => ({
      tab: "active",
      searchQuery: "",
      page: 1,
      selectedIds: [],

      setTab: (tab) =>
        set({ tab, page: 1, selectedIds: [] }, false, "student/set-tab"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery, page: 1 }, false, "student/set-search-query"),

      setPage: (page) =>
        set({ page }, false, "student/set-page"),

      toggleSelect: (id:string) =>
        set(
          (state) => ({
            selectedIds: state.selectedIds.includes(id)
              ? state.selectedIds.filter((x) => x !== id)
              : [...state.selectedIds, id],
          }),
          false,
          "student/toggle-select",
        ),

      toggleSelectAll: (ids:string[]) =>
        set(
          (state) => {
            const allSelected = ids.every((id) => state.selectedIds.includes(id));
            return { selectedIds: allSelected ? [] : [...ids] };
          },
          false,
          "student/toggle-select-all",
        ),

      clearSelection: () =>
        set({ selectedIds: [] }, false, "student/clear-selection"),
    }),
    { name: "StudentStore" },
  ),
);
