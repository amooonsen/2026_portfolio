import type {Metadata} from "next";
import {Section} from "@/components/ui/section";
import {GlassCard} from "@/components/ui/glass-card";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {StaggerChildren} from "@/components/animation/stagger-children";
import {TechStack} from "@/components/sections/tech-stack";
import {AboutHero} from "@/components/sections/about-hero";
import {SkillBars} from "@/components/sections/skill-bars";
import {techCategories} from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: "소개",
};

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
];

const skillsLeft = [
  {name: "React / Next.js", level: 95},
  {name: "TypeScript / JavaScript", level: 92},
  {name: "Vue.js", level: 80},
  {name: "CSS / Tailwind CSS / SCSS", level: 90},
];

const skillsRight = [
  {name: "인터랙션 (GSAP / Lottie.js)", level: 88},
  {name: "데이터 시각화 (Amcharts / Chart.js)", level: 85},
  {name: "성능 최적화 (Core Web Vitals)", level: 90},
  {name: "웹 접근성 (WCAG 2.1)", level: 82},
];

const journeyItems = [
  {
    year: "2021",
    title: "입사 & 데이터 시각화",
    description:
      "이트라이브에 입사하여 RISE ETF 데이터 시각화 프로젝트를 담당했습니다. Amcharts로 5종 이상의 차트를 설계하고, WCAG 2.1 가이드라인을 적용하여 웹 접근성 인증 마크를 획득했습니다.",
  },
  {
    year: "2022",
    title: "엔터프라이즈 프로젝트",
    description:
      "메리츠화재, 호텔롯데, 삼성카드, 이트라이브 자사 홈페이지 등 대형 고객사 프로젝트를 연달아 수행했습니다. GSAP, Lottie.js 기반 인터랙션 구현과 레거시 코드 리팩토링 경험을 쌓았고, Lerp 기반 스무스 스크롤 엔진을 직접 설계했습니다.",
  },
  {
    year: "2023",
    title: "웹뷰 & 크로스 플랫폼",
    description:
      "래미안 홈플랫폼 홈닉의 Vue.js 기반 웹뷰를 개발하며 네이티브 앱과의 통신 인터페이스를 구축했습니다. Chart.js로 관리비 데이터를 시각화하고, iOS/Android 크로스 플랫폼 호환성을 확보했습니다.",
  },
  {
    year: "2024",
    title: "FE 리드 & AI 솔루션",
    description:
      "KPMG, FunETF 등 프로젝트와 함께, 사내 스타트업 AI CARAMEL의 FE/BE를 리드하여 삼성·롯데 대상 AI 분석 통합 솔루션을 개발했습니다. ThunderJob 채용 플랫폼도 기획부터 배포까지 End-to-End로 리딩했습니다.",
  },
  {
    year: "2025",
    title: "성능 최적화 전문성",
    description:
      "LG CNS 채용 솔루션 고도화 프로젝트에서 Core Web Vitals 최적화(LCP 2000ms 이하, INP 150ms 이하)를 달성하고, 400+ 폼 필드 렌더링 최적화를 수행하며 대규모 시스템에서의 성능 전문성을 심화하고 있습니다.",
  },
];

/**
 * 소개 페이지.
 * 스크롤 리빌 히어로, 자기소개, 여정, 개발 철학, 스킬바, 기술 스택을 포함한다.
 */
export default function AboutPage() {
  return (
    <>
      {/* 스크롤 리빌 텍스트 */}
      <AboutHero text="안녕하세요, 조경문입니다. 4년 5개월간 대형 고객사 대상 프론트엔드 개발을 수행 및 리드하고 있습니다. Core Web Vitals 최적화와 인터랙션 UI로 정량적 성과를 만들어냅니다." />

      {/* 자기소개 */}
      <Section spacing="lg" container>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FadeIn>
              <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
                About Me
              </GradientText>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                안녕하세요,{" "}
                <span className="text-indigo-400 font-medium">4년 5개월차 프론트엔드 개발자</span>{" "}
                조경문입니다. 대형 고객사 대상{" "}
                <span className="text-indigo-400 font-medium">Next.js/React, TypeScript</span> 기반
                프론트엔드 개발을 수행 및 리드하고 있습니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                <span className="text-indigo-400 font-medium">Core Web Vitals 최적화</span>와 대규모
                폼 시스템 설계 등 정량적 성과를 달성해 왔으며,{" "}
                <span className="text-indigo-400 font-medium">GSAP/Lottie.js</span> 활용 인터랙션
                UI와 <span className="text-indigo-400 font-medium">Amcharts</span> 기반 금융 데이터
                시각화 경험이 있습니다.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                삼성, 롯데, LG CNS 등{" "}
                <span className="text-indigo-400 font-medium">엔터프라이즈 고객사</span>와의 직접
                대응 경험을 바탕으로, 현업 피드백을 신속히 반영하고 비즈니스 가치를 실현하는 개발을
                추구합니다. 레거시 환경 개선부터 AI 솔루션까지 다양한 도메인을 경험했습니다.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <GlassCard padding="lg" className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Info</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    {dt: "역할", dd: "FE Developer / 매니저"},
                    {dt: "경력", dd: "4년 5개월"},
                    {dt: "소속", dd: "주식회사이트라이브"},
                    {dt: "강점", dd: "성능 최적화, 인터랙션 UI"},
                    {dt: "학력", dd: "수원과학대학교 전자과"},
                  ].map(({dt, dd}) => (
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
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Journey
          </GradientText>
          <p className="mt-2 text-white/60">프론트엔드 개발자로서의 성장 과정입니다.</p>
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
                    <p className="mt-1 text-lg font-semibold text-white">{item.title}</p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-white/70 leading-relaxed">{item.description}</p>
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
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Philosophy
          </GradientText>
          <p className="mt-2 text-white/60">개발할 때 가장 중요하게 생각하는 가치들입니다.</p>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophies.map((item) => (
            <GlassCard key={item.title} padding="lg" hover>
              <span className="text-sm font-mono font-semibold text-indigo-400">{item.number}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-xs text-white/60">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo-400/60" />
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
    </>
  );
}
