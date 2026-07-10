export interface ClassOption {
  id: string;
  name: string;
}

export const MOCK_CLASS_OPTIONS: ClassOption[] = [
  { id: "class-1", name: "수능대비 영어반"   },
  { id: "class-2", name: "기초튼튼 수학반"   },
  { id: "class-3", name: "인문학 정복반"     },
  { id: "class-4", name: "심화 과학반"       },
];

export const STUDENT_STATUS_OPTIONS = [
  { label: "재학중", value: "active"   },
  { label: "비활동", value: "inactive" },
];