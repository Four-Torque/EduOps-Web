export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: "DIRECTOR" | "TEACHER" | "MANAGER";
  status: "ACTIVE" | "INACTIVE" | "LEAVED";
};
