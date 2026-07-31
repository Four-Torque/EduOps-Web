import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserTabFilter } from "./type";

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

interface TeacherStore {
  q: string;
  setQ: (q: string) => void;
  id: string;
  isViewOpen: boolean;
  onViewOpen: (id: string) => void;
  onViewClose: () => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  q: "",
  setQ: (q: string) => set({ q }),
  id: "",
  isViewOpen: false,
  onViewOpen: (id: string) => set({ isViewOpen: true, id }),
  onViewClose: () => set({ isViewOpen: false, id: "" }),
}));

interface UserStore {
  q: string;
  setQ: (q: string) => void;
  isCreateOpen: boolean;
  onCreateOpen: () => void;
  onCreateClose: () => void;
  isEditOpen: boolean;
  editId: string;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  q: "",
  setQ: (q: string) => set({ q }),
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
  isEditOpen: false,
  editId: "",
  onEditOpen: (id: string) => set({ isEditOpen: true, editId: id }),
  onEditClose: () => set({ isEditOpen: false, editId: "" }),
}));
