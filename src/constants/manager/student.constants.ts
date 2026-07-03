import type { StudentTabFilter, Student, StudentStats } from "@/types/manager/student.types";

export const STUDENT_TABS: { label: string; value: StudentTabFilter }[] = [
  { label: "학생",            value: "active"     },
  { label: "대기자",          value: "waiting"    },
  { label: "졸업생 / 비활동 회원", value: "graduated" },
];

export const STUDENT_TABLE_COLUMNS = [
  { key: "info",        label: "학생 정보"     },
  { key: "birthDate",    label: "생년월일"     },
  { key: "classInfo",   label: "클래스"       },
  { key: "Phonenumber", label: "학생 연락처" },
  { key: "status",      label: "상태"          },
  { key: "actions",     label: "액션빔"        },
] as const;

export const MOCK_STUDENT_STATS: StudentStats = {
  totalStudents: 1248,
  totalStudentsGrowthRate: 12,
  newRegistrations: 42,
  waitingConsultations: 18,
};

export const MOCK_STUDENTS: Student[] = [
  { id: 1, studentCode: "2023-0142", name: "김민주", avatarInitial: "MJ", birthDate: "19980429", classInfo: "수능대비 영어반", Phonenumber: "010-1234-5678", status: "active"   },
  { id: 2, studentCode: "2023-0145", name: "제이팍", avatarInitial: "JP", birthDate: "19990625", classInfo: "기초튼튼 수학반", Phonenumber: "010-1234-5678", status: "active"   },
  { id: 3, studentCode: "2022-0089", name: "프린스 송", avatarInitial: "SL", birthDate: "19940817", classInfo: "인문학 정복반", Phonenumber: "010-1234-5678", status: "inactive" },
];
