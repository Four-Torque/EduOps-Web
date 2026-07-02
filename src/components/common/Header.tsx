"use client";

import { Bell, Settings, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../../hooks/auth/useAuth";

export default function Header() {
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  function handleLogout() {
    // 로그아웃 성공(쿠키 삭제) 후 세션 캐시를 제거해야
    // 다음 로그인 때 이전 사용자 정보가 재사용되지 않는다
    logout(undefined, {
      onSuccess: () => queryClient.removeQueries({ queryKey: ["session"] }),
    });
  }

  return (
    <header className="h-14 bg-white flex items-center justify-end px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="알림"
        >
          <Bell size={20} />
        </button>
        <button
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="사용자 설정"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-colors"
          aria-label="로그아웃"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}