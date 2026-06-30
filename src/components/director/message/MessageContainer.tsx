"use client";

import { MessageChatList }     from "./MessageChatList";
import { MessageChatRoom }     from "./MessageChatRoom";
import { MessageContactModal } from "./MessageContactModal";
import { useMessageStore }     from "@/store/director/message.store";

export function MessageContainer() {
  const { isNewMessageModalOpen } = useMessageStore();

  return (
    <div className="flex h-full border border-slate-200 rounded overflow-hidden bg-white">
      <MessageChatList />
      <MessageChatRoom />
      {isNewMessageModalOpen && <MessageContactModal />}
    </div>
  );
}
