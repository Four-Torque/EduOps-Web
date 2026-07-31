export type StudentStatus = "active" | "inactive";
export type StudentTabFilter = "전체" | "학생" | "대기자" | "졸업생 / 비활동 회원";

export interface Student {
  id: string;
  name: string;
  avatarInitial: string;
  birthDate: string;
  address: string;
  Phonenumber: string;
  status: StudentStatus;
}

export interface StudentStats {
  totalStudents: number;
  totalStudentsGrowthRate: number;
  newRegistrations: number;
  waitingConsultations: number;
}

export interface StudentListResponse {
  data: Student[];
  total: number;
  totalPages: number;
}

export interface StudentRegisterFormState {
  name: string;
  birthDate: string;
  phone: string;
  address: string;
  addressDetail: string;
  status: StudentStatus;
}