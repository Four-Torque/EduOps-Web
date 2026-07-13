export type SyllabusStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ClassSyllabusItem {
  id: string;
  teacherId: string;
  name: string;
  fee: number;
  capacity: number;
  startDate: string | null;
  endDate: string | null;
  targetAudience: string | null;
  description: string | null;
  curriculum: string | null;
  status: SyllabusStatus;
  rejectedReason: string | null;
  createdAt: string;
}

export interface PaginatedClassSyllabusResponse {
  data: ClassSyllabusItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSyllabusPayload {
  name: string;
  fee: number;
  capacity: number;
  startDate?: string;
  endDate?: string;
  targetAudience?: string;
  description?: string;
  curriculum?: string;
}
