  export interface EnrollmentResponse{
    id: string;
    classId: string;
    studentId: string;
    enrollDate: Date;
    createdAt: Date;
    updatedAt: Date;
    studentName?: string;
    studentPhone?: string;
    className?: string;
  }

  export interface CreateEnrollmentRequest{
    studentId: string; 
    classId: string; 
    enrollDate: Date; 
    initialAmount?: number; 
    initialDueDate?: Date
  }
  