"use client";

import { MessageChatList }     from "./MessageChatList";
import { MessageChatRoom }     from "./MessageChatRoom";
import { MessageContactModal } from "./MessageContactModal";
import type { ChatRoom, MessageContact } from "@/features/message/type";

interface ContactGroup {
  label: string;
  contacts: MessageContact[];
}

interface MessageContainerProps {
  chatRooms?: ChatRoom[];
  activeChatRoomId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectRoom: (id: string) => void;
  inputText: string;
  onInputChange: (text: string) => void;
  onSend: () => void;
  onDeleteRoom: () => void;
  isContactModalOpen: boolean;
  contactGroups: ContactGroup[];
  onOpenContactModal: () => void;
  onCloseContactModal: () => void;
  onSelectContact: (contact: MessageContact) => void;
}

export function MessageContainer({
  chatRooms,
  activeChatRoomId,
  searchQuery,
  onSearchChange,
  onSelectRoom,
  inputText,
  onInputChange,
  onSend,
  onDeleteRoom,
  isContactModalOpen,
  contactGroups,
  onOpenContactModal,
  onCloseContactModal,
  onSelectContact,
}: MessageContainerProps) {
  const activeRoom = (chatRooms ?? []).find((r) => r.id === activeChatRoomId) ?? null;

  return (
    <div className="flex h-full border border-slate-200 rounded overflow-hidden bg-white">
      <MessageChatList
        chatRooms={chatRooms}
        activeChatRoomId={activeChatRoomId}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSelectRoom={onSelectRoom}
        onNewMessage={onOpenContactModal}
      />

      <MessageChatRoom
        activeRoom={activeRoom}
        inputText={inputText}
        onInputChange={onInputChange}
        onSend={onSend}
        onDelete={onDeleteRoom}
      />

      {isContactModalOpen && (
        <MessageContactModal
          onSelect={onSelectContact}
          onClose={onCloseContactModal}
        />
      )}
    </div>
  );
}