"use client";

import { MOCK_CONTACTS } from "@/shared/constants/director/message.constants";
import { useSession } from "@/shared/hooks/useSession";
import { useMessageStore } from "../store";
import { MessageContainer } from "./MessageContainer";

export function ManagerMessageSection() {
  const store = useMessageStore();
  const { data: user, isLoading } = useSession();

  console.log("현재 user:", user);
  console.log("현재 role:", user?.role);

  const contactGroups = [
    {
      label: "원장",
      contacts: MOCK_CONTACTS.filter((c) => c.role === "director"),
    },
    {
      label: "강사",
      contacts: MOCK_CONTACTS.filter((c) => c.role === "teacher"),
    },
  ];

  if (isLoading) return null;

  return (
    <div className="h-[calc(100vh-theme(spacing.24))]">
      <MessageContainer
        chatRooms={store.chatRooms}
        activeChatRoomId={store.activeChatRoomId}
        searchQuery={store.searchQuery}
        onSearchChange={store.setSearchQuery}
        onSelectRoom={store.setActiveChatRoom}
        inputText={store.inputText}
        onInputChange={store.setInputText}
        onSend={() => store.sendMessage(store.inputText)}
        onDeleteRoom={() =>
          store.activeChatRoomId && store.deleteChatRoom(store.activeChatRoomId)
        }
        isContactModalOpen={store.isNewMessageModalOpen}
        contactGroups={contactGroups}
        onOpenContactModal={store.openNewMessageModal}
        onCloseContactModal={store.closeNewMessageModal}
        onSelectContact={store.createChatRoom}
      />
    </div>
  );
}
