"use client";

import { Settings, LogOut }    from "lucide-react";
import { useQueryClient }      from "@tanstack/react-query";
import { useLogout }           from "@/features/auth/query";
import { NotificationBell }    from "@/shared/components/NotificationBell";
import { useMessageStore }     from "@/features/message/store";

export default function Header() {
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["session"] });
        useMessageStore.getState().reset();
      },
    });
  }

  return (
    <header className="h-14 bg-white flex items-center justify-end px-6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <NotificationBell />
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