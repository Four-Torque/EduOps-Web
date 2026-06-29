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
    label: "사용자 관리",
    children: [
      { label: "사용자 목록", href: "/user-list" },
      { label: "사용자 등록", href: "/user-register" },
    ],
  },
  { label: "지재물 관리", href: "/asset" },
  { label: "매출", href: "/finance" },
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