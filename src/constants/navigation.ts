// 역할별 로그인 후 첫 진입 페이지 (탭을 모두 닫았을 때 돌아갈 홈이기도 함)
export const ROLE_HOME = {
  DIRECTOR: "/user-list",
  MANAGER: "/school-info",
  TEACHER: "/class",
} as const;

// 최상위 메뉴의 고유 식별자 목록.
// 코드(아이콘 매핑, 노출 제외 등)는 UI 라벨이 아니라 이 id를 참조한다.
// 라벨은 다국어/문구 변경으로 언제든 바뀔 수 있지만 id는 바뀌지 않는다.
export const NAV_IDS = [
  "sales",
  "user-management",
  "director-material-approval",
  "director-message",
  "academy-info",
  "staff-attendance",
  "material-management",
  "billing",
  "manager-message",
  "schedule",
  "student-attendance",
  "class-files",
  "grade",
] as const;

export type NavId = (typeof NAV_IDS)[number];

export interface SubNavItem {
  label: string;
  href: string;
}

export interface NavItem {
  id: NavId;
  label: string;
  href?: string;
  children?: SubNavItem[];
}

export const DIRECTOR_NAV: NavItem[] = [
  {
    id: "user-management",
    label: "사용자 관리",
    children: [{ label: "사용자 목록", href: "/user-list" }],
  },
  {
    id: "sales",
    label: "매출",
    children: [{ label: "매출 대시보드", href: "/finance" }],
  },
  {
    id: "director-material-approval",
    label: "자재/결재 관리",
    children: [
      { label: "자재 목록", href: "/inventory" },
      { label: "결재 관리", href: "/director-billing" },
    ],
  },
  {
    id: "director-message",
    label: "쪽지",
    children: [{ label: "쪽지", href: "/director-message" }],
  },
];

export const MANAGER_NAV: NavItem[] = [
  {
    id: "academy-info",
    label: "학원 정보",
    children: [
      { label: "학원 기본 정보", href: "/school-info" },
      { label: "원생 관리", href: "/student" },
      { label: "강좌 관리", href: "/course" },
      { label: "스케줄 관리", href: "/schedule" },
      { label: "강사 관리", href: "/teacher-mgmt" },
    ],
  },
  {
    id: "staff-attendance",
    label: "근태",
    children: [{ label: "직원 근태 관리", href: "/attendance" }],
  },
  {
    id: "material-management",
    label: "자재 관리",
    children: [
      { label: "자재 물품 신청", href: "/material" },
      { label: "구매처 관리", href: "/vendor" },
    ],
  },
  {
    id: "billing",
    label: "결제",
    children: [{ label: "결제 관리", href: "/billing" }],
  },
  {
    id: "manager-message",
    label: "쪽지",
    children: [{ label: "쪽지 보내기", href: "/manager-message" }],
  },
];

export const TEACHER_NAV: NavItem[] = [
  {
    id: "schedule",
    label: "시간표",
    children: [{ label: "수업 시간표", href: "/class" }],
  },
  {
    id: "student-attendance",
    label: "원생 출결",
    children: [{ label: "원생 출결 관리", href: "/student-attendance" }],
  },
  {
    id: "class-files",
    label: "수업 파일",
    children: [{ label: "수업 파일 관리", href: "/files" }],
  },
  {
    id: "grade",
    label: "성적 관리",
    children: [{ label: "원생 수업 테스트", href: "/test" }],
  },
];

// 원장 nav에 관리자 메뉴를 재사용해 붙일 때, "보여줄 것만" 명시하는 화이트리스트.
// 목록에 없는 관리자 메뉴는 기본적으로 원장에게 숨겨진다.
// (블랙리스트로 하면 새 관리자 메뉴가 실수로 원장에게 노출될 수 있어 화이트리스트를 쓴다)
const DIRECTOR_INCLUDES_FROM_MANAGER: NavId[] = [
  "academy-info",
  "staff-attendance",
  "billing",
];

export function getDirectorNav(): NavItem[] {
  const managerMenusForDirector = MANAGER_NAV.filter((item) =>
    DIRECTOR_INCLUDES_FROM_MANAGER.includes(item.id),
  );
  return [...DIRECTOR_NAV, ...managerMenusForDirector];
}
