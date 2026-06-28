"use client";

import { Bell, Settings, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="h-[52px] border-b border-slate-100 bg-white flex flex-col justify-center px-6 shrink-0">
      {/* 상단: 알림/설정 아이콘 */}
      <div className="flex items-center justify-end gap-4 mb-0.5">
        <button
          aria-label="알림"
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
        <button
          aria-label="설정"
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* 유저 드롭다운 */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              aria-label="계정 메뉴"
              className="w-6 h-6 rounded-md bg-[#0069A8] flex items-center justify-center text-white text-[10px] font-bold hover:bg-[#005a91] transition-colors"
            >
              {user?.name?.[0] ?? "A"}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="min-w-[160px] bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-50"
            >
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-[12px] font-semibold text-slate-800">
                  {user?.name}
                </p>
                <p className="text-[11px] text-slate-400">{user?.email}</p>
              </div>
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] text-slate-600 hover:bg-slate-50 cursor-pointer outline-none">
                <User className="w-3.5 h-3.5" />
                프로필
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
              <DropdownMenu.Item
                onSelect={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] text-red-500 hover:bg-red-50 cursor-pointer outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                로그아웃
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* 하단: 페이지 제목 */}
      <p className="text-[12.5px] text-slate-500 font-normal">{title}</p>
    </header>
  );
}
