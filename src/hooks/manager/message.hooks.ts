import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchManagerChatRooms,
  fetchManagerChatRoom,
  sendManagerMessage,
} from "@/services/manager/message.service";
import type { SendMessageRequest } from "@/types/manager/message.types";

export const managerMessageQueryKeys = {
  all:   ()              => ["manager-messages"]                     as const,
  rooms: ()              => ["manager-messages", "rooms"]            as const,
  room:  (id: number)    => ["manager-messages", "rooms", id]        as const,
};

export function useManagerChatRooms() {
  return useQuery({
    queryKey: managerMessageQueryKeys.rooms(),
    queryFn:  fetchManagerChatRooms,
  });
}

export function useManagerChatRoom(roomId: number) {
  return useQuery({
    queryKey: managerMessageQueryKeys.room(roomId),
    queryFn:  () => fetchManagerChatRoom(roomId),
    enabled:  !!roomId,
  });
}

export function useSendManagerMessage(roomId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendManagerMessage(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: managerMessageQueryKeys.room(roomId) });
      queryClient.invalidateQueries({ queryKey: managerMessageQueryKeys.rooms() });
    },
  });
}