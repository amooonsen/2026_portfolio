"use server"

interface ContactFormState {
  success: boolean
  message: string
}

/**
 * 연락처 폼 제출 Server Action.
 * 클라이언트에서 useActionState와 함께 사용된다.
 * @param _prevState - 이전 폼 상태
 * @param formData - 제출된 폼 데이터 (name, email, message)
 * @returns 제출 결과 상태
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, message: "모든 필드를 입력해 주세요." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: "올바른 이메일 주소를 입력해 주세요." }
  }

  // TODO: 실제 이메일 전송 로직 구현 (Resend, SendGrid 등)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, message: "메시지가 성공적으로 전송되었습니다." }
}
