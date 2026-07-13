import z from "zod/v3";

export const ScheduleFormSchema = z.object({
  classId: z.string().min(1, "강좌를 선택해주세요."),
  dayOfWeek: z.coerce.number().min(0).max(6, "올바른 요일을 선택해주세요."),
  startTime: z.string().min(1, "시작 시간을 입력해주세요."),
  endTime: z.string().min(1, "종료 시간을 입력해주세요."),
  room: z.string().min(1, "강의실을 입력해주세요."),
});
