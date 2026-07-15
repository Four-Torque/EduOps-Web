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

export interface Message {
  id: string;
  sender: MessageContact;
  receiver: MessageContact;
  content: string;
  sentAt: string;
  isRead: boolean;
}
