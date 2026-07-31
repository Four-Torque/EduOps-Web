import { z } from "zod";

export const attendanceRecordSchema = z.object({
  userId: z.string().min(1, "직원을 선택해 주세요."),
  workDate: z.string().min(1, "날짜를 선택해 주세요."),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
});

export type AttendanceRecordFormValues = z.infer<typeof attendanceRecordSchema>;
export type StudentAttendanceFormValues = {
  status: "ATTENDED" | "TARDY" | "ABSENT" | "LEFT_EARLY";
  note?: string;
};
