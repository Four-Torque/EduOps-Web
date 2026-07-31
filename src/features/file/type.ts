export interface ClassFileResponse {
  id: string;
  classId: string;
  fileName: string;
  fileSize: number;
  uploaderId: string;
  uploaderName?: string;
  createdAt: string;
}

export interface PaginatedClassFileResponse {
  total: number;
  page: number;
  totalPages: number;
  data: ClassFileResponse[];
}
