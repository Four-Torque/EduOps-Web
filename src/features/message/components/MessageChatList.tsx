"use client";

import { Search, SquarePen } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import type { ChatRoom } from "@/types/message/message.types";

interface MessageChatListProps {
  chatRooms?: ChatRoom[];
  activeChatRoomId: number | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectRoom: (id: number) => void;
  onNewMessage: () => void;
}

export function MessageChatList({
  chatRooms,
  activeChatRoomId,
  searchQuery,
  onSearchChange,
  onSelectRoom,
  onNewMessage,
}: MessageChatListProps) {
  const filteredRooms = (chatRooms ?? []).filter((room) =>
    room.contact.name.includes(searchQuery),
  );

  return (
    <div className="w-[300px] min-w-[300px] border-r border-slate-200 flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <h2 className="text-[13px] font-semibold text-slate-800">쪽지</h2>
        <button
          onClick={onNewMessage}
          className="flex items-center gap-1.5 text-[11.5px] font-medium text-white bg-[#0069A8] px-2.5 py-1.5 rounded-md hover:bg-[#005a8e] transition-colors"
        >
          <SquarePen className="w-3 h-3" />새 메시지
        </button>
      </div>

      {/* 검색 */}
      <div className="px-3 py-2 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="검색"
            className="pl-7 text-[12px] h-8"
          />
        </div>
      </div>

      {/* 대화 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <p className="text-[11.5px] text-slate-400 text-center py-8">
            대화가 없습니다.
          </p>
        ) : (
          filteredRooms.map((room: ChatRoom) => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={[
                "flex items-start gap-2.5 w-full px-3 py-3 border-b border-slate-100 text-left transition-colors",
                activeChatRoomId === room.id
                  ? "bg-slate-100"
                  : "hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[12px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {room.contact.avatarInitial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-slate-800 truncate">
                    {room.contact.name}
                  </p>
                  <p className="text-[10px] text-slate-400 shrink-0 ml-1">
                    {room.lastMessageAt}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {room.lastMessage}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
