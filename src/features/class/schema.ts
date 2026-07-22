import z from "zod/v3";

export const ClassFormSchema = z.object({
  name: z.string().min(1, { message: "강좌명을 입력해주세요." }),
  subjectName: z.string().min(1, { message: "과목명을 입력해주세요." }),
  teacherId: z.string().min(1, { message: "강사를 선택해주세요." }),
  fee: z.number().min(0, { message: "강좌 비용은 0 이상이어야 합니다." }),
  capacity: z
    .number()
    .min(1, { message: "강좌 인원수는 1 이상이어야 합니다." }),
  startDate: z.string({ required_error: "강좌 시작일을 선택해주세요." }),
  endDate: z.string({ required_error: "강좌 종료일을 선택해주세요." }),
});
