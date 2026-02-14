import {HeroSection} from "@/components/sections/hero-section";
import {HomeClient} from "@/components/home-client";
import {AboutHero} from "@/components/sections/about-hero";
import {Section} from "@/components/ui/section";
import {GlassCard} from "@/components/ui/glass-card";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {StaggerChildren} from "@/components/animation/stagger-children";
import {TechStack} from "@/components/sections/tech-stack";
import {PageEndCelebration} from "@/components/sections/page-end-celebration";
import {techCategories} from "@/data/portfolio-data";
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
        title="Crafting Interfaces That Matter"
        subtitle="개발자 조경문"
        description="문제를 정의하고, 기술로 해결합니다. React, Next.js, TypeScript 기반의 4년차 프론트엔드 개발자로서, 사용자 경험과 비즈니스 가치를 연결하는 인터페이스를 만듭니다."
        ctaLabel="프로젝트 보기"
        ctaHref="/projects"
        secondaryLabel="연락하기"
        secondaryHref="/contact"
      />
      {/* <HeroSection
        title="Frontend Developer"
        subtitle="조경문"
        description="비즈니스 문제를 기술로 해결하는 4년차 프론트엔드 개발자입니다. React, Next.js, TypeScript를 기반으로 대규모 엔터프라이즈 웹 애플리케이션을 설계하고 구축합니다. Claude Code, Antigravity 등 AI 도구를 실무에 적극 활용하여 개발 생산성과 코드 품질을 동시에 높이고 있습니다."
        ctaLabel="프로젝트 보기"
        ctaHref="/projects"
        secondaryLabel="연락하기"
        secondaryHref="/contact"
      /> */}

      {/* 스크롤 리빌 텍스트 */}
      <AboutHero
        text="기술 선택에는 이유가 있어야 하고, 코드는 레거시가 되어도 이해할 수 있어야 합니다.
              AI를 적극 활용하되, 생성된 코드를 이해하고 검증하는 것이 개발자의 역할이라고 생각합니다.
              성능·유지보수성·확장성을 균형있게 고려하며, 팀과 함께 성장하는 개발 문화를 만드려 노력합니다."
      />

      {/* 개발 철학 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Philosophy
          </GradientText>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              개발, 더 나아가 제품을 만들 때 가장 중요한 것은
              <span className="text-accent-highlight"> "왜?"라는 질문</span>이라고 생각합니다.
              <br /> 왜 이 라이브러리를 선택했는지, 왜 이 구조가 더 나은지. 기술 선택에 명확한
              이유가 있을 때,
              <br />
              <span className="text-accent-highlight"> 확장 가능하고 유지보수하기 쉬운 시스템</span>
              이 만들어집니다.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              기술적 의사결정뿐만 아니라{" "}
              <span className="text-accent-highlight">팀과 함께 성장하는 것</span>을 중요하게
              생각합니다.
              <br /> 코드 리뷰 문화를 정착시키고, 기술 문서를 체계화 하였습니다.
              <br />
              <span className="text-accent-highlight">
                AI는 개발자를 대체하는 것이 아니라, 더 본질적인 문제에 집중하게 해주는 도구
              </span>
              라고 생각합니다.
              <br />
              개발자는 코드만 작성하는 사람이 아니라,
              <span className="text-accent-highlight">문제를 해결하고 가치를 만드는 사람</span>
              이라고 믿습니다.
            </p>
          </FadeIn>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="개발 철학"
        >
          {philosophies.map((item) => (
            <GlassCard key={item.title} padding="lg" hover>
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

      {/* 기술 스택 */}
      <TechStack categories={techCategories} />

      {/* 축하 애니메이션 — 최하단 */}
      <PageEndCelebration />
    </HomeClient>
  );
}
