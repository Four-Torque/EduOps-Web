import z from "zod/v3";

export const StudentFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  birthDate: z.string().min(1, "생년월일을 입력해주세요."),
  phone: z.string().min(1, "핸드폰 번호를 입력해주세요."),
  address: z.string().min(1, "주소를 입력해주세요."),
  addressDetail: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});
