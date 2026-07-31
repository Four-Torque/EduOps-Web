import { UserRole } from "../user/type";

export interface MessageContact {
  id: string | number;
  name: string;
  role: UserRole | "teacher" | "manager" | "director" | "admin";
  department?: string;
  avatarInitial?: string;
}



export interface MessageContactGroup {
  role: string;
  contacts: MessageContact[];
}

export interface Message {
  id: string;
  sender: MessageContact;
  receiver: MessageContact;
  title: string;
  content: string;
  sentAt: string;
  isRead: boolean;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatRoom {
  id: number | string;
  contact: MessageContact & { avatarInitial?: string };
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Array<{
    id: number | string;
    senderId: number | string;
    senderRole: string;
    content: string;
    isMine: boolean;
    sentAt: string;
  }>;
}

