"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  TrendingUp,
  Users,
  Package,
  Mail,
  Building2,
  User,
  Clock,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import type { NavItem } from "@/constants/navigation";

interface SidebarProps {
  navItems: NavItem[];
}

const NAV_ICONS: Record<string, React.ElementType> = {
  "매출 관리": TrendingUp,
  "사용자 관리": Users,
  "자재/결제 관리": Package,
  "연락 관리": Mail,
  "학원 정보": Building2,
  "학생 상세": User,
  "직원 근태": Clock,
  "자재 물품 신청": ShoppingBag,
  "결제 관리": CreditCard,
  "문자/쪽지": MessageSquare,
  "시간표": Calendar,
  "학생 출결관리": ClipboardCheck,
  "수업 파일 관리": FolderOpen,
  "성적 관리": BookOpen,
};

export function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const addTab = useUIStore((s) => s.addTab);
  const user = useAuthStore((s) => s.user);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [textVisible, setTextVisible] = useState(sidebarOpen);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const matched = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    if (matched) setOpenLabel(matched.label);
  }, [pathname, navItems]);

  // 닫힐 때: 즉시 텍스트 숨김
  useEffect(() => {
    if (!sidebarOpen) setTextVisible(false);
  }, [sidebarOpen]);

  // width 애니메이션이 완전히 끝난 뒤 텍스트 표시
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    function handleTransitionEnd(e: TransitionEvent) {
      if (e.propertyName === "width" && sidebarOpen) setTextVisible(true);
    }
    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [sidebarOpen]);

  function handleParentClick(label: string) {
    setOpenLabel((prev) => (prev === label ? null : label));
  }

  return (
    <aside
      ref={asideRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "flex flex-col h-screen bg-white border-r border-slate-100 shrink-0",
        "transition-[width] duration-300 ease-in-out",
        sidebarOpen ? "w-[260px]" : "w-[60px]",
      )}
    >
      {/* 브랜드 로고 */}
      <div className={cn("pt-[30px] pb-5 shrink-0", sidebarOpen ? "px-[35px]" : "flex justify-center")}>
        {sidebarOpen ? (
          textVisible && (
            <div className="text-[20px] font-extrabold text-[#0069A8] tracking-tight leading-none">
              EduOps
            </div>
          )
        ) : (
          <span className="w-7 h-7 rounded-md bg-[#0069A8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {user?.role === "DIRECTOR" ? "원" : user?.role === "MANAGER" ? "관" : "강"}
          </span>
        )}
      </div>

      {/* 유저 정보 */}
      <div className={cn(
        "px-[35px] flex items-center gap-2 mb-1 shrink-0",
        sidebarOpen ? "h-auto" : "h-0 overflow-hidden",
      )}>
        {textVisible && (
          <div className="flex items-center gap-2 w-full">
            <div className="w-7 h-7 rounded-md bg-[#0069A8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {user?.role === "DIRECTOR" ? "원" : user?.role === "MANAGER" ? "관" : "강"}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                {user?.role === "DIRECTOR" ? "원장님" : user?.role === "MANAGER" ? "관리자" : "강사"}
              </p>
              <p className="text-[9.5px] text-slate-400">{user?.name ?? "이름"}</p>
            </div>
          </div>
        )}
      </div>

      {/* 네비게이션 */}
      <nav className={cn("flex-1 py-5 overflow-hidden", sidebarOpen ? "px-[35px]" : "px-0")}>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = NAV_ICONS[item.label];

            // 접힌 상태: 아이콘만
            if (!sidebarOpen) {
              const target = item.children ? item.children[0] : { label: item.label, href: item.href };
              return (
                <li key={item.label} className="flex justify-center py-2">
                  {Icon && target.href && (
                    <Link
                      href={target.href}
                      onClick={() => addTab({ label: target.label, href: target.href! })}
                    >
                      <Icon size={15} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer" />
                    </Link>
                  )}
                </li>
              );
            }

            // 자식이 있는 부모 메뉴
            if (item.children) {
              const isOpen = openLabel === item.label;
              const hasActiveChild = item.children.some((child) =>
                pathname.startsWith(child.href)
              );

              return (
                <li key={item.label}>
                  {textVisible && (
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
                  )}

                  {isOpen && textVisible && (
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
                {textVisible && (
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => item.href && addTab({ label: item.label, href: item.href })}
                    className={cn(
                      "flex items-center gap-1.5 px-[6.5px] py-[6.5px] rounded-md text-[12px] transition-colors w-full",
                      isActive
                        ? "bg-[#0069A8] text-white font-medium"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 하단 접기 버튼 */}
      <div className="px-[10px] border-t border-slate-100 shrink-0">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
          className={cn(
            "flex items-center gap-1.5 px-[6.5px] py-[6.5px] rounded-md text-[12px] text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors w-full",
            sidebarOpen ? "justify-end" : "justify-center",
          )}
        >
          <ChevronLeft
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300 shrink-0",
              !sidebarOpen && "rotate-180",
            )}
          />
          {textVisible && <span>접기</span>}
        </button>
      </div>
    </aside>
  );
}