import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { StudentTabFilter, StudentRegisterFormState } from "./type";

// ─── Student UI Store (Uniform with UserStore) ──────────────────────────────────

interface StudentUIState {
  tab: StudentTabFilter;
  searchQuery: string;
  isCreateOpen: boolean;
  isEditOpen: boolean;
  editId: string | null;

  setTab: (tab: StudentTabFilter) => void;
  setSearchQuery: (query: string) => void;
  onCreateOpen: () => void;
  onCreateClose: () => void;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
}

export const useStudentStore = create<StudentUIState>()(
  devtools(
    (set) => ({
      tab: "전체",
      searchQuery: "",
      isCreateOpen: false,
      isEditOpen: false,
      editId: null,

      setTab: (tab) => set({ tab }, false, "student/set-tab"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "student/set-search-query"),

      onCreateOpen: () =>
        set({ isCreateOpen: true }, false, "student/onCreateOpen"),

      onCreateClose: () =>
        set({ isCreateOpen: false }, false, "student/onCreateClose"),

      onEditOpen: (id) =>
        set({ isEditOpen: true, editId: id }, false, "student/onEditOpen"),

      onEditClose: () =>
        set({ isEditOpen: false, editId: null }, false, "student/onEditClose"),
    }),
    { name: "StudentStore" },
  ),
);

export const INITIAL_STUDENT_FORM: StudentRegisterFormState = {
  name: "",
  birthDate: "",
  phone: "",
  address: "",
  addressDetail: "",
  status: "active",
};
