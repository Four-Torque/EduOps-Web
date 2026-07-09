import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AcademyInfoUIState {
  editForm: AcademyBasicInfo | null;

  startEdit: (basicInfo: AcademyBasicInfo) => void;
  setEditField: (field: keyof AcademyBasicInfo, value: string) => void;
  cancelEdit: () => void;
}

export const useAcademyInfoStore = create<AcademyInfoUIState>()(
  devtools(
    (set) => ({
      editForm: null,

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
    }),
    { name: "AcademyInfoStore" },
  ),
);
