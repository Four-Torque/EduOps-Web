import apiClient from "@/shared/lib/axios";
import { ExamItem, ExamStudent } from "./type";


interface ExamResultResponseDto {
  id?: string;
  studentId: string;
  studentName?: string;
  score?: number;
}

export interface CreateExamRequest {
  classId: string;
  name: string;
  examDate: Date;
}

export interface SaveExamScoresRequest {
  results: {
    studentId: string;
    score: number;
  }[];
}

export async function fetchExams(classId?: string, period?: string): Promise<ExamItem[]> {
  const params: any = {};
  if (classId && classId !== "all-class") {
    params.classId = classId;
  }
  if (period && period !== "all") {
    params.period = period;
  }

  const response = await apiClient.get("/exam", { params });
  return response.data.body ?? response.data;
}

export async function fetchExamStudents(examId: string): Promise<ExamStudent[]> {
  const response = await apiClient.get(`/exam/${examId}/students-results`);
  const data: ExamResultResponseDto[] = response.data.body ?? response.data;
  
  return data.map((item) => ({
    id: item.studentId, 
    name: item.studentName || "알 수 없음",
    score: item.score,
    status: item.score !== undefined && item.score !== null ? "응시완료" : "미응시",
  }));
}

export async function saveExamScores(examId: string, data: SaveExamScoresRequest): Promise<void> {
  await apiClient.post(`/exam/${examId}/result`, data);
}

export async function createExam(data: CreateExamRequest): Promise<void> {
  await apiClient.post("/exam", data);
}

export interface UpdateExamRequest {
  name?: string;
  examDate?: Date;
}

export async function updateExam(examId: string, data: UpdateExamRequest): Promise<void> {
  await apiClient.patch(`/exam/${examId}`, data);
}

export async function deleteExam(examId: string): Promise<void> {
  await apiClient.delete(`/exam/${examId}`);
}
