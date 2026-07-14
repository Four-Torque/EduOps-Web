import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchGroupedContacts, fetchConversations, fetchConversation, sendMessage } from "./api";
import { useMessageContactStore, useMessageChatStore } from "./store";
import type { ChatMessage, ChatRoom } from "./type";

export const messageQueryKeys = {
  all:           ()               => ["message"]                         as const,
  contacts:      (name?: string)  => ["message", "contacts", name]       as const,
  conversations: ()               => ["message", "conversations"]        as const,
  conversation:  (userId: string) => ["message", "conversation", userId] as const,
};

// ─── useGroupedContacts ───────────────────────────────────────────────────────

export function useGroupedContacts() {
  const { searchQuery } = useMessageContactStore();

  return useQuery({
    queryKey: messageQueryKeys.contacts(searchQuery),
    queryFn:  () => fetchGroupedContacts(searchQuery || undefined),
  });
}

// ─── useConversations ─────────────────────────────────────────────────────────

export function useConversations() {
  const { setChatRooms } = useMessageChatStore();

  return useQuery({
    queryKey: messageQueryKeys.conversations(),
    queryFn:  async () => {
      const body = await fetchConversations();

      // timestamp 최신순 정렬
      const sorted = [...body].sort(
        (a, b) =>
          new Date(b.lastMessageUpdatedAt).getTime() -
          new Date(a.lastMessageUpdatedAt).getTime(),
      );

      const chatRooms: ChatRoom[] = sorted.map((item: any) => ({
        id:            item.otherUser.id,
        contact: {
          id:            item.otherUser.id,
          name:          item.otherUser.name,
          role:          item.otherUser.role.toLowerCase(),
          avatarInitial: item.otherUser.name?.slice(0, 1) ?? "",
        },
        lastMessage:   item.lastMessageContent ?? "",
        lastMessageAt: item.lastMessageUpdatedAt
          ? new Date(item.lastMessageUpdatedAt).toLocaleTimeString("ko-KR", {
              hour:   "2-digit",
              minute: "2-digit",
            })
          : "",
        unreadCount: item.unreadCount ?? 0,
        messages:    [],
      }));

      setChatRooms(chatRooms);
      return chatRooms;
    },
  });
}

// ─── useConversation ──────────────────────────────────────────────────────────

export function useConversation(userId: string | null, currentUserId: string) {
  const { setMessages } = useMessageChatStore();

  return useQuery({
    queryKey: messageQueryKeys.conversation(userId ?? ""),
    queryFn:  async () => {
      if (!userId) return [];
      const body = await fetchConversation(userId);

      const messages: ChatMessage[] = (body.data ?? []).map((m: any) => ({
        id:         String(m.id),
        senderId:   String(m.senderId),
        senderRole: m.senderRole ?? "manager",
        content:    m.content,
        sentAt:     m.sentAt ?? m.createdAt?.slice(11, 16) ?? "",
        isMine:     String(m.senderId) === currentUserId,
      }));

      // store에 메시지 반영
      setMessages(userId, messages);
      return messages;
    },
    enabled: !!userId,
  });
}

// ─── useSendMessage ───────────────────────────────────────────────────────────

export function useSendMessage() {
  return useMutation({
    mutationFn: ({ receiverId, content }: { receiverId: string; content: string }) =>
      sendMessage(receiverId, content),
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
}