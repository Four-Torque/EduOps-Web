import { create } from "zustand";

interface SubjectState {
  q: string;
  setQ: (q: string) => void;
  isCreateOpen: boolean;
  onCreateOpen: () => void;
  onCreateClose: () => void;
  id: string;
  isEditOpen: boolean;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;

  onViewOpen: (id: string) => void;
  isViewOpen: boolean;
  onViewClose: () => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  q: "",
  setQ: (q: string) => set({ q }),
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
  id: "",
  isEditOpen: false,
  onEditOpen: (id: string) => set({ isEditOpen: true, id }),
  onEditClose: () => set({ isEditOpen: false, id: "" }),
  isViewOpen: false,
  onViewOpen: (id: string) => set({ isViewOpen: true, id }),
  onViewClose: () => set({ isViewOpen: false, id: "" }),
}));
