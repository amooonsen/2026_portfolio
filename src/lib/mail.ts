import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

interface SendContactMailParams {
  name: string
  email: string
  message: string
}

/**
 * 포트폴리오 연락 폼에서 수신된 메시지를 Gmail로 전송한다.
 * Gmail SMTP + App Password를 사용한다.
 */
export async function sendContactMail({ name, email, message }: SendContactMailParams) {
  await transporter.sendMail({
    from: `"포트폴리오 연락폼" <${process.env.GMAIL_USER}>`,
    to: "chonghocho72@gmail.com",
    replyTo: email,
    subject: `[포트폴리오] ${name}님의 연락`,
    text: `보낸 사람: ${name} (${email})\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #818cf8;">새로운 연락이 도착했습니다</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 80px;">이름</td>
            <td style="padding: 8px 12px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #666;">이메일</td>
            <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${message}</div>
      </div>
    `,
  })
}
