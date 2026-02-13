import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해 주세요.")
    .max(50, "이름은 50자 이내로 입력해 주세요."),
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 주소를 입력해 주세요."),
  message: z
    .string()
    .min(1, "메시지를 입력해 주세요.")
    .max(2000, "메시지는 2000자 이내로 입력해 주세요."),
})

export type ContactFormData = z.infer<typeof contactSchema>
