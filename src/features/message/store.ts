import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Message, MessageContact } from "./type";

type ModalMode = "view" | "reply" | "compose" | null;

interface MessageUIState {
  modalMode: ModalMode;
  selectedMessage: Message | null;
  composeTarget: MessageContact | null;
  viewMode: "RECEIVED" | "SENT" | null;
  isContactModalOpen: boolean;
  searchQuery: string;
  localReadIds: string[];

  openViewModal: (message: Message, viewMode: "RECEIVED" | "SENT") => void;
  openReplyModal: () => void;
  openComposeModal: (target?: MessageContact) => void;
  closeModal: () => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  setSearchQuery: (query: string) => void;
  markAsRead: (id: string) => void;
  reset: () => void;
}

export const useMessageStore = create<MessageUIState>()(
  devtools(
    (set) => ({
      modalMode:          null,
      selectedMessage:    null,
      composeTarget:      null,
      viewMode:           null,
      isContactModalOpen: false,
      searchQuery:        "",
      localReadIds:       [],

      openViewModal: (message, viewMode) =>
        set({ modalMode: "view", selectedMessage: message, viewMode }, false, "message/open-view"),

      openReplyModal: () =>
        set(
          (state) => ({ modalMode: "reply", composeTarget: state.selectedMessage?.sender ?? null }),
          false,
          "message/open-reply",
        ),

      openComposeModal: (target) =>
        set(
          { modalMode: "compose", composeTarget: target ?? null, isContactModalOpen: false },
          false,
          "message/open-compose",
        ),

      closeModal: () =>
        set({ modalMode: null, selectedMessage: null, composeTarget: null }, false, "message/close"),

      openContactModal: () =>
        set({ isContactModalOpen: true }, false, "message/open-contact-modal"),

      closeContactModal: () =>
        set({ isContactModalOpen: false, searchQuery: "" }, false, "message/close-contact-modal"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "message/set-search-query"),

      markAsRead: (id) =>
        set(
          (state) => ({
            localReadIds: state.localReadIds.includes(id)
              ? state.localReadIds
              : [...state.localReadIds, id],
          }),
          false,
          "message/mark-as-read",
        ),

      reset: () =>
        set(
          { modalMode: null, selectedMessage: null, composeTarget: null, isContactModalOpen: false, searchQuery: "" },
          false,
          "message/reset",
        ),
    }),
    { name: "MessageStore" },
  ),
);