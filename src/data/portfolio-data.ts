import type { TimelineItem } from "@/components/sections/experience-timeline"
import type { TechCategory } from "@/components/sections/tech-stack"

/* ─── 네비게이션 ─── */

export const navItems = [
  { label: "홈", href: "/" },
  { label: "소개", href: "/about" },
  { label: "프로젝트", href: "/projects" },
  { label: "경력", href: "/experience" },
  { label: "블로그", href: "https://blog.example.com", external: true },
  { label: "연락처", href: "/contact" },
]

/* ─── 경력 (최신순) ─── */

export const experiences: TimelineItem[] = [
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2025.08 — 2026.02",
    year: 2025,
    description:
      "LG CNS 채용 솔루션 고도화 프로젝트의 프론트엔드 개발을 리드했습니다. 레거시 인증 시스템 마이그레이션과 대규모 폼 최적화를 수행했습니다.",
    achievements: [
      "레거시 인증 시스템(PASS, Nice 본인인증) React 마이그레이션",
      "Core Web Vitals 최적화 — LCP 2000ms 이하, INP 150ms 이하 달성",
      "400+ 채용 폼 필드 렌더링 최적화로 리렌더링 횟수 대폭 절감",
      "React Hook Form + Zod 기반 폼 검증 체계화 및 타입 안전성 확보",
    ],
    technologies: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Zustand"],
  },
  {
    company: "주식회사이트라이브",
    role: "FE & BE 개발 매니저",
    period: "2024.08 — 2026.02",
    year: 2024,
    description:
      "사내 스타트업 AI CARAMEL의 FE & BE 개발을 리드했습니다. 삼성, 롯데 등 대형 고객사 대상 AI 분석 통합 솔루션을 개발했습니다.",
    achievements: [
      "삼성·롯데 대상 AI Insight + 모니터링 + GA 분석 통합 솔루션 FE 리드",
      "n8n workflow + AI Agent 활용 자동화 데이터 처리 파이프라인 구축",
      "Next.js 기반 대시보드 및 분석 인터페이스 전체 설계·구현",
      "고객사 제안 수주 성공에 기술적 근거 및 데모 제공으로 기여",
    ],
    technologies: ["Next.js", "TypeScript", "Zustand", "Supabase", "Fastify", "n8n"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2024.10 — 2026.02",
    year: 2024,
    description:
      "해외인턴십 채용 매칭 플랫폼 ThunderJob의 기획부터 배포까지 End-to-End FE 개발을 리딩했습니다.",
    achievements: [
      "Next.js SSR/SSG 아키텍처 구축으로 SEO 최적화 및 초기 로딩 개선",
      "인턴/기업 회원 역할별 채용 프로세스 플로우 설계·구현",
      "Tosspayments 결제 모듈 연동 및 GitLab CI/CD 배포 자동화 구축",
      "Sentry 모니터링 도입 및 I18N 다국어 처리(ko, en)",
    ],
    technologies: ["Next.js", "TypeScript", "Zustand", "Sentry", "I18N", "GitLab CI/CD"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2024.01 — 2024.07",
    year: 2024,
    description:
      "삼정회계법인 KPMG 홈페이지 구축 및 삼성자산운용 FunETF 차트 시스템 리뉴얼을 담당했습니다.",
    achievements: [
      "KPMG: React + React Query + Zustand 기반 SPA 아키텍처 구축",
      "KPMG: 멀티 스텝 폼 및 무한 스크롤 게시판 구현",
      "FunETF: Amcharts5 기반 전체 차트 시스템 리뉴얼 및 레거시 마이그레이션",
      "FunETF: 대용량 데이터셋(1000+ 포인트) 렌더링 최적화",
    ],
    technologies: ["React", "React Query", "Zustand", "Amcharts5", "Tailwind CSS"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2023.02 — 2023.12",
    year: 2023,
    description:
      "래미안 홈플랫폼 통합앱 홈닉의 입주민 커뮤니티 웹뷰를 개발했습니다.",
    achievements: [
      "Vue.js 기반 웹뷰 전체 UI 개발 및 앱 내 핵심 기능 구현",
      "Chart.js 활용 관리비 에너지 차트 시각화",
      "LottieJS 마이크로 인터랙션으로 네이티브 앱 수준 UX 제공",
      "웹뷰-네이티브 통신 인터페이스 연동 및 크로스 플랫폼 호환성 확보",
    ],
    technologies: ["Vue.js", "Vuex", "Chart.js", "Lottie.js", "Axios"],
  },
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 및 퍼블리싱 매니저",
    period: "2022.01 — 2023.01",
    year: 2022,
    description:
      "삼성카드, 호텔롯데, 메리츠화재, 이트라이브 자사 등 다양한 엔터프라이즈 프로젝트의 프론트엔드를 담당했습니다.",
    achievements: [
      "호텔롯데: Lottie.js 도입으로 애니메이션 리소스 70% 절감, GSAP ScrollTrigger 가로 스크롤 구현",
      "메리츠화재: WCAG 2.1 적용 주도, 웹 접근성 인증 마크 획득",
      "삼성카드: 레거시 코드 리팩토링 및 비즈니스 로직 모듈화로 이탈률 15% 감소",
      "이트라이브: Lerp 기반 스무스 스크롤 엔진 자체 설계, 60fps 렌더링 최적화",
    ],
    technologies: ["JavaScript", "GSAP", "Lottie.js", "jQuery", "AngularJS", "SCSS"],
  },
  {
    company: "주식회사이트라이브",
    role: "UI 스크립트 매니저",
    period: "2021.10 — 2021.12",
    year: 2021,
    description:
      "RISE ETF 데이터 시각화 차트 개발 및 웹 접근성 인증 마크 획득 프로젝트를 담당했습니다.",
    achievements: [
      "Amcharts4 활용 5종 이상 데이터 시각화 차트 설계·구현",
      "WCAG 2.1 준수 포커스 트랩 해결, 웹 접근성 인증 마크 획득",
      "TreeMap 차트로 ETF 포트폴리오 계층적 시각화",
    ],
    technologies: ["JavaScript", "Amcharts4", "SCSS", "WAI-ARIA"],
  },
]

/* ─── 기술 스택 ─── */

export const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Vue.js" },
      { name: "HTML5" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "SCSS" },
    ],
  },
  {
    name: "State & Form",
    items: [
      { name: "Zustand" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "React Query" },
      { name: "Vuex" },
    ],
  },
  {
    name: "Animation & Visualization",
    items: [
      { name: "GSAP" },
      { name: "Lottie.js" },
      { name: "Amcharts" },
      { name: "Chart.js" },
      { name: "Three.js" },
    ],
  },
  {
    name: "Backend & Infra",
    items: [
      { name: "Supabase" },
      { name: "Fastify" },
      { name: "n8n" },
      { name: "GitLab CI/CD" },
      { name: "AWS" },
      { name: "Sentry" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "Figma" },
      { name: "WAI-ARIA" },
    ],
  },
]

/* ─── 연락처 ─── */

export const contactEmail = "chonghocho72@gmail.com"
