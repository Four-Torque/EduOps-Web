import z from "zod/v3";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "이메일을 입력하세요." }),
  password: z
    .string({ message: "비밀번호를 입력하세요." })
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." }),
});

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "이메일 형식이 아닙니다." })
      .min(1, { message: "이메일을 입력하세요." })
      .trim(),
    name: z
      .string()
      .min(1, {
        message: "이름을 입력하세요.",
      })
      .trim(),
    phone: z
      .string()
      .min(1, { message: "전화번호를 입력하세요." })
      .trim()
      .regex(/^010-\d{3,4}-\d{4}$/, {
        message: "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)",
      }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[A-Z]/, { message: "비밀번호는 대문자가 포함되어야 합니다." })
      .regex(/[a-z]/, { message: "비밀번호는 소문자가 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "비밀번호를 8글자 이상이어야 합니다." })
      .trim(),
    terms: z.boolean().refine((val) => val === true, {
      message: "약관에 동의해야 합니다.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });
