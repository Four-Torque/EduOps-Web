import z from "zod/v3";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "이메일을 입력하세요." }),
  password: z
    .string({ message: "비밀번호를 입력하세요." })
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." }),
});
