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
  { label: "매출 관리", href: "/finance" },
  { label: "자재/결제 관리", href: "/payment" },
  { label: "연락 관리", href: "/director-message" },
];

export const MANAGER_NAV: NavItem[] = [
  { label: "원생/강사 관리", href: "/academic" },
  { label: "반/스케줄 관리", href: "/schedule" },
  { label: "직원 근태 관리", href: "/attendance" },
  { label: "수업료/급여 결제", href: "/billing" },
  { label: "쪽지", href: "/manager-message" },
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