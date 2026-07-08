export interface ClassInfo {
  id: string;
  teacherId: string;
  name: string;
  fee: number;
  capacity: number;
  startDate: string | null;
  endDate: string | null;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedClassResponse {
  page: number;
  total: number;
  data: ClassInfo[];
}

