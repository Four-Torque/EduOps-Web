import type { ClassOption } from "@/types/manager/student-register.types";

// TODO: 실제 반 목록 API 연동 시 교체
export const MOCK_CLASS_OPTIONS: ClassOption[] = [
  { id: "class-1", name: "수능대비 영어반"   },
  { id: "class-2", name: "기초튼튼 수학반"   },
  { id: "class-3", name: "인문학 정복반"     },
  { id: "class-4", name: "심화 과학반"       },
];

export const STUDENT_STATUS_OPTIONS = [
  { label: "Active",   value: "active"   },
  { label: "Inactive", value: "inactive" },
];
