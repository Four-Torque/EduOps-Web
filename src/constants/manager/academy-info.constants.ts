import type { AcademyBasicInfo, AcademyOverview, AcademyBranch } from "@/types/manager/academy-info.types";

export const ACADEMY_TABS = [
  { label: "학원 기본 정보", href: "/academic/academy-info"     },
  { label: "학생 관리",      href: "/academic/student"          },
  { label: "강사 관리",      href: "/academic/teacher"          },
  { label: "스케줄 관리",    href: "/schedule"                  },
  { label: "강사 관리",      href: "/academic/teacher-detail"   },
] as const;

export const MOCK_ACADEMY_BASIC_INFO: AcademyBasicInfo = {
  academyName: "KOSTA 가산교육센터",
  representativeName: "이민하",
  representativePhone: "053-323-5225",
  businessNumber: "ACA-2023-8981",
  address: "서울특별시 구로구 디지털로 20길 10 스테이션 203호",
};

export const MOCK_ACADEMY_OVERVIEW: AcademyOverview = {
  totalStudents: 1240,
  totalEnrolled: 85,
  usageRate: 45,
};

export const MOCK_ACADEMY_BRANCHES: AcademyBranch[] = [
  { id: 1, branchName: "KOSTA 가산교육센터", manager: "드레인 신데렐라", status: "active" },
  { id: 2, branchName: "KOSTA 대구교육센터", manager: "박정희",          status: "active" },
];
