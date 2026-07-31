export interface ExamItem {
  id: string;
  classId: string;
  name: string;
  examDate: string | null;
  createdAt: string;
  className: string;
  averageScore: number;
  attendees: number;
  totalStudents: number;
  status: string;
}

export interface ExamStudent {
  id: string;
  name: string;
  score?: number;
  status: "미응시" | "응시완료";
}
