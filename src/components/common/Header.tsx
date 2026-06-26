"use client";

import { Bell, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  function handleLogout() {
    clearUser();
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-end px-6 flex-shrink-0">
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