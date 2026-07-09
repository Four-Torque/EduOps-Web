import z from "zod/v3";

export const VendorFormSchema = z.object({
  name: z.string().min(1, "업체명을 입력하세요."),
  phone: z.string().min(1, "전화번호를 입력하세요."),
  email: z
    .string()
    .email("유효한 이메일을 입력하세요.")
    .min(1, "이메일을 입력하세요."),
});
