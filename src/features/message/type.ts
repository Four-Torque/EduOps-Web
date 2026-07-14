export type MessageSenderRole = "director" | "teacher" | "manager";

export interface MessageContact {
  id: string;
  name: string;
  role: MessageSenderRole;
  department?: string;
  avatarInitial: string;
}

export interface MessageContactGroup {
  label: string;
  contacts: MessageContact[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: MessageSenderRole;
  content: string;
  sentAt: string;
  isMine: boolean;
}

export interface ChatRoom {
  id: string;
  contact: MessageContact;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface ConversationResponse {
  data: ChatMessage[];
  total: number;
  totalPages: number;
}