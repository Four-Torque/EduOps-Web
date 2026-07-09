export type StudentStatus = "active" | "inactive";
export type StudentTabFilter = "active" | "waiting" | "graduated";

export interface Student {
  id: string;
  name: string;
  avatarInitial: string;
  studentCode: string;
  birthDate: string;
  classInfo: string;
  Phonenumber: string;
  status: "active" | "inactive" | "pending";
}

export interface StudentListResponse {
  items: Student[];
  totalItems: number;
  totalPages: number;
}

export interface StudentStats {
  totalStudents: number;
  totalStudentsGrowthRate: number;
  newRegistrations: number;
  waitingConsultations: number;
}

export interface StudentRegisterFormState {
  name: string;
  birthDate: string;
  phone: string;
  grade: string;
  classId: string;
  status: "active" | "inactive" | "pending";
}

export type StudentRegisterFormErrors = Partial<
  Record<keyof StudentRegisterFormState, string>
>;

export interface ClassOption {
  id: string;
  name: string;
}
