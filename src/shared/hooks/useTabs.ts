"use client";

import { useCallback, useEffect, useState } from "react";

export interface Tab {
  label: string;
  href: string;
}

const STORAGE_KEY = "eduops-tabs";

function readTabs(): Tab[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// 탭 목록을 sessionStorage에 저장한다. 로그아웃 시 clearStoredTabs()로 명시적으로
// 비워서, 다른 역할 계정으로 재로그인했을 때 이전 계정의 탭이 남아있지 않게 한다.
export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    setTabs(readTabs());
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  const addTab = useCallback((tab: Tab) => {
    setTabs((prev) => (prev.find((t) => t.href === tab.href) ? prev : [...prev, tab]));
  }, []);

  const removeTab = useCallback((href: string) => {
    setTabs((prev) => prev.filter((t) => t.href !== href));
  }, []);

  return { tabs, addTab, removeTab };
}

// 로그아웃 시 auth 쪽에서 호출 (React 트리 바깥에서도 쓸 수 있도록 훅과 분리).
export function clearStoredTabs() {
  sessionStorage.removeItem(STORAGE_KEY);
}