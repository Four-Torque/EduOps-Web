export interface StudentRegisterFormState {
  name: string;
  birthDate: string;
  phone: string;
  grade: string;
  classId: string;
  status: "active" | "inactive" | "pending" ;
}

export type StudentRegisterFormErrors = Partial<Record<keyof StudentRegisterFormState, string>>;

export interface ClassOption {
  id: string;
  name: string;
}
