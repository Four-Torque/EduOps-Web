import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteMessages,
  fetchGroupedContacts,
  findReceivedMessages,
  findSentMessages,
  markMessageAsRead,
  sendMessage,
} from "./api";
import { useMessageStore } from "./store";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSession } from "@/shared/hooks/useSession";
import { createEventSource } from "@/shared/lib/sse";
import { Message } from "./type";

export const messageQueryKeys = {
  all: () => ["messages"] as const,
  contacts: (name?: string) => ["messages", "contacts", name] as const,
  sent: (params?: { page?: number; limit?: number }, userId?: string) =>
    ["messages", "sent", { ...params, userId }] as const,
  received: (params?: { page?: number; limit?: number }, userId?: string) =>
    ["messages", "received", { ...params, userId }] as const,
};

export function useGroupedContacts() {
  const { searchQuery } = useMessageStore();
  return useQuery({
    queryKey: messageQueryKeys.contacts(searchQuery),
    queryFn: () => fetchGroupedContacts(searchQuery || undefined),
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["messages", "sent"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useReceivedMessages(
  params: {
    page?: number;
    limit?: number;
  },
  userId?: string,
) {
  const query = useQuery({
    enabled: !!userId,
    queryKey: messageQueryKeys.received(params, userId),
    queryFn: () => findReceivedMessages(params),
  });
  return query;
}

export function useFindSentMessages(
  params: {
    page?: number;
    limit?: number;
  },
  userId?: string,
) {
  const query = useQuery({
    enabled: !!userId,
    queryKey: messageQueryKeys.sent(params, userId),
    queryFn: () => findSentMessages(params),
  });
  return query;
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", "received"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useUnreadMessages(userId?: string) {
  const query = useQuery({
    enabled: !!userId,
    queryKey: [
      ...messageQueryKeys.received({ page: 1, limit: 100 }, userId),
      "unread",
    ],
    queryFn: () => findReceivedMessages({ page: 1, limit: 100 }),
    select: (data: any) =>
      (data?.data ?? []).filter(
        (msg: Message) => msg.receiverId === userId && !msg.isRead,
      ),
  });
  return query;
}

export function useDeleteMessages() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: { ids: string[]; type: "SENT" | "RECEIVED" }) =>
      deleteMessages(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["messages", "received"] });
      queryClient.invalidateQueries({ queryKey: ["messages", "sent"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useMessageSse() {
  const { data: user } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const eventSource = createEventSource("/message/sse");
    eventSource.onmessage = (event) => {
      if (event.data === "ping") return;
      try {
        queryClient.invalidateQueries({ queryKey: ["messages", "received"] });
      } catch (error) {
        console.error("캐시 무효화 실패", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource 연결 오류:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [user?.id, queryClient]);
}
