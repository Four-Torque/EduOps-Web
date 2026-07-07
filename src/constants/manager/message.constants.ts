import type { MessageContact, ChatRoom } from "@/types/message/message.types";

export const MOCK_CONTACTS: MessageContact[] = [
  { id: 1, name: "원장님",    role: "director", department: "원장실", avatarInitial: "원" },
  { id: 2, name: "이순자",    role: "teacher",  department: "인문학", avatarInitial: "이" },
  { id: 3, name: "김민준",    role: "teacher",  department: "수학",   avatarInitial: "김" },
  { id: 4, name: "박지현",    role: "teacher",  department: "영어",   avatarInitial: "박" },
];

export const MOCK_CHAT_ROOMS: ChatRoom[] = [
  {
    id: 1,
    contact: { id: 1, name: "원장님", role: "director", department: "원장실", avatarInitial: "원" },
    lastMessage: "네 확인했습니다.",
    lastMessageAt: "10:30 AM",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 1, senderRole: "director", content: "이번 달 출결 현황 보고해주세요.", isMine: false, sentAt: "10:28 AM" },
      { id: 2, senderId: 0, senderRole: "manager",  content: "네 확인했습니다.",                isMine: true,  sentAt: "10:30 AM" },
    ],
  },
];