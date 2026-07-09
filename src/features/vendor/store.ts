import { create } from "zustand";

interface VendorStore {
  q: string;
  setQ: (q: string) => void;
  isCreateOpen: boolean;
  onCreateOpen: () => void;
  onCreateClose: () => void;
  id: string;
  isEditOpen: boolean;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
}

export const useVendorStore = create<VendorStore>((set) => ({
  q: "",
  setQ: (q: string) => set({ q }),
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
  id: "",
  isEditOpen: false,
  onEditOpen: (id: string) => set({ isEditOpen: true, id }),
  onEditClose: () => set({ isEditOpen: false, id: "" }),
}));
