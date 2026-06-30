import type { ChatRoom, SendMessageRequest } from "@/types/director/message.types";

// TODO: import apiClient from "@/lib/axios";

const MOCK_CHAT_ROOMS: ChatRoom[] = [];

export async function fetchDirectorChatRooms(): Promise<ChatRoom[]> {
  // TODO: return apiClient.get<ChatRoom[]>("/director/messages/rooms").then((r) => r.data);

  await new Promise((res) => setTimeout(res, 300));
  return MOCK_CHAT_ROOMS;
}

export async function fetchDirectorChatRoom(roomId: number): Promise<ChatRoom> {
  // TODO: return apiClient.get<ChatRoom>(`/director/messages/rooms/${roomId}`).then((r) => r.data);

  await new Promise((res) => setTimeout(res, 200));
  const room = MOCK_CHAT_ROOMS.find((r) => r.id === roomId);
  if (!room) throw new Error("채팅방을 찾을 수 없습니다.");
  return room;
}

export async function sendDirectorMessage(
  roomId: number,
  data: SendMessageRequest,
): Promise<void> {
  // TODO: return apiClient.post(`/director/messages/rooms/${roomId}`, data);

  await new Promise((res) => setTimeout(res, 200));
}