"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/common.types";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setAuth: (user, accessToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
        }
        set({ user, accessToken });
      },

      clearAuth: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
        set({ user: null, accessToken: null });
      },

      isAuthenticated: () => !!get().accessToken && !!get().user,
    }),
    {
      name: "eduops-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
