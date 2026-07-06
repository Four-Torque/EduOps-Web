import { create } from "zustand";

interface AssetUIState {
  onCreateOpen: () => void;
  onCreateClose: () => void;
  isCreateOpen: boolean;
}

export const useAssetApplicationStore = create<AssetUIState>((set) => ({
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
}));
