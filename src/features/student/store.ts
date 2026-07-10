import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { StudentTabFilter, StudentStatus, StudentRegisterFormState } from "./type";

// ─── Student Store ────────────────────────────────────────────────────────────

interface StudentUIState {
  tab: StudentTabFilter;
  searchQuery: string;
  editingStudentId: string | null;

  setTab: (tab: StudentTabFilter) => void;
  setSearchQuery: (query: string) => void;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
}

export const useStudentStore = create<StudentUIState>()(
  devtools(
    (set) => ({
      tab: "전체",
      searchQuery: "",
      editingStudentId: null,

      setTab: (tab) =>
        set({ tab }, false, "student/set-tab"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "student/set-search-query"),

      onEditOpen: (id) =>
        set({ editingStudentId: id }, false, "student/on-edit-open"),

      onEditClose: () =>
        set({ editingStudentId: null }, false, "student/on-edit-close"),
    }),
    { name: "StudentStore" },
  ),
);

// ─── Student Register Store ───────────────────────────────────────────────────

const INITIAL_FORM: StudentRegisterFormState = {
  name:          "",
  birthDate:     "",
  phone:         "",
  address:       "",
  addressDetail: "",
  status:        "active",
};

interface StudentRegisterUIState {
  isModalOpen: boolean;
  editingId:   string | null;
  form:        StudentRegisterFormState;
  errors:      Partial<Record<keyof StudentRegisterFormState, string>>;

  openModal:  (form?: Partial<StudentRegisterFormState>, id?: string) => void;
  closeModal: () => void;
  setField:   (field: keyof StudentRegisterFormState, value: string) => void;
  setErrors:  (errors: Partial<Record<keyof StudentRegisterFormState, string>>) => void;
}

export const useStudentRegisterStore = create<StudentRegisterUIState>()(
  devtools(
    (set) => ({
      isModalOpen: false,
      editingId:   null,
      form:        INITIAL_FORM,
      errors:      {},

      openModal: (form, id) =>
        set(
          {
            isModalOpen: true,
            form:        form ? { ...INITIAL_FORM, ...form } : INITIAL_FORM,
            editingId:   id ?? null,
            errors:      {},
          },
          false,
          "student-register/open",
        ),

      closeModal: () =>
        set(
          { isModalOpen: false, form: INITIAL_FORM, editingId: null, errors: {} },
          false,
          "student-register/close",
        ),

      setField: (field, value) =>
        set(
          (state) => ({
            form:   { ...state.form, [field]: value },
            errors: { ...state.errors, [field]: undefined },
          }),
          false,
          "student-register/set-field",
        ),

      setErrors: (errors) =>
        set({ errors }, false, "student-register/set-errors"),
    }),
    { name: "StudentRegisterStore" },
  ),
);