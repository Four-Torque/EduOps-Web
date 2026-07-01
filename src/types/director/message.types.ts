export type MessageSenderRole = "director" | "teacher" | "manager";

export interface MessageContact {
  id: number;
  name: string;
  role: MessageSenderRole;
  department?: string;
  avatarInitial: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  senderRole: MessageSenderRole;
  content: string;
  sentAt: string;
  isMine: boolean;
}

export interface ChatRoom {
  id: number;
  contact: MessageContact;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface SendMessageRequest {
  receiverId: number;
  content: string;
}
