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
import {philosophies, journeyItems} from "@/data/constants/home";

/**
 * 메인 페이지 컴포넌트.
 * 3D 우주 배경의 Hero 섹션, 소개 콘텐츠, 둘러보기 섹션을 표시한다.
 * 초기 로드 시 인트로 로딩 화면을 표시한다.
 */
export default function Home() {
  return (
    <HomeClient>
      <HeroSection
        title="Frontend Developer"
        subtitle="조경문"
        description="비즈니스 문제를 기술로 해결하는 4년차 프론트엔드 개발자입니다. React, Next.js, TypeScript를 기반으로 대규모 엔터프라이즈 웹 애플리케이션을 설계하고 구축합니다. 성능 최적화, 컴포넌트 아키텍처, UI 개발 및 시각화에 강점을 가지고 있습니다."
        ctaLabel="프로젝트 보기"
        ctaHref="/projects"
        secondaryLabel="연락하기"
        secondaryHref="/contact"
      />

      {/* 스크롤 리빌 텍스트 */}
      <AboutHero
        text="기술 선택에는 이유가 있어야 하고, 코드는 6개월 후에도 이해할 수 있어야 합니다. 
성능·유지보수성·확장성을 균형있게 고려하며, 팀과 함께 성장하는 개발 문화를 만듭니다."
      />

      {/* 자기소개 */}
      <Section spacing="lg" container>
        <article className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FadeIn>
              <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
                About Me
              </GradientText>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                4년간 프론트엔드 개발을 하며 한 가지 확신을 얻었습니다.
                <span className="text-indigo-400 font-medium">
                  {" "}
                  좋은 코드는 6개월 후에도 이해할 수 있어야 한다
                </span>
                는 것입니다. 그래서 저는 단순히 기능을 구현하는 것이 아니라,
                <span className="text-indigo-400 font-medium">
                  {" "}
                  확장 가능하고 유지보수하기 쉬운 아키텍처
                </span>
                를 설계하는 데 집중합니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                <span className="text-indigo-400 font-medium">삼성, 롯데, LG CNS</span> 프로젝트에서
                프론트엔드를 리드하며 측정 가능한 성과를 만들었습니다.
              </p>
              <ul className="mt-3 space-y-2 text-lg text-white/80">
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                    aria-hidden="true"
                  />
                  이미지 최적화로{" "}
                  <span className="text-indigo-400 font-medium">LCP 2.1초 개선</span> (3.8s → 1.7s)
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                    aria-hidden="true"
                  />
                  코드 스플리팅으로{" "}
                  <span className="text-indigo-400 font-medium">초기 로딩 35% 단축</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                    aria-hidden="true"
                  />
                  <span className="text-indigo-400 font-medium">400+ 필드 폼 시스템</span> 설계로
                  개발 시간 50% 단축
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                <span className="text-indigo-400 font-medium">Next.js, TypeScript, React</span>를
                기반으로 엔터프라이즈급 웹 애플리케이션을 구축합니다. React Hook Form + Zod로 타입
                안전한 폼 시스템을 설계하고, Zustand로 복잡한 상태를 관리하며, Amcharts로 금융
                데이터를 시각화해왔습니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                기술적 의사결정뿐만 아니라{" "}
                <span className="text-indigo-400 font-medium">팀과 함께 성장하는 것</span>을
                중요하게 생각합니다. 코드 리뷰 문화를 정착시키고, 기술 문서를 체계화하며, 주니어
                개발자의 멘토로 활동하고 있습니다. 개발자는 코드만 작성하는 사람이 아니라,
                <span className="text-indigo-400 font-medium">
                  문제를 해결하고 가치를 만드는 사람
                </span>
                이라고 믿습니다.
              </p>
            </FadeIn>
          </div>

          <aside className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <GlassCard padding="lg" className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Info</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    {dt: "역할", dd: "Frontend Developer"},
                    {dt: "경력", dd: "4년 (2021~)"},
                    {dt: "소속", dd: "주식회사이트라이브"},
                    {dt: "핵심역량", dd: "설계·성능·협업"},
                    {dt: "주요성과", dd: "LCP 40%↓, 폼시스템 설계"},
                  ].map(({dt, dd}) => (
                    <div key={dt} className="flex justify-between">
                      <dt className="text-muted-foreground">{dt}</dt>
                      <dd className="font-medium text-white">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </FadeIn>
          </aside>
        </article>
      </Section>

      {/* 개발 여정 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Journey
          </GradientText>
          <p className="mt-2 text-white/60">프론트엔드 개발자로서의 성장 과정입니다.</p>
        </FadeIn>

        <div className="relative mt-10" role="list" aria-label="개발 여정">
          <div className="space-y-0">
            {journeyItems.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <article
                  className="group relative grid gap-4 border-l border-white/10 py-8 pl-8 md:grid-cols-5 md:gap-8"
                  role="listitem"
                >
                  <div
                    className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full border-2 border-indigo-400/60 bg-background transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-400/20"
                    aria-hidden="true"
                  />

                  <div className="md:col-span-1">
                    <time className="text-sm font-mono font-medium text-indigo-400">
                      {item.year}
                    </time>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 개발 철학 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Philosophy
          </GradientText>
          <p className="mt-2 text-white/60">개발할 때 가장 중요하게 생각하는 가치들입니다.</p>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="개발 철학"
        >
          {philosophies.map((item) => (
            <GlassCard key={item.title} padding="lg" hover>
              <span
                className="text-sm font-mono font-semibold text-indigo-400"
                aria-label={`철학 ${item.number}`}
              >
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-xs text-white/60">
                    <span
                      className="mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo-400/60"
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
