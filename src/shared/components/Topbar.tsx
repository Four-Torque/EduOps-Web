"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { writeTabs, type Tab } from "@/shared/hooks/useTabs";
import { findNavByPath, type NavItem } from "@/shared/constants/navigation";

// 지금 경로와 매칭되는 탭을 정확히 하나만 고른다. 먼저 href가 정확히 일치하는
// 탭을 찾고, 없으면(탭엔 없는 하위/상세 페이지를 보는 중이면) prefix가 가장
// 구체적인(긴) 탭을 고른다. 예: "/finance"와 "/finance/yearly"가 둘 다 탭으로
// 열려있을 때 "/finance/yearly"를 보고 있으면, 단순 prefix 매칭으로는 두 탭이
// 동시에 활성으로 보였는데(둘 다 "/finance/yearly".startsWith(href) 성립),
// 이 함수로 고르면 정확히 일치하는 "/finance/yearly" 탭 하나만 활성이 된다.
function findActiveTab(tabs: Tab[], pathname: string): Tab | undefined {
  const exact = tabs.find((t) => t.href === pathname);
  if (exact) return exact;

  return tabs
    .filter((t) => pathname.startsWith(t.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
}

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

  // tabs 최신값은 ref로만 읽는다. 이 effect의 재실행 조건(deps)에 tabs를
  // 넣으면, handleClose가 지금 보고 있는 탭을 지웠을 때(아직 pathname은
  // 안 바뀌고 tabs만 먼저 바뀌는 순간) "이 경로엔 탭이 없네"로 오인해서
  // 방금 닫은 탭을 그 자리에서 바로 되살려버린다. pathname이 실제로
  // 바뀔 때만(=진짜 이동했을 때만) 검사해야 이 문제가 없다.
  const tabsRef = useRef(tabs);
  tabsRef.current = tabs;

  // 현재 경로에 해당하는 탭이 없으면 자동으로 만들어 topbar에 표시한다.
  // 사이드바 클릭 없이 들어온 모든 경우(로그인 직후 리다이렉트, 새로고침, URL 직접
  // 입력, 대시보드 바로가기 등)를 다 커버하기 위해 홈 경로뿐 아니라 모든 경로에 적용한다.
  useEffect(() => {
    const isHome = pathname === homePath || pathname.startsWith(homePath + "/");

    // 열려있는 탭이 하나도 없는 상태로 페이지가 바뀌면, 홈이 아닌 페이지로
    // 이동했더라도 역할별 홈 탭을 기본으로 먼저 깔아준다(돌아갈 곳이 항상 남도록).
    if (tabsRef.current.length === 0 && !isHome) {
      addTab({ label: homeLabel, href: homePath });
    }

    const hasTab = tabsRef.current.some(
      (t) => pathname === t.href || pathname.startsWith(t.href + "/"),
    );
    if (hasTab) return;

    if (isHome) {
      addTab({ label: homeLabel, href: homePath });
      return;
    }

    const matched = findNavByPath(navItems, pathname);
    if (matched) {
      addTab({ label: matched.label, href: matched.href });
    }
  }, [pathname, navItems, homePath, homeLabel, addTab]);

  function handleClose(href: string) {
    const remaining = tabs.filter((t) => t.href !== href);

    // sessionStorage에는 이동(router.push)보다 먼저, 동기적으로 써둔다.
    // 닫은 탭이 다른 role 레이아웃 소속 페이지로 이동시키는 경우, removeTab의
    // 리액트 state 업데이트가 채 처리되기 전에 레이아웃이 통째로 바뀌면서 그
    // 업데이트가 유실되고, 새로 마운트된 쪽이 "닫기 전" 값을 읽어버리는 문제가 있었다.
    writeTabs(remaining);
    removeTab(href);

    // 마지막 탭까지 닫으면 역할별 홈으로 돌아간다
    if (remaining.length === 0) {
      const alreadyHome = pathname === homePath || pathname.startsWith(homePath + "/");
      if (alreadyHome) {
        // 이미 홈 페이지에서 그 탭을 닫은 경우: router.push(homePath)를 해도
        // pathname이 그대로라 자동 등록 effect가 재실행되지 않는다(진짜 이동이
        // 아니므로). 그래서 홈 탭을 여기서 직접 다시 추가해줘야 한다.
        addTab({ label: homeLabel, href: homePath });
      } else {
        router.push(homePath);
      }
      return;
    }

    // 지금 보고 있던 탭을 닫은 경우에만 이동. 바로 왼쪽 탭, 없으면 첫 탭으로
    if (findActiveTab(tabs, pathname)?.href === href) {
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
          {(() => {
            const activeTab = findActiveTab(tabs, pathname);
            return tabs.map((tab) => {
              const isActive = activeTab?.href === tab.href;
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
            });
          })()}
        </div>
      )}
    </div>
  );
}
