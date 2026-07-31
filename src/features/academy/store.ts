import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AcademyBasicInfo } from "./type";

interface AcademyInfoUIState {
  editForm: AcademyBasicInfo | null;
  editingBranchId: string | null;

  startEdit: (basicInfo: AcademyBasicInfo) => void;
  setEditField: (field: keyof AcademyBasicInfo, value: string) => void;
  cancelEdit: () => void;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
}

export const useAcademyInfoStore = create<AcademyInfoUIState>()(
  devtools(
    (set) => ({
      editForm: null,
      editingBranchId: null,

      startEdit: (basicInfo) =>
        set({ editForm: { ...basicInfo } }, false, "academy-info/start-edit"),

      setEditField: (field, value) =>
        set(
          (state) => ({
            editForm: state.editForm
              ? { ...state.editForm, [field]: value }
              : state.editForm,
          }),
          false,
          "academy-info/set-edit-field",
        ),

      cancelEdit: () =>
        set({ editForm: null }, false, "academy-info/cancel-edit"),

      onEditOpen: (id) =>
        set({ editingBranchId: id }, false, "academy-info/on-edit-open"),

      onEditClose: () =>
        set({ editingBranchId: null }, false, "academy-info/on-edit-close"),
    }),
    { name: "AcademyInfoStore" },
  ),
);