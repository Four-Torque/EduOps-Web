import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchGroupedContacts,
  fetchSentMessages,
  fetchReceivedMessages,
  sendMessage,
} from "./api";
import { useMessageStore } from "./store";

export const messageQueryKeys = {
  all:      ()              => ["message"]                       as const,
  contacts: (name?: string) => ["message", "contacts", name]    as const,
  sent:     ()              => ["message", "sent"]               as const,
  received: ()              => ["message", "received"]           as const,
};

export function useGroupedContacts() {
  const { searchQuery } = useMessageStore();
  return useQuery({
    queryKey: messageQueryKeys.contacts(searchQuery),
    queryFn:  () => fetchGroupedContacts(searchQuery || undefined),
  });
}

export function useSentMessages() {
  return useQuery({
    queryKey: messageQueryKeys.sent(),
    queryFn:  fetchSentMessages,
  });
}

export function useReceivedMessages() {
  return useQuery({
    queryKey: messageQueryKeys.received(),
    queryFn:  fetchReceivedMessages,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { closeModal } = useMessageStore();

  return useMutation({
    mutationFn: ({ receiverId, content }: { receiverId: string; content: string }) =>
      sendMessage(receiverId, content),
    onSuccess: () => {
      toast.success("쪽지가 전송되었습니다.");
      queryClient.invalidateQueries({ queryKey: messageQueryKeys.sent() });
      closeModal();
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
}