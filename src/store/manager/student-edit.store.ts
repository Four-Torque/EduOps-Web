import { create } from "zustand";
import type { Student } from "@/types/manager/student.types";

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