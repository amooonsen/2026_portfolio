import {ContactSection} from "@/components/sections/contact-section";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "조경문에게 연락하세요. 프로젝트 문의, 협업 제안, 채용 문의 등을 기다립니다.",
  path: "/contact",
});

/**
 * Contact 페이지.
 * 문의 폼을 표시한다.
 */
export default function ContactPage() {
  return <ContactSection />;
}
