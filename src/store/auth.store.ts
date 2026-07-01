"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/common.types";

interface AuthStore {
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      setAuth: (user) => set({ user }),

      clearAuth: () => set({ user: null }),

      isAuthenticated: () => !!get().user,
    }),
    {
      name: "eduops-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
