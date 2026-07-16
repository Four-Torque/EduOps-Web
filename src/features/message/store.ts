import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Message, MessageContact } from "./type";

type ModalMode = "view" | "reply" | "compose" | null;

interface MessageUIState {
  // 모달
  modalMode: ModalMode;
  selectedMessage: Message | null;
  composeTarget: MessageContact | null;
  viewMode: "RECEIVED" | "SENT" | null;

  // 연락처 선택 모달
  isContactModalOpen: boolean;
  searchQuery: string;

  openViewModal: (message: Message, viewMode: "RECEIVED" | "SENT") => void;
  openReplyModal: () => void;
  openComposeModal: (target?: MessageContact) => void;
  closeModal: () => void;

  openContactModal: () => void;
  closeContactModal: () => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useMessageStore = create<MessageUIState>()(
  devtools(
    (set, get) => ({
      modalMode: null,
      selectedMessage: null,
      composeTarget: null,
      isContactModalOpen: false,
      searchQuery: "",

      // 보기 모달
      openViewModal: (message, viewMode) =>
        set(
          { modalMode: "view", selectedMessage: message, viewMode },
          false,
          "message/open-view",
        ),

      // 보기 → 답장으로 전환
      openReplyModal: () =>
        set(
          (state) => ({
            modalMode: "reply",
            composeTarget: state.selectedMessage?.sender ?? null,
          }),
          false,
          "message/open-reply",
        ),

      // 새 쪽지 작성
      openComposeModal: (target) =>
        set(
          {
            modalMode: "compose",
            composeTarget: target ?? null,
            isContactModalOpen: false,
          },
          false,
          "message/open-compose",
        ),

      closeModal: () =>
        set(
          { modalMode: null, selectedMessage: null, composeTarget: null },
          false,
          "message/close",
        ),

      openContactModal: () =>
        set({ isContactModalOpen: true }, false, "message/open-contact-modal"),

      closeContactModal: () =>
        set(
          { isContactModalOpen: false, searchQuery: "" },
          false,
          "message/close-contact-modal",
        ),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "message/set-search-query"),

      reset: () =>
        set(
          {
            modalMode: null,
            selectedMessage: null,
            composeTarget: null,
            isContactModalOpen: false,
            searchQuery: "",
          },
          false,
          "message/reset",
        ),
    }),
    { name: "MessageStore" },
  ),
);
