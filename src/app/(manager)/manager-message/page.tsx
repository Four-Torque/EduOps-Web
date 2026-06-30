"use client";

import { useManagerChatRooms, useSendManagerMessage } from "@/hooks/manager/message.hooks";

export default function ManagerMessagePage() {
  const { data: rooms, isLoading } = useManagerChatRooms();
  const { mutate: sendMessage } = useSendManagerMessage(0);

  if (isLoading) return <div>불러오는 중...</div>;

  return (
    <div>
      <h1>쪽지함</h1>
      {/* TODO: 채팅방 목록 UI */}
      {/* TODO: 메시지 전송 폼 */}
    </div>
  );
}