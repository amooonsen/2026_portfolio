import {Section} from "@/components/ui/section";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {ContactForm} from "@/components/sections/contact-section";
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
      <FadeIn>
        <div className="text-center">
          <GradientText as="h1" gradient="accent" className="text-3xl font-bold">
            Get in Touch
          </GradientText>
          <FadeIn delay={0.2}>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              <span className="text-accent-highlight">채용 문의</span>,{" "}
              <span className="text-accent-highlight">협업 제안</span>, 기술적인 대화까지 — 어떤
              주제든 편하게 남겨주세요.
              <br />
              소속과 직위를 함께 적어주시면 더 빠르고 정확하게 답변드리겠습니다.
            </p>
          </FadeIn>
        </div>
      </FadeIn>

      <ContactForm />
    </Section>
  );
}
