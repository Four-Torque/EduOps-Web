export const ROLE_HOME = {
  DIRECTOR: "/user-list",
  MANAGER: "/school-info",
  TEACHER: "/class",
} as const;

export interface SubNavItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: SubNavItem[];
}

export const DIRECTOR_NAV: NavItem[] = [
  {
    label: "매출 관리",
    children: [
      { label: "매출 대시보드", href: "/finance" },
    ],
  },
  {
    label: "사용자 관리",
    children: [
      { label: "사용자 목록", href: "/user-list" },
    ],
  },
  {
    label: "자재/결제 관리",
    children: [
      { label: "자재 목록", href: "/inventory" },
      { label: "결제 관리", href: "/director-billing" },
    ],
  },
  {
    label: "문자/쪽지",
    children: [
      { label: "쪽지", href: "/director-message" },
    ],
  },
];

export const MANAGER_NAV: NavItem[] = [
  {
    label: "학원 정보",
    children: [
      { label: "학원 기본 정보", href: "/school-info" },
      { label: "원생 관리", href: "/student" },
      { label: "강좌 관리", href: "/course" },
      { label: "스케줄 관리", href: "/schedule" },
      { label: "강사 관리", href: "/teacher-mgmt" },
    ],
  },
  { label: "학생 상세", href: "/student-detail" },
  { label: "직원 근태", href: "/attendance" },
  { label: "자재 물품 신청", href: "/material" },
  { label: "결제 관리", href: "/billing" },
  { label: "문자/쪽지", href: "/manager-message" },
];

export const TEACHER_NAV: NavItem[] = [
  {
    label: "시간표",
    children: [
      { label: "수업 시간표", href: "/class" },
    ],
  },
  {
    label: "학생 출결관리",
    children: [
      { label: "학생 출결 관리", href: "/student-attendance" },
    ],
  },
  {
    label: "수업 파일 관리",
    children: [
      { label: "수업 파일 관리", href: "/files" },
    ],
  },
  {
    label: "성적 관리",
    children: [
      { label: "학생 수업 테스트", href: "/test" },
    ],
  },
];

// 원장용: 관리자 nav에서 원장 nav와 중복되는 항목 제외 후 합산
const DIRECTOR_EXCLUDES_FROM_MANAGER = ["문자/쪽지"];

export function getDirectorNav(): NavItem[] {
  const filtered = MANAGER_NAV.filter(
    (item) => !DIRECTOR_EXCLUDES_FROM_MANAGER.includes(item.label)
  );
  return [...DIRECTOR_NAV, ...filtered];
}