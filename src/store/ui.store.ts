"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  label: string;
  href: string;
}

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (href: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      tabs: [],
      // 이미 있는 탭이면 추가 안 함
      addTab: (tab) =>
        set((s) => ({
          tabs: s.tabs.find((t) => t.href === tab.href)
            ? s.tabs
            : [...s.tabs, tab],
        })),
      removeTab: (href) =>
        set((s) => ({ tabs: s.tabs.filter((t) => t.href !== href) })),
    }),
    {
      name: "eduops-ui",
      // sidebarOpen만 저장, 탭은 새로고침 시 초기화
      partialize: (s) => ({ sidebarOpen: s.sidebarOpen }),
    }
  )
);