import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  StudentRegisterFormState,
  StudentRegisterFormErrors,
} from "@/types/manager/student-register.types";

interface StudentRegisterUIState {
  isModalOpen: boolean;
  form: StudentRegisterFormState;
  errors: StudentRegisterFormErrors;
  mode: "register" | "edit";      
  editStudentId: string | null;   

  openModal: (initialData?: Partial<StudentRegisterFormState>, studentId?: string) => void; // ← 변경
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
            mode: initialData ? "edit" : "register",       // ← 추가
            editStudentId: studentId ?? null,              // ← 추가
            form: { ...INITIAL_FORM, ...initialData },     
        },
        false,
         "student-register/open-modal",
      ),

      closeModal: () =>
        set({ isModalOpen: false, form: INITIAL_FORM, errors: {},mode: "register", editStudentId: null  }, false, "student-register/close-modal"),

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
        set({ form: INITIAL_FORM, errors: {} }, false, "student-register/reset-form"),
    }),
    { name: "StudentRegisterStore" },
  ),
);
