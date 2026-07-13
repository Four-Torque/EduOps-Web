"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/store";

interface TopbarProps {
  homePath: string;
  homeLabel: string;
}

export default function Topbar({ homePath, homeLabel }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = useUIStore((s) => s.tabs);
  const addTab = useUIStore((s) => s.addTab);
  const removeTab = useUIStore((s) => s.removeTab);

  // 탭을 모두 닫은 뒤 홈으로 이동했거나(로그인 직후 포함), 탭 없이 홈 경로에
  // 진입한 모든 경우에 홈 탭이 없으면 자동으로 만들어 topbar에 표시한다.
  useEffect(() => {
    const isHome = pathname === homePath || pathname.startsWith(homePath + "/");
    if (!isHome) return;
    const hasHomeTab = tabs.some((t) => t.href === homePath);
    if (!hasHomeTab) {
      addTab({ label: homeLabel, href: homePath });
    }
  }, [pathname, homePath, homeLabel, tabs, addTab]);

  function handleClose(href: string) {
    removeTab(href);

    const remaining = tabs.filter((t) => t.href !== href);

    // 마지막 탭까지 닫으면 역할별 홈으로 돌아간다
    if (remaining.length === 0) {
      router.push(homePath);
      return;
    }

    // 지금 보고 있던 탭을 닫은 경우에만 이동. 바로 왼쪽 탭, 없으면 첫 탭으로
    if (pathname === href || pathname.startsWith(href)) {
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
        <div className="flex items-end gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(tab.href);
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
