export type FileFormat = "PDF" | "PPT" | "DOC" | "XLS" | "IMAGE" | "ETC";

export type FileItem = {
  id: string;
  fileName: string;
  className: string;
  format: FileFormat;
  size: number; 
  uploadedAt: string;
  uploaderId?: string;
  uploaderName?: string;
};

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
  data: ClassFileResponse[];
}
