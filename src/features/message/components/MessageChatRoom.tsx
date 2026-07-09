"use client";

import { useRef, useEffect, useState } from "react";
import { Send, Paperclip, MoreVertical, Trash2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import type { ChatRoom, ChatMessage } from "@/types/message/message.types";

const ROLE_LABEL: Record<string, string> = {
  director: "원장",
  manager: "관리자",
  teacher: "강사",
};

interface MessageChatRoomProps {
  activeRoom: ChatRoom | null;
  inputText: string;
  onInputChange: (text: string) => void;
  onSend: () => void;
  onDelete: () => void;
}

export function MessageChatRoom({
  activeRoom,
  inputText,
  onInputChange,
  onSend,
  onDelete,
}: MessageChatRoomProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 새 메시지 시 스크롤 하단
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom?.messages.length]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsMenuOpen(false);
  };

  if (!activeRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[12.5px] text-slate-400">대화를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[12px] font-semibold flex items-center justify-center">
            {activeRoom.contact.avatarInitial}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {activeRoom.contact.name}
            </p>
            <p className="text-[11px] text-slate-400">
              {ROLE_LABEL[activeRoom.contact.role]}
            </p>
          </div>
        </div>

        {/* ⋮ 메뉴 */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-7 bg-white border border-slate-200 rounded shadow-lg z-10 min-w-[120px]">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                대화 삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-slate-100" />
          <p className="text-[10.5px] text-slate-400">오늘</p>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {activeRoom.messages.map((msg: ChatMessage) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            avatarInitial={activeRoom.contact.avatarInitial}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div className="px-4 py-3 border-t border-slate-200 shrink-0">
        <div className="flex items-end gap-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-white">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메세지 입력..."
            rows={1}
            className="flex-1 text-[12.5px] text-slate-700 placeholder:text-slate-400 outline-none resize-none leading-relaxed"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={onSend}
              disabled={!inputText.trim()}
              className="w-7 h-7 rounded-full bg-[#0069A8] text-white flex items-center justify-center hover:bg-[#005a8e] transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 px-1">
          Enter로 전송 · Shift+Enter 줄바꿈
        </p>
      </div>
    </div>
  );
}
