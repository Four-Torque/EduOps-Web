import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDirectorChatRooms,
  fetchDirectorChatRoom,
  sendDirectorMessage,
} from "./api";
import type { SendMessageRequest } from "./type";

export const directorMessageQueryKeys = {
  all:  ()               => ["director-messages"]                    as const,
  rooms: ()              => ["director-messages", "rooms"]           as const,
  room:  (id: number)    => ["director-messages", "rooms", id]       as const,
};

export function useDirectorChatRooms() {
  return useQuery({
    queryKey: directorMessageQueryKeys.rooms(),
    queryFn:  fetchDirectorChatRooms,
  });
}

export function useDirectorChatRoom(roomId: number) {
  return useQuery({
    queryKey: directorMessageQueryKeys.room(roomId),
    queryFn:  () => fetchDirectorChatRoom(roomId),
    enabled:  !!roomId,
  });
}

export function useSendDirectorMessage(roomId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendDirectorMessage(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorMessageQueryKeys.room(roomId) });
      queryClient.invalidateQueries({ queryKey: directorMessageQueryKeys.rooms() });
    },
  });
}