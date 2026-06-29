export interface User {
  id: number;
  name: string;
  role: "DIRECTOR" | "MANAGER" | "TEACHER";
}