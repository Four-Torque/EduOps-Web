"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Tab } from "@/shared/hooks/useTabs";
import { findNavByPath, type NavItem } from "@/shared/constants/navigation";

interface TopbarProps {
  navItems: NavItem[];
  homePath: string;
  homeLabel: string;
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (href: string) => void;
}

export default function Topbar({
  navItems,
  homePath,
  homeLabel,
  tabs,
  addTab,
  removeTab,
}: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로에 해당하는 탭이 없으면 자동으로 만들어 topbar에 표시한다.
  // 사이드바 클릭 없이 들어온 모든 경우(로그인 직후 리다이렉트, 새로고침, URL 직접
  // 입력, 대시보드 바로가기 등)를 다 커버하기 위해 홈 경로뿐 아니라 모든 경로에 적용한다.
  useEffect(() => {
    const hasTab = tabs.some(
      (t) => pathname === t.href || pathname.startsWith(t.href + "/"),
    );
    if (hasTab) return;

    const isHome = pathname === homePath || pathname.startsWith(homePath + "/");
    if (isHome) {
      addTab({ label: homeLabel, href: homePath });
      return;
    }

    const matched = findNavByPath(navItems, pathname);
    if (matched) {
      addTab({ label: matched.label, href: matched.href });
    }
  }, [pathname, navItems, homePath, homeLabel, tabs, addTab]);

  function handleClose(href: string) {
    removeTab(href);

    const remaining = tabs.filter((t) => t.href !== href);

    // 마지막 탭까지 닫으면 역할별 홈으로 돌아간다
    if (remaining.length === 0) {
      router.push(homePath);
      return;
    }

    // 지금 보고 있던 탭을 닫은 경우에만 이동. 바로 왼쪽 탭, 없으면 첫 탭으로
    if (pathname === href || pathname.startsWith(href + "/")) {
      const idx = tabs.findIndex((t) => t.href === href);
      const next = remaining[idx - 1] ?? remaining[0];
      router.push(next.href);
    }
  }

  return (
    <div
      className="bg-white px-6 flex items-end shrink-0 relative"
      style={{ minHeight: 40 }}
    >
      <div className="absolute bottom-0 left-6 right-6 h-px bg-[#eee]" />

      {tabs.length === 0 ? (
        <div className="h-10" />
      ) : (
        <div className="flex items-end gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(tab.href + "/");
            return (
              <div
                key={tab.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-9 text-[12px] border-b-2 cursor-pointer whitespace-nowrap transition-colors",
                  isActive
                    ? "border-[#0069A8] text-[#0069A8] font-medium"
                    : "border-transparent text-slate-400 hover:text-slate-600",
                )}
              >
                <span onClick={() => router.push(tab.href)}>{tab.label}</span>
                <button
                  onClick={() => handleClose(tab.href)}
                  className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={9} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
