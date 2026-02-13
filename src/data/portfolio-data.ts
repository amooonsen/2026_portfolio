import type {TimelineItem} from "@/components/sections/experience-timeline";
import type {TechCategory} from "@/components/sections/tech-stack";

/* ─── 네비게이션 ─── */

export const navItems = [
  {label: "홈", href: "/"},
  {label: "프로젝트", href: "/projects"},
  {label: "경력", href: "/experience"},
  // { label: "블로그", href: "https://blog.example.com", external: true },
  {label: "연락처", href: "/contact"},
];

/* ─── 경력 (최신순, 핵심 스텝만 노출) ─── */

export const experiences: TimelineItem[] = [
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2025.08 — 2026.02",
    year: 2025,
    description:
      "대규모 채용 솔루션 프로젝트의 프론트엔드 아키텍처를 설계하고 개발을 리드했습니다. 레거시 시스템 마이그레이션과 성능 최적화를 주도하며, 기술적 의사결정의 전 과정을 수행했습니다.",
    achievements: [
      "프론트엔드 기술 스택 선정 및 아키텍처 설계를 주도하여 팀 개발 생산성 향상",
      "Core Web Vitals 최적화 전략을 수립·실행하여 LCP 2000ms 이하, INP 150ms 이하 달성",
      "400+ 폼 필드 규모의 렌더링 최적화로 사용자 체감 성능 대폭 개선",
      "레거시 인증 시스템을 React 기반으로 마이그레이션하여 유지보수성과 안정성 확보",
      "React Hook Form + Zod 기반 폼 검증 체계를 설계하여 타입 안전성과 개발 속도 동시 확보",
    ],
    technologies: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Zustand"],
  },
  {
    company: "주식회사이트라이브",
    role: "FE & BE 개발 매니저",
    period: "2024.08 — 2026.02",
    year: 2024,
    description:
      "사내 스타트업의 FE/BE 전체를 리드하며, 기술 아키텍처 설계부터 고객사 대응까지 End-to-End로 담당했습니다. 대형 고객사 수주에 기술적 근거를 제공하는 역할을 수행했습니다.",
    achievements: [
      "프로젝트 전체 기술 스택 선정 및 FE/BE 아키텍처를 설계하고 팀을 리드",
      "Next.js 기반 대시보드 컴포넌트 아키텍처 설계 및 상태 관리 전략 수립",
      "n8n 워크플로우 + AI Agent 자동화 파이프라인을 구축하여 수작업 데이터 처리 제거",
      "고객사(삼성·롯데) 대상 기술 데모 및 제안서의 기술 파트를 담당하여 수주에 기여",
      "Supabase + Fastify 기반 백엔드를 설계하여 프론트엔드와의 일관된 타입 인터페이스 확보",
    ],
    technologies: ["Next.js", "TypeScript", "Zustand", "Supabase", "Fastify", "n8n"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2023.02 — 2023.12",
    year: 2023,
    description:
      "크로스 플랫폼 웹뷰 프로젝트의 프론트엔드 전체를 담당했습니다. 네이티브 앱과의 통신 인터페이스를 설계하고, iOS/Android 양 플랫폼에서의 일관된 사용자 경험을 확보했습니다.",
    achievements: [
      "웹뷰-네이티브 통신 인터페이스를 설계하여 안정적인 양방향 데이터 교환 구현",
      "iOS/Android 크로스 플랫폼 호환성 이슈를 분석하고 해결하여 전 플랫폼 일관된 UX 제공",
      "Chart.js 기반 데이터 시각화 컴포넌트를 설계하여 복잡한 관리비 데이터를 직관적으로 표현",
      "Lottie.js 마이크로 인터랙션 도입으로 네이티브 앱에 준하는 UI 반응성 확보",
    ],
    technologies: ["Vue.js", "Vuex", "Chart.js", "Lottie.js", "Axios"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 및 퍼블리싱 매니저",
    period: "2022.01 — 2023.01",
    year: 2022,
    description:
      "다수의 엔터프라이즈 고객사 프로젝트를 동시에 수행하며 프론트엔드 개발과 기술 리드를 담당했습니다. 레거시 코드 개선, 접근성 인증, 커스텀 인터랙션 엔진 개발 등 프로젝트별 핵심 기술 과제를 해결했습니다.",
    achievements: [
      "웹 접근성(WCAG 2.1) 적용을 주도하여 접근성 인증 마크 획득에 기여",
      "레거시 코드 리팩토링과 비즈니스 로직 모듈화로 코드 유지보수성을 개선하고 이탈률 15% 감소",
      "Lottie.js 도입을 제안·실행하여 애니메이션 리소스 70% 절감, 로딩 성능 향상",
      "Lerp 기반 스무스 스크롤 엔진을 자체 설계하여 60fps 렌더링 최적화 달성",
      "GSAP ScrollTrigger 활용 인터랙션 구현으로 사이트 체류 시간 및 사용자 경험 개선",
    ],
    technologies: ["JavaScript", "GSAP", "Lottie.js", "jQuery", "AngularJS", "SCSS"],
  },
  {
    company: "주식회사이트라이브",
    role: "UI 스크립트 매니저",
    period: "2021.10 — 2021.12",
    year: 2021,
    description:
      "입사 후 첫 프로젝트로 금융 데이터 시각화와 웹 접근성 인증을 담당했습니다. 복잡한 데이터를 사용자 친화적으로 시각화하는 역할을 수행하며 프론트엔드 기초 역량을 다졌습니다.",
    achievements: [
      "5종 이상의 데이터 시각화 차트를 설계·구현하여 복잡한 금융 데이터를 직관적으로 표현",
      "WCAG 2.1 포커스 트랩 이슈를 분석·해결하여 웹 접근성 인증 마크 획득",
      "TreeMap 차트 설계로 ETF 포트폴리오 구성을 계층적으로 시각화",
    ],
    technologies: ["JavaScript", "Amcharts4", "SCSS", "WAI-ARIA"],
  },
];

/* ─── 기술 스택 ─── */

export const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      {name: "React"},
      {name: "Next.js"},
      {name: "TypeScript"},
      {name: "JavaScript"},
      {name: "Vue.js"},
      {name: "HTML5"},
      {name: "CSS"},
      {name: "Tailwind CSS"},
      {name: "SCSS"},
    ],
  },
  {
    name: "State & Form",
    items: [
      {name: "Zustand"},
      {name: "React Hook Form"},
      {name: "Zod"},
      {name: "React Query"},
      {name: "Vuex"},
    ],
  },
  {
    name: "Animation & Visualization",
    items: [
      {name: "GSAP"},
      {name: "Lottie.js"},
      {name: "Amcharts"},
      {name: "Chart.js"},
      {name: "Three.js"},
    ],
  },
  {
    name: "Backend & Infra",
    items: [
      {name: "Supabase"},
      {name: "Fastify"},
      {name: "n8n"},
      {name: "GitLab CI/CD"},
      {name: "AWS"},
      {name: "Sentry"},
    ],
  },
  {
    name: "Tools",
    items: [{name: "Git"}, {name: "GitHub"}, {name: "GitLab"}, {name: "Figma"}, {name: "WAI-ARIA"}],
  },
];

/* ─── 연락처 ─── */

export const contactEmail = "chonghocho72@gmail.com";
