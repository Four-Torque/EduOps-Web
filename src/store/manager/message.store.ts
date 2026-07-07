import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ChatRoom, ChatMessage, MessageContact } from "@/types/message/message.types";
import { MOCK_CHAT_ROOMS } from "@/constants/manager/message.constants";

interface MessageUIState {
  chatRooms: ChatRoom[];
  activeChatRoomId: number | null;
  searchQuery: string;
  isNewMessageModalOpen: boolean;
  inputText: string;

  setActiveChatRoom: (id: number) => void;
  setSearchQuery: (query: string) => void;
  openNewMessageModal: () => void;
  closeNewMessageModal: () => void;
  setInputText: (text: string) => void;
  sendMessage: (content: string) => void;
  deleteChatRoom: (id: number) => void;
  createChatRoom: (contact: MessageContact) => void;
}

export const useMessageStore = create<MessageUIState>()(
  devtools(
    (set, get) => ({
      chatRooms: MOCK_CHAT_ROOMS,
      activeChatRoomId: MOCK_CHAT_ROOMS[0].id,
      searchQuery: "",
      isNewMessageModalOpen: false,
      inputText: "",

      setActiveChatRoom: (id) =>
        set({ activeChatRoomId: id }, false, "message/set-active-chat-room"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "message/set-search-query"),

      openNewMessageModal: () =>
        set({ isNewMessageModalOpen: true }, false, "message/open-new-message-modal"),

      closeNewMessageModal: () =>
        set({ isNewMessageModalOpen: false }, false, "message/close-new-message-modal"),

      setInputText: (inputText) =>
        set({ inputText }, false, "message/set-input-text"),

      sendMessage: (content) => {
        const { activeChatRoomId, chatRooms } = get();
        if (!activeChatRoomId || !content.trim()) return;

        const newMessage: ChatMessage = {
          id: Date.now(),
          senderId: 0,
          senderRole: "manager",
          content: content.trim(),
          sentAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          isMine: true,
        };

        set(
          {
            inputText: "",
            chatRooms: chatRooms.map((room) =>
              room.id === activeChatRoomId
                ? {
                    ...room,
                    messages: [...room.messages, newMessage],
                    lastMessage: content.trim(),
                    lastMessageAt: newMessage.sentAt,
                  }
                : room,
            ),
          },
          false,
          "message/send-message",
        );
      },

      deleteChatRoom: (id) => {
        const { chatRooms, activeChatRoomId } = get();
        const remaining = chatRooms.filter((room) => room.id !== id);
        set(
          {
            chatRooms: remaining,
            activeChatRoomId:
              activeChatRoomId === id ? (remaining[0]?.id ?? null) : activeChatRoomId,
          },
          false,
          "message/delete-chat-room",
        );
      },

      createChatRoom: (contact) => {
        const { chatRooms } = get();
        const existing = chatRooms.find((r) => r.contact.id === contact.id);
        if (existing) {
          set({ activeChatRoomId: existing.id, isNewMessageModalOpen: false }, false, "message/set-active-existing");
          return;
        }
        const newRoom: ChatRoom = {
          id: Date.now(),
          contact,
          lastMessage: "",
          lastMessageAt: "",
          unreadCount: 0,
          messages: [],
        };
        set(
          { chatRooms: [newRoom, ...chatRooms], activeChatRoomId: newRoom.id, isNewMessageModalOpen: false },
          false,
          "message/create-chat-room",
        );
      },
    }),
    { name: "ManagerMessageStore" },
  ),
);