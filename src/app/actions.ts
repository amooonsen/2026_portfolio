"use server";

import {contactSchema} from "@/lib/validations/contact";
import {sendContactMail} from "@/lib/mail";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    organization?: string[];
    position?: string[];
    email?: string[];
    message?: string[];
  };
}

/**
 * Contact 폼 제출 Server Action.
 * Zod로 서버 사이드 검증 후 Nodemailer로 Gmail SMTP 전송한다.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    organization: formData.get("organization") || "",
    position: formData.get("position") || "",
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      message: "입력값을 확인해 주세요.",
      errors: {
        name: fieldErrors.name,
        organization: fieldErrors.organization,
        position: fieldErrors.position,
        email: fieldErrors.email,
        message: fieldErrors.message,
      },
    };
  }

  try {
    await sendContactMail(result.data);
    return {success: true, message: "메시지가 성공적으로 전송되었습니다."};
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return {
      success: false,
      message: "메시지 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
