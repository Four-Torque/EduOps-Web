import type { ChatRoom, SendMessageRequest } from "@/features/message/type";

// TODO: import apiClient from "@/lib/axios";

const MOCK_CHAT_ROOMS: ChatRoom[] = [];

export async function fetchManagerChatRooms(): Promise<ChatRoom[]> {
  // TODO: return apiClient.get<ChatRoom[]>("/manager/messages/rooms").then((r) => r.data);

  await new Promise((res) => setTimeout(res, 300));
  return MOCK_CHAT_ROOMS;
}

export async function fetchManagerChatRoom(roomId: number): Promise<ChatRoom> {
  // TODO: return apiClient.get<ChatRoom>(`/manager/messages/rooms/${roomId}`).then((r) => r.data);

  await new Promise((res) => setTimeout(res, 200));
  const room = MOCK_CHAT_ROOMS.find((r) => r.id === roomId);
  if (!room) throw new Error("채팅방을 찾을 수 없습니다.");
  return room;
}

export async function sendManagerMessage(
  roomId: number,
  data: SendMessageRequest,
): Promise<void> {
  // TODO: return apiClient.post(`/manager/messages/rooms/${roomId}`, data);

  await new Promise((res) => setTimeout(res, 200));
}

export const fetchDirectorChatRooms = fetchManagerChatRooms;
export const fetchDirectorChatRoom = fetchManagerChatRoom;
export const sendDirectorMessage = sendManagerMessage;
