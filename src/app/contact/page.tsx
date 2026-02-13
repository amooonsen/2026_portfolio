import {ContactSection} from "@/components/sections/contact-section";
import {contactEmail} from "@/data/portfolio-data";
import {socials} from "@/data/socials";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "조경문에게 연락하세요. 프로젝트 문의, 협업 제안, 채용 문의 등을 기다립니다.",
  path: "/contact",
});

/**
 * Contact 페이지.
 * 문의 폼과 소셜 링크를 표시한다.
 */
export default function ContactPage() {
  return <ContactSection email={contactEmail} socials={socials} />;
}
