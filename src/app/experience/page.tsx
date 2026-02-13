import {Section} from "@/components/ui/section";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {ExperienceTabs} from "@/components/sections/experience-tabs";
import {experiences} from "@/data/portfolio-data";
import {journeyItems} from "@/data/constants/home";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Experience",
  description:
    "조경문의 4년 프론트엔드 개발 경력입니다. 삼성, 롯데, LG CNS 등 대형 고객사 프로젝트 경험을 확인하세요.",
  path: "/experience",
});

/**
 * Experience 페이지.
 * Career(회사 경력)와 Journey(개발 여정)를 탭으로 나누어 표시한다.
 */
export default function ExperiencePage() {
  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h1" gradient="primary" className="text-3xl font-bold">
          Experience
        </GradientText>
        <FadeIn delay={0.3}>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            <span className="text-accent-highlight">Next.js, TypeScript, React</span>를 기반으로
            엔터프라이즈급 웹 애플리케이션을 구축합니다.
            <br /> <span className="text-accent-highlight">React Hook Form + Zod</span>로
            타입 안전한 폼 시스템을 설계하고,{" "}
            <span className="text-accent-highlight">GSAP</span>과{" "}
            <span className="text-accent-highlight">Chart.js</span>로 인터랙션과 데이터를
            시각화합니다.
            <br />{" "}
            <span className="text-accent-highlight">Claude Code, Cursor</span> 등 AI 도구를
            적극 활용하여 코드 생성부터 리팩토링, 디버깅까지 개발 전 과정의 생산성을 높이고 있습니다.
          </p>
        </FadeIn>
      </FadeIn>

      <ExperienceTabs experiences={experiences} journeyItems={journeyItems} />
    </Section>
  );
}
