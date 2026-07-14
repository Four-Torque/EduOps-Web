import type { MessageContact, ChatRoom } from "@/features/message/type";

export const MOCK_CONTACTS: MessageContact[] = [
  { id: 1, name: "이순자", role: "teacher",  department: "인문학", avatarInitial: "이" },
  { id: 2, name: "김민준", role: "teacher",  department: "수학",   avatarInitial: "김" },
  { id: 3, name: "박지현", role: "teacher",  department: "영어",   avatarInitial: "박" },
  { id: 4, name: "남남수", role: "manager",  department: "행정",   avatarInitial: "남" },
  { id: 5, name: "프린손", role: "teacher",  department: "과학",   avatarInitial: "프" },
  { id: 6, name: "드레인 존슨", role: "manager", department: "관리", avatarInitial: "드" },
];

export const MOCK_CHAT_ROOMS: ChatRoom[] = [
  {
    id: 1,
    contact: MOCK_CONTACTS[0],
    lastMessage: "삼퍼오면 편, 히잉브이존 보진시니아 하이멜리안...",
    lastMessageAt: "10:42 AM",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 1, senderRole: "teacher", content: "반갑다 제군.", isMine: false, sentAt: "10:42 AM" },
      { id: 2, senderId: 1, senderRole: "teacher", content: "이번 독일의 재무장의 준비는 잘되어가는가?\nUN의 1:1 게젠프레싱 맨투맨 압박 탈압박 메시급 레전드 드리블 르로이 렌킨스", isMine: false, sentAt: "10:42 AM" },
      { id: 3, senderId: 0, senderRole: "director", content: "좋은 아침이에요!\n\n내일 아침은 비가 조금 내릴거 같습니다!\n출근하실때 아침 점심 저녁 메뉴 추천 해주시고 커피보단 물을 마시는게 좋아요.\n저는 뭉게구름 면물무깅이에요, 니쿠토의 독두께비 소니도 손보 하도록 할게요.", isMine: true, sentAt: "10:48 AM" },
    ],
  },
  {
    id: 2,
    contact: MOCK_CONTACTS[3],
    lastMessage: "요청하신 본건 통과 되었습니다.",
    lastMessageAt: "어제",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 4, senderRole: "manager", content: "요청하신 본건 통과 되었습니다.", isMine: false, sentAt: "어제" },
    ],
  },
  {
    id: 3,
    contact: MOCK_CONTACTS[4],
    lastMessage: "나는 손수혈통 전투민족의 마지막 생존자 백프로...",
    lastMessageAt: "월요일",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 5, senderRole: "teacher", content: "나는 손수혈통 전투민족의 마지막 생존자 백프로 고집불통 내길을 걷는 삶의 개척자.", isMine: false, sentAt: "월요일" },
    ],
  },
  {
    id: 4,
    contact: MOCK_CONTACTS[5],
    lastMessage: "요즘 애들은 말을 안들어서 문제입니다. 참고요...",
    lastMessageAt: "12월 23일 2026년",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 6, senderRole: "manager", content: "요즘 애들은 말을 안들어서 문제입니다. 참고요 리스트 파일 보내드립니다.", isMine: false, sentAt: "12월 23일 2026년" },
    ],
  },
];

export const ROLE_LABEL: Record<string, string> = {
  teacher: "강사",
  manager: "관리자",
  director: "원장",
};
