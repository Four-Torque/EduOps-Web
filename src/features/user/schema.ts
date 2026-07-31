import z from "zod/v3";

export const UserFormSchema = z.object({
  name: z.string().min(1, "성함을 입력하세요."),
  email: z
    .string()
    .email("올바른 이메일 주소를 입력하세요.")
    .min(1, "이메일을 입력하세요."),
  phone: z.string().min(1, "전화번호를 입력하세요."),
  password: z.string().optional(),
  role: z.enum(["DIRECTOR", "TEACHER", "MANAGER"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  employmentStatus: z.enum(["WORKING", "ON_LEAVE", "RESIGNED"]),
  joinedAt: z.string().optional().nullable(),
  resignedAt: z.string().optional().nullable(),
});

export const CreateUserFormSchema = UserFormSchema.extend({
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 20자 이하여야 합니다."),
});
