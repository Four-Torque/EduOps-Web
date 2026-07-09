import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Student, StudentTabFilter } from "@/features/student/type";
import {
  StudentRegisterFormState,
  StudentRegisterFormErrors,
} from "@/types/manager/student-register.types";

interface StudentUIState {
  tab: StudentTabFilter;
  searchQuery: string;
  page: number;
  selectedIds: string[];

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

      setPage: (page) => set({ page }, false, "student/set-page"),

      toggleSelect: (id: string) =>
        set(
          (state) => ({
            selectedIds: state.selectedIds.includes(id)
              ? state.selectedIds.filter((x) => x !== id)
              : [...state.selectedIds, id],
          }),
          false,
          "student/toggle-select",
        ),

      toggleSelectAll: (ids: string[]) =>
        set(
          (state) => {
            const allSelected = ids.every((id) =>
              state.selectedIds.includes(id),
            );
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

interface StudentEditStore {
  isOpen: boolean;
  student: Student | null;
  openModal: (student: Student) => void;
  closeModal: () => void;
}

export const useStudentEditStore = create<StudentEditStore>((set) => ({
  isOpen: false,
  student: null,
  openModal: (student) => set({ isOpen: true, student }),
  closeModal: () => set({ isOpen: false, student: null }),
}));

interface StudentRegisterUIState {
  isModalOpen: boolean;
  form: StudentRegisterFormState;
  errors: StudentRegisterFormErrors;
  mode: "register" | "edit";
  editStudentId: string | null;

  openModal: (
    initialData?: Partial<StudentRegisterFormState>,
    studentId?: string,
  ) => void; // ← 변경
  closeModal: () => void;
  setField: (field: keyof StudentRegisterFormState, value: string) => void;
  setErrors: (errors: StudentRegisterFormErrors) => void;
  resetForm: () => void;
}

const INITIAL_FORM: StudentRegisterFormState = {
  name: "",
  birthDate: "",
  phone: "",
  grade: "",
  classId: "",
  status: "active",
};

export const useStudentRegisterStore = create<StudentRegisterUIState>()(
  devtools(
    (set) => ({
      isModalOpen: false,
      form: INITIAL_FORM,
      errors: {},

      openModal: (initialData?, studentId?) =>
        set(
          {
            isModalOpen: true,
            mode: initialData ? "edit" : "register", // ← 추가
            editStudentId: studentId ?? null, // ← 추가
            form: { ...INITIAL_FORM, ...initialData },
          },
          false,
          "student-register/open-modal",
        ),

      closeModal: () =>
        set(
          {
            isModalOpen: false,
            form: INITIAL_FORM,
            errors: {},
            mode: "register",
            editStudentId: null,
          },
          false,
          "student-register/close-modal",
        ),

      setField: (field, value) =>
        set(
          (state) => ({
            form: { ...state.form, [field]: value },
            errors: { ...state.errors, [field]: undefined },
          }),
          false,
          "student-register/set-field",
        ),

      setErrors: (errors) =>
        set({ errors }, false, "student-register/set-errors"),

      resetForm: () =>
        set(
          { form: INITIAL_FORM, errors: {} },
          false,
          "student-register/reset-form",
        ),
    }),
    { name: "StudentRegisterStore" },
  ),
);
