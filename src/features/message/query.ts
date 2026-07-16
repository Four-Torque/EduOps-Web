import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGroupedContacts,
  findReceivedMessages,
  findSentMessages,
  markMessageAsRead,
  sendMessage,
} from "./api";
import { useMessageStore } from "./store";
import toast from "react-hot-toast";

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
      queryClient.invalidateQueries({ queryKey: messageQueryKeys.sent() });
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
      queryClient.invalidateQueries({ queryKey: messageQueryKeys.received() });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
