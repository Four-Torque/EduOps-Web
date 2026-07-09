import { create } from "zustand";

interface AssetUIState {
  onCreateOpen: () => void;
  onCreateClose: () => void;
  isCreateOpen: boolean;
  status: string;
  id: string;
  onRejectOpen: (id: string, status: string) => void;
  onRejectClose: () => void;
  isRejectOpen: boolean;
}

export const useAssetApplicationStore = create<AssetUIState>((set) => ({
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
  isRejectOpen: false,
  onRejectOpen: (id: string, status: string) =>
    set({ isRejectOpen: true, id, status }),
  onRejectClose: () => set({ isRejectOpen: false, id: "", status: "all" }),
  status: "all",
  id: "",
}));

interface AssetState {
  categoryId: string;
  vendorId: string;
  q: string;
  setCategoryId: (id: string) => void;
  setVendorId: (id: string) => void;
  setQ: (q: string) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  categoryId: "",
  vendorId: "",
  q: "",
  setCategoryId: (id: string) => set({ categoryId: id }),
  setVendorId: (id: string) => set({ vendorId: id }),
  setQ: (q: string) => set({ q }),
}));
