"use client";

import { useSession }                                from "@/shared/hooks/useSession";
import { useGroupedContacts, useSendMessage, useConversation, useConversations } from "@/features/message/query";
import { useMessageChatStore }                       from "@/features/message/store";
import { MessageContainer }                          from "@/features/message/components/MessageContainer";

export function MessageSection() {
  const { data: user, isLoading: sessionLoading } = useSession();
  const { data: groups = [] }      = useGroupedContacts();
  const { mutate: sendMessageApi } = useSendMessage();

  // 대화방 목록 조회 (최신순 자동 정렬)
  useConversations();

  const {
    chatRooms,
    activeChatRoomId,
    inputText,
    isContactModalOpen,
    setActiveChatRoom,
    setInputText,
    sendMessage,
    deleteChatRoom,
    createChatRoom,
    openContactModal,
    closeContactModal,
  } = useMessageChatStore();

  // 활성 채팅방
  const activeRoom = chatRooms.find((r) => r.id === activeChatRoomId) ?? null;

  // 채팅방 선택 시 대화 내역 불러오기
  useConversation(activeRoom?.contact.id ?? null, user?.id ?? "");

  if (sessionLoading) return null;

  const contactGroups = groups.filter((g) => g.label !== "관리자");

  function handleSend() {
    if (!inputText.trim() || !activeRoom) return;
    // 낙관적 업데이트
    sendMessage(inputText, user?.id ?? "", "manager");
    // API 전송
    sendMessageApi({
      receiverId: activeRoom.contact.id,
      content:    inputText.trim(),
    });
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.24))]">
      <MessageContainer
        chatRooms={chatRooms}
        activeChatRoomId={activeChatRoomId}
        searchQuery=""
        onSearchChange={() => {}}
        onSelectRoom={setActiveChatRoom}
        inputText={inputText}
        onInputChange={setInputText}
        onSend={handleSend}
        onDeleteRoom={() => activeChatRoomId && deleteChatRoom(activeChatRoomId)}
        isContactModalOpen={isContactModalOpen}
        contactGroups={contactGroups}
        onOpenContactModal={openContactModal}
        onCloseContactModal={closeContactModal}
        onSelectContact={createChatRoom}
      />
    </div>
  );
}