"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import type { NavItem } from "@/constants/navigation";

interface SidebarProps {
  navItems: NavItem[];
}

export function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const addTab = useUIStore((s) => s.addTab);
  const user = useAuthStore((s) => s.user);
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  // 페이지 진입 시 현재 경로가 속한 부모를 자동으로 펼침
  useEffect(() => {
    const matched = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    if (matched) setOpenLabel(matched.label);
  }, [pathname, navItems]);

  function handleParentClick(label: string) {
    setOpenLabel((prev) => (prev === label ? null : label));
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-white border-r border-slate-100 shrink-0",
        "transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-[260px]" : "w-[60px]",
      )}
    >
      {/* 브랜드 로고 */}
      <div className="px-[35px] pt-[30px] pb-5 shrink-0">
        <div className="text-[20px] font-extrabold text-[#0069A8] tracking-tight leading-none">
          {sidebarOpen ? "EduOps" : "E"}
        </div>
      </div>

      {/* 유저 정보 */}
      {sidebarOpen && (
        <div className="px-[35px] flex items-center gap-2 mb-1 shrink-0">
          <div className="w-7 h-7 rounded-md bg-[#0069A8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {user?.name?.[0] ?? "A"}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-800">
              {user?.role === "DIRECTOR"
                ? "원장님"
                : user?.role === "MANAGER"
                  ? "관리자"
                  : "강사"}
            </p>
            <p className="text-[9.5px] text-slate-400">
              {user?.name ?? "이름"}
            </p>
          </div>
        </div>
      )}

      {/* 네비게이션 */}
      <nav className="flex-1 px-[35px] py-5 overflow-hidden">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            // 자식이 있는 부모 메뉴
            if (item.children) {
              const isOpen = openLabel === item.label;
              // 자식 중 하나라도 현재 경로면 부모를 활성 표시
              const hasActiveChild = item.children.some((child) =>
                pathname.startsWith(child.href)
              );

              return (
                <li key={item.label}>
                  {/* 부모 버튼 — 클릭 시 열림/닫힘 토글 */}
                  <button
                    onClick={() => handleParentClick(item.label)}
                    className={cn(
                      "flex items-center justify-between px-[6.5px] py-[6.5px] rounded-md text-[12px] transition-colors w-full",
                      hasActiveChild
                        ? "text-slate-800 font-medium"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    )}
                  >
                    <span>{item.label}</span>
                  </button>

                  {/* 자식 메뉴 — 열렸을 때만 렌더링 */}
                  {isOpen && sidebarOpen && (
                    <ul className="mt-0.5 ml-2 space-y-0.5">
                      {item.children.map((child) => {
                        const isActive = pathname.startsWith(child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => addTab({ label: child.label, href: child.href })}
                              className={cn(
                                "flex items-center gap-2 px-[6.5px] py-[6.5px] rounded-md text-[12px] transition-colors",
                                isActive
                                  ? "text-[#E8732A] font-medium"
                                  : "text-slate-400 hover:text-slate-700",
                              )}
                            >
                              <span className={cn(
                                "w-1 h-1 rounded-full shrink-0",
                                isActive ? "bg-[#E8732A]" : "bg-slate-300",
                              )} />
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            // 자식 없는 단순 링크
            const isActive =
              !!item.href &&
              (pathname === item.href || pathname.startsWith(item.href + "/"));

            return (
              <li key={item.href}>
                <Link
                  href={item.href ?? "#"}
                  className={cn(
                    "flex items-center gap-1.5 px-[6.5px] py-[6.5px] rounded-md text-[12px] transition-colors",
                    sidebarOpen ? "w-full" : "w-9 justify-center",
                    isActive
                      ? "bg-[#0069A8] text-white font-medium"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                  )}
                >
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 하단 접기 버튼 */}
      <div className="px-[35px] pt-2 pb-[30px] border-t border-slate-100 shrink-0">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
          className={cn(
            "flex items-center gap-1.5 px-[6.5px] py-[6.5px] rounded-md text-[12px] text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors w-full",
            !sidebarOpen && "justify-center",
          )}
        >
          <ChevronLeft
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300 shrink-0",
              !sidebarOpen && "rotate-180",
            )}
          />
          {sidebarOpen && <span>접기</span>}
        </button>
      </div>
    </aside>
  );
}