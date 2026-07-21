"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/hooks/useSession";
import { useUnreadMessages } from "@/features/message/query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useMessageStore } from "@/features/message/store";
import { Message } from "@/features/message/type";

const RECEIVED_PATH: Record<string, string> = {
  DIRECTOR: "/director-message/received",
  MANAGER: "/manager-message/received",
  TEACHER: "/teacher-message/received",
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: user } = useSession();

  const { data: unreadMessages = [], isLoading } = useUnreadMessages(user?.id);

  const unreadCount = unreadMessages.length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleMessageClick(msg: Message) {
    setIsOpen(false);
    useMessageStore.getState().openViewModal(msg, "RECEIVED");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        aria-label="알림"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <>
            <span className="absolute top-1 right-1 w-4 h-4 bg-sky-500 rounded-full animate-ping opacity-75" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 w-[320px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-[13px] font-semibold text-slate-800">
              알림
              {unreadCount > 0 && (
                <span className="ml-1.5 text-[11px] text-white bg-sky-500 px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </p>
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {isLoading ? (
              <p className="text-[12px] text-slate-400 text-center py-6">
                불러오는 중...
              </p>
            ) : unreadMessages.length === 0 ? (
              <p className="text-[12px] text-slate-400 text-center py-6">
                새 알림이 없습니다.
              </p>
            ) : (
              unreadMessages.map((msg: Message) => (
                <button
                  key={msg.id}
                  onClick={() => handleMessageClick(msg)}
                  className="flex items-start gap-3 w-full px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {msg.sender?.name?.slice(0, 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold text-slate-800 truncate">
                        {msg.sender?.name}
                      </p>
                      <p className="text-[10px] text-slate-400 shrink-0">
                        {msg.createdAt
                          ? formatDistanceToNow(new Date(msg.createdAt), {
                              addSuffix: true,
                              locale: ko,
                            })
                          : ""}
                      </p>
                    </div>
                    <p className="text-[11.5px] font-medium text-slate-700 truncate mt-0.5">
                      {msg.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {msg.content}
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                </button>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 p-2 text-center bg-slate-50/50">
            <button
              onClick={() => {
                setIsOpen(false);
                const role = user?.role ?? "MANAGER";
                router.push(RECEIVED_PATH[role] ?? "/");
              }}
              className="text-[11.5px] font-semibold text-sky-600 hover:text-sky-700 w-full py-1.5 transition-colors"
            >
              전체 쪽지 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
