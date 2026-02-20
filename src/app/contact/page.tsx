import {Fragment} from "react";
import {Section} from "@/components/ui/section";
import {ContactForm} from "@/components/sections/contact-section";
import {PageHeader, PageHeaderHighlight} from "@/components/sections/page-header";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "조경문에게 연락하세요. 프로젝트 문의, 협업 제안, 채용 문의 등을 기다립니다.",
  path: "/contact",
});

/**
 * Contact 페이지.
 * 헤딩은 Server Component에서 렌더링하고,
 * 폼은 ContactForm(Client Component)으로 분리한다.
 */
export default function ContactPage() {
  return (
    <Section spacing="lg" container containerSize="md">
      <PageHeader
        title="Get in Touch"
        description={[
          <Fragment key="line-1">
            <PageHeaderHighlight>채용 문의</PageHeaderHighlight>,{" "}
            <PageHeaderHighlight>협업 제안</PageHeaderHighlight>, 기술적인 대화까지 — 어떤 주제든
            편하게 남겨주세요.
          </Fragment>,
          <Fragment key="line-2">
            소속과 직위를 함께 적어주시면 더 빠르고 정확하게 답변드리겠습니다.
          </Fragment>,
        ]}
        className="text-center"
      />

      <ContactForm />
    </Section>
  );
}
