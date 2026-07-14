import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { MessageContact, ChatRoom, ChatMessage } from "./type";

// ─── Contact 검색 Store ───────────────────────────────────────────────────────

interface MessageContactUIState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useMessageContactStore = create<MessageContactUIState>()(
  devtools(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "message-contact/set-search-query"),
    }),
    { name: "MessageContactStore" },
  ),
);

// ─── Chat Store ───────────────────────────────────────────────────────────────

interface MessageChatUIState {
  chatRooms: ChatRoom[];
  activeChatRoomId: string | null;
  inputText: string;
  isContactModalOpen: boolean;

  setActiveChatRoom: (id: string) => void;
  setInputText: (text: string) => void;
  setChatRooms: (rooms: ChatRoom[]) => void;
  setMessages: (contactId: string, messages: ChatMessage[]) => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  sendMessage: (content: string, senderId: string, senderRole: MessageContact["role"]) => void;
  deleteChatRoom: (id: string) => void;
  createChatRoom: (contact: MessageContact) => void;
}

export const useMessageChatStore = create<MessageChatUIState>()(
  devtools(
    (set, get) => ({
      chatRooms: [],
      activeChatRoomId: null,
      inputText: "",
      isContactModalOpen: false,

      setActiveChatRoom: (id) =>
        set({ activeChatRoomId: id }, false, "message-chat/set-active-room"),

      setInputText: (inputText) =>
        set({ inputText }, false, "message-chat/set-input-text"),

      setChatRooms: (chatRooms) =>
        set({ chatRooms }, false, "message-chat/set-chat-rooms"),

      setMessages: (contactId, messages) =>
        set(
          (state) => ({
            chatRooms: state.chatRooms.map((room) =>
              room.contact.id === contactId
                ? { ...room, messages }
                : room,
            ),
          }),
          false,
          "message-chat/set-messages",
        ),

      openContactModal: () =>
        set({ isContactModalOpen: true }, false, "message-chat/open-contact-modal"),

      closeContactModal: () =>
        set({ isContactModalOpen: false }, false, "message-chat/close-contact-modal"),

      sendMessage: (content, senderId, senderRole) => {
        const { activeChatRoomId, chatRooms } = get();
        if (!activeChatRoomId || !content.trim()) return;

        const newMessage: ChatMessage = {
          id:         String(Date.now()),
          senderId,
          senderRole,
          content:    content.trim(),
          sentAt:     new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          isMine:     true,
        };

        set(
          {
            inputText: "",
            chatRooms: chatRooms.map((room) =>
              room.id === activeChatRoomId
                ? {
                    ...room,
                    messages:      [...room.messages, newMessage],
                    lastMessage:   content.trim(),
                    lastMessageAt: newMessage.sentAt,
                  }
                : room,
            ),
          },
          false,
          "message-chat/send-message",
        );
      },

      deleteChatRoom: (id) => {
        const { chatRooms, activeChatRoomId } = get();
        const remaining = chatRooms.filter((r) => r.id !== id);
        set(
          {
            chatRooms: remaining,
            activeChatRoomId:
              activeChatRoomId === id ? (remaining[0]?.id ?? null) : activeChatRoomId,
          },
          false,
          "message-chat/delete-chat-room",
        );
      },

      createChatRoom: (contact) => {
        const { chatRooms } = get();
        const existing = chatRooms.find((r) => r.contact.id === contact.id);
        if (existing) {
          set({ activeChatRoomId: existing.id, isContactModalOpen: false }, false, "message-chat/set-existing-room");
          return;
        }

        const newRoom: ChatRoom = {
          id:            String(Date.now()),
          contact,
          lastMessage:   "",
          lastMessageAt: "",
          unreadCount:   0,
          messages:      [],
        };

        set(
          {
            chatRooms:          [newRoom, ...chatRooms],
            activeChatRoomId:   newRoom.id,
            isContactModalOpen: false,
          },
          false,
          "message-chat/create-chat-room",
        );
      },
    }),
    { name: "MessageChatStore" },
  ),
);