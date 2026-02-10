import type { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { TechStack } from "@/components/sections/tech-stack"
import { AboutHero } from "@/components/sections/about-hero"
import { SkillBars } from "@/components/sections/skill-bars"
import { techCategories } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "소개",
}

const philosophies = [
  {
    number: "01",
    title: "사용자 중심 설계",
    description:
      "기술보다 사용자를 먼저 생각합니다. 모든 인터페이스는 사용자가 목적을 달성하는 데 집중할 수 있도록 직관적이어야 합니다. 접근성과 사용성을 기반으로 한 설계를 추구합니다.",
    details: [
      "WCAG 2.1 AA 기준 접근성 준수",
      "사용자 여정 기반 UI 설계",
      "키보드 네비게이션, 스크린 리더 지원",
    ],
  },
  {
    number: "02",
    title: "견고한 코드",
    description:
      "읽기 쉽고 유지보수 가능한 코드를 추구합니다. TypeScript의 타입 안전성, 충분한 테스트 커버리지, 일관된 코딩 컨벤션으로 팀 전체의 생산성을 높입니다.",
    details: [
      "TypeScript strict mode 기반 타입 안전성",
      "단위·통합·E2E 테스트 자동화",
      "ESLint, Prettier로 일관된 컨벤션 유지",
    ],
  },
  {
    number: "03",
    title: "성능 최적화",
    description:
      "빠른 로딩과 부드러운 인터랙션은 좋은 사용자 경험의 기본입니다. Core Web Vitals를 기준으로 측정 가능한 성능 개선을 추구하며, 번들 사이즈와 렌더링 최적화에 집중합니다.",
    details: [
      "코드 스플리팅과 Lazy loading 전략",
      "이미지 최적화 (WebP/AVIF, 반응형)",
      "Lighthouse 기반 정량적 성능 관리",
    ],
  },
  {
    number: "04",
    title: "디자인 시스템",
    description:
      "일관된 사용자 경험의 기반은 체계적인 디자인 시스템입니다. 재사용 가능한 컴포넌트와 토큰 기반 스타일링으로 개발 속도와 디자인 일관성을 동시에 달성합니다.",
    details: [
      "Atomic Design 기반 컴포넌트 계층 설계",
      "디자인 토큰으로 색상·타이포·간격 표준화",
      "Storybook 기반 컴포넌트 문서화와 시각 테스트",
    ],
  },
  {
    number: "05",
    title: "협업과 소통",
    description:
      "좋은 코드는 혼자 만들 수 없습니다. 명확한 코드 리뷰, 기술 문서 작성, 디자이너와의 원활한 소통으로 팀의 시너지를 극대화합니다. 지식 공유를 통해 함께 성장합니다.",
    details: [
      "PR 기반 코드 리뷰 문화 정착",
      "ADR(Architecture Decision Records) 운영",
      "디자인-개발 핸드오프 프로세스 최적화",
    ],
  },
  {
    number: "06",
    title: "지속적 학습",
    description:
      "빠르게 변화하는 프론트엔드 생태계에서 새로운 기술과 패턴을 꾸준히 학습합니다. 실무에 적용 가능한 기술을 선별하여 팀에 공유하고 함께 성장합니다.",
    details: [
      "기술 블로그 운영과 사내 세미나 발표",
      "오픈소스 프로젝트 기여 및 분석",
      "새로운 프레임워크와 도구 PoC 수행",
    ],
  },
]

const skillsLeft = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "CSS / Tailwind CSS", level: 92 },
  { name: "애니메이션 (GSAP / Framer Motion)", level: 85 },
]

const skillsRight = [
  { name: "테스트 (Vitest / Playwright)", level: 80 },
  { name: "성능 최적화", level: 88 },
  { name: "접근성 (WCAG)", level: 78 },
  { name: "백엔드 연동 (REST / GraphQL)", level: 75 },
]

const journeyItems = [
  {
    year: "2021",
    title: "첫 발걸음",
    description:
      "에이전시에서 다양한 클라이언트 프로젝트를 경험하며 웹 개발의 기초를 다졌습니다. HTML, CSS, JavaScript부터 Vue.js까지 빠르게 성장했습니다.",
  },
  {
    year: "2022",
    title: "React 생태계",
    description:
      "React와 TypeScript를 주력으로 전환하며 대규모 SPA 개발에 참여했습니다. 컴포넌트 설계, 상태 관리, 테스트 자동화의 중요성을 깨달았습니다.",
  },
  {
    year: "2023",
    title: "풀스택 확장",
    description:
      "React Native로 모바일 앱 개발 경험을 쌓고, 디자인 시스템 구축을 주도했습니다. Storybook 기반 컴포넌트 문서화 체계를 수립했습니다.",
  },
  {
    year: "2024",
    title: "깊이 있는 성장",
    description:
      "프론트엔드 아키텍처 설계에 적극적으로 참여하고 있습니다. 성능 최적화, 인터랙티브 웹, 3D 그래픽스에 깊이를 더하며 기술적 영향력을 넓히고 있습니다.",
  },
]

/**
 * 소개 페이지.
 * 스크롤 리빌 히어로, 자기소개, 여정, 개발 철학, 스킬바, 기술 스택을 포함한다.
 */
export default function AboutPage() {
  return (
    <>
      {/* 스크롤 리빌 텍스트 */}
      <AboutHero text="안녕하세요, 조경문입니다. 사용자의 경험을 최우선으로 생각하는 프론트엔드 개발자입니다. 세밀한 인터랙션과 최적화된 성능으로 웹의 가능성을 확장합니다." />

      {/* 자기소개 */}
      <Section spacing="lg" container>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FadeIn>
              <GradientText
                as="h2"
                gradient="primary"
                className="text-3xl font-bold"
              >
                About Me
              </GradientText>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                안녕하세요, <span className="text-indigo-400 font-medium">4년차 프론트엔드 개발자</span> 조경문입니다.
                에이전시에서 시작하여 IT 기업, 스타트업까지 다양한
                환경에서 웹 애플리케이션을 설계하고 개발해 왔습니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                <span className="text-indigo-400 font-medium">React</span>와 <span className="text-indigo-400 font-medium">Next.js</span>를 주력으로, TypeScript와 Tailwind CSS로 타입
                안전하고 일관된 UI를 구축합니다. <span className="text-indigo-400 font-medium">GSAP</span>과 <span className="text-indigo-400 font-medium">Three.js</span>를 활용한
                인터랙티브 웹 경험 제작에도 깊은 관심을 갖고 있습니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                현재는 B2B SaaS 제품의 프론트엔드 개발에 참여하며,
                <span className="text-indigo-400 font-medium"> 디자인 시스템 구축</span>과 <span className="text-indigo-400 font-medium">성능 최적화</span>에 집중하고 있습니다.
                개발 생산성을 높이는 도구와 워크플로우를 설계하는 것을
                즐깁니다.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <GlassCard padding="lg" className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Info</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { dt: "역할", dd: "프론트엔드 개발자" },
                    { dt: "경력", dd: "4년+" },
                    { dt: "위치", dd: "서울, 대한민국" },
                    { dt: "관심 분야", dd: "인터랙티브 웹, 성능" },
                    { dt: "학력", dd: "컴퓨터공학 전공" },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex justify-between">
                      <dt className="text-muted-foreground">{dt}</dt>
                      <dd className="font-medium text-white">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 개발 여정 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText
            as="h2"
            gradient="primary"
            className="text-3xl font-bold"
          >
            Journey
          </GradientText>
          <p className="mt-2 text-white/60">
            프론트엔드 개발자로서의 성장 과정입니다.
          </p>
        </FadeIn>

        <div className="relative mt-10">
          <div className="space-y-0">
            {journeyItems.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className="group relative grid gap-4 border-l border-white/10 py-8 pl-8 md:grid-cols-5 md:gap-8">
                  {/* 타임라인 도트 */}
                  <div className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full border-2 border-indigo-400/60 bg-background transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-400/20" />

                  <div className="md:col-span-1">
                    <span className="text-sm font-mono font-medium text-indigo-400">
                      {item.year}
                    </span>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {item.title}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 개발 철학 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText
            as="h2"
            gradient="primary"
            className="text-3xl font-bold"
          >
            Philosophy
          </GradientText>
          <p className="mt-2 text-white/60">
            개발할 때 가장 중요하게 생각하는 가치들입니다.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophies.map((item) => (
            <GlassCard key={item.title} padding="lg" hover>
              <span className="text-sm font-mono font-semibold text-indigo-400">
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
              <ul className="mt-4 space-y-2">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2 text-xs text-white/60"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo-400/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </StaggerChildren>
      </Section>

      {/* 핵심 역량 */}
      <Section spacing="lg" container>
        <FadeIn>
          <GradientText
            as="h2"
            gradient="primary"
            className="text-3xl font-bold"
          >
            Core Skills
          </GradientText>
          <p className="mt-2 text-white/60">
            주요 기술 역량과 숙련도입니다.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <FadeIn>
            <SkillBars skills={skillsLeft} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <SkillBars skills={skillsRight} />
          </FadeIn>
        </div>
      </Section>

      {/* 기술 스택 */}
      <TechStack categories={techCategories} />
    </>
  )
}
