import z from "zod/v3";

export const SubjectFormSchema = z.object({
  name: z.string().min(1, "과목명을 입력하세요."),
});
