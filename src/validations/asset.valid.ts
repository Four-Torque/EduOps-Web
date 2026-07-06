import z from "zod/v3";

export const AssetApplicationFormSchema = z.object({
  categoryId: z.string().min(1, "카테고리를 선택하세요."),
  name: z.string().min(1, "자재명을 입력하세요."),
  quantity: z.number().min(1, "수량을 입력하세요."),
  price: z.number({ message: "가격을 입력하세요." }),
  vendorId: z.string().min(1, "업체를 선택하세요."),
  reason: z.string().optional(),
});
