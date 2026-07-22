"use client";

import { useCallback, useState } from "react";

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

export function writeTabs(tabs: Tab[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
  } catch {
    // sessionStorage 접근 불가(SSR 등) 시 조용히 무시
  }
}

// 탭 목록을 sessionStorage에 저장한다. 로그아웃 시 clearStoredTabs()로 명시적으로
// 비워서, 다른 역할 계정으로 재로그인했을 때 이전 계정의 탭이 남아있지 않게 한다.
//
// 초기값은 useEffect가 아니라 lazy initializer로 렌더링 시점에 동기 복원한다.
// effect로 복원하면 첫 렌더는 무조건 빈 배열이고, 그 사이(자식인 Topbar의
// 자동 탭 등록 effect가 부모보다 먼저 실행되는 순간)에 다른 탭이 먼저 추가되면서
// 빈 배열을 기준으로 저장이 일어나 레이아웃 전환마다 이전 탭이 지워지는 문제가 있었다.
export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>(() => readTabs());

  const addTab = useCallback((tab: Tab) => {
    setTabs((prev) => {
      if (prev.find((t) => t.href === tab.href)) return prev;
      const next = [...prev, tab];
      writeTabs(next);
      return next;
    });
  }, []);

  const removeTab = useCallback((href: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.href !== href);
      writeTabs(next);
      return next;
    });
  }, []);

  return { tabs, addTab, removeTab };
}

// 로그아웃 시 auth 쪽에서 호출 (React 트리 바깥에서도 쓸 수 있도록 훅과 분리).
export function clearStoredTabs() {
  sessionStorage.removeItem(STORAGE_KEY);
}