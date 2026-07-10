import type { Student, StudentStats } from "@/features/student/type";

export const MOCK_STUDENT_STATS: StudentStats = {
  totalStudents: 1248,
  totalStudentsGrowthRate: 12,
  newRegistrations: 42,
  waitingConsultations: 18,
};

export const MOCK_STUDENTS: Student[] = [
  { id: "s-1",  name: "김민주",    avatarInitial: "MJ", birthDate: "2005-03-15", address: "서울시 강남구",   Phonenumber: "010-1234-5678", status: "active"   },
  { id: "s-2", name: "제이팍",    avatarInitial: "JP", birthDate: "2006-07-22", address: "서울시 마포구",   Phonenumber: "010-1234-5678", status: "active"   },
  { id: "s-3", name: "이수진",    avatarInitial: "SJ", birthDate: "2005-09-10", address: "경기도 성남시",   Phonenumber: "010-9876-5432", status: "active"   },
  { id: "s-4",  name: "프린스 송", avatarInitial: "SL", birthDate: "2004-11-05", address: "서울시 용산구",   Phonenumber: "010-1234-5678", status: "inactive" },
  { id: "s-5",  name: "김태양",    avatarInitial: "KT", birthDate: "2003-08-30", address: "경기도 수원시",   Phonenumber: "010-5555-6666", status: "inactive" },
];