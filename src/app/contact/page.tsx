import type { Metadata } from "next"
import { ContactSection } from "@/components/sections/contact-section"
import { contactEmail } from "@/data/portfolio-data"
import { socials } from "@/data/socials"

export const metadata: Metadata = {
  title: "연락처",
}

/**
 * 연락처 페이지.
 * 문의 폼과 소셜 링크를 표시한다.
 */
export default function ContactPage() {
  return <ContactSection email={contactEmail} socials={socials} />
}
