import {HeroSection} from "@/components/sections/hero-section";
import {HomeClient} from "@/components/home-client";
import {AboutHero} from "@/components/sections/about-hero";
import {Section} from "@/components/ui/section";
import {GlassCard} from "@/components/ui/glass-card";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {StaggerChildren} from "@/components/animation/stagger-children";
import {AxCapabilities} from "@/components/sections/ax-capabilities";
import {PageEndCelebration} from "@/components/sections/page-end-celebration";
import {philosophies} from "@/data/constants/home";

/**
 * 메인 페이지 컴포넌트.
 * 3D 우주 배경의 Hero 섹션, 소개 콘텐츠, 둘러보기 섹션을 표시한다.
 * 초기 로드 시 인트로 로딩 화면을 표시한다.
 */
export default function Home() {
  return (
    <HomeClient>
      <HeroSection
        title="Welecome to AX FORCE!"
        subtitle="조경문 매니저"
        description="전(?) UX Group, 현 Ax Force 조경문 매니저 입니다.<br/> 4년 조금 넘게 웹 프로그래밍을 하고 있습니다.<br/> Claude Code, Antigravity 등 AI 도구를 실무에 적극 활용하여<br/> 개발 생산성과 코드 품질을 동시에 높이고 있습니다."
        ctaLabel="View Projects"
        ctaHref="/projects"
        secondaryLabel="My Journey"
        secondaryHref="/experience"
      />

      {/* 스크롤 리빌 텍스트 */}
      <AboutHero
        text="기술 선택에는 이유가 있어야 하고 코드는 레거시가 되어도 이해할 수 있어야 합니다.
              AI를 적극 활용하되 생성된 코드를 이해하고 검증하는 것이 개발자의 역할이라고 생각합니다.
              성능·유지보수성·확장성을 균형있게 고려하며, 팀과 함께 성장하는 개발 문화를 만드려 노력합니다."
      />

      {/* 팀 철학 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Philosophy
          </GradientText>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              <span className="text-accent-highlight font-mono">f(problem) = value</span>
              <br />
              우리는 현실의 문제를 입력받아{" "}
              <span className="text-accent-highlight">AI로 가속된 실제 결과물</span>을 출력하는
              팀입니다.
              <br />
              변수처럼 유연하게 움직이고, 함수처럼 명확한 결과를 만듭니다.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              기획·디자인·개발·자동화 — 영역을 가리지 않고{" "}
              <span className="text-accent-highlight">먼저 해보고, 작동하는 것으로 말합니다.</span>
              <br />
              AI를 도구가 아닌 동료로, 경험을 개인의 자산이 아닌 팀의 자산으로.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              AI는 우리를 대체하는 것이 아닌&nbsp;
              <span className="text-accent-highlight">이전에는 불가능했던 것을 가능하게 하는 증폭기</span>
              입니다.
              <br />
              단, <span className="text-accent-highlight">판단은 언제나 우리가 합니다.</span>
            </p>
          </FadeIn>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="AX FORCE 팀 철학"
        >
          {philosophies.map((item) => (
            <GlassCard key={item.title} padding="lg" hover tabIndex={0}>
              <span
                className="text-sm font-mono font-semibold text-accent-highlight"
                aria-label={`철학 ${item.number}`}
              >
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-4 space-y-2">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span
                      className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-indigo/60"
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </StaggerChildren>
      </Section>

      {/* AX 실행 방법론 */}
      <AxCapabilities />

      {/* 축하 애니메이션 — 최하단 */}
      <PageEndCelebration />
    </HomeClient>
  );
}
