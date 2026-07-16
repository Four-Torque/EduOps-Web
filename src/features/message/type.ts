import { UserRole } from "../user/type";

export interface MessageContact {
  id: string;
  name: string;
  role: UserRole;
  department?: string;
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
