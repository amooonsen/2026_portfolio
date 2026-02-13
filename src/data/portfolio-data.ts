import type {TimelineItem} from "@/components/sections/experience-timeline";
import type {TechCategory} from "@/components/sections/tech-stack";

/* ─── 네비게이션 ─── */

export const navItems = [
  {label: "홈", href: "/"},
  {label: "프로젝트", href: "/projects"},
  {label: "Experience", href: "/experience"},
  // { label: "블로그", href: "https://blog.example.com", external: true },
  {label: "Contact", href: "/contact"},
];

/* ─── 경력 (회사 단위 — 입사·현재 2장 카드) ─── */

export const experiences: TimelineItem[] = [
  {
    company: "주식회사이트라이브",
    role: "프론트엔드 개발 매니저",
    period: "2021.10 — 현재",
    year: 2026,
    description:
      "입사 이후 프론트엔드 개발자로 시작하여 FE/BE 개발 매니저로 성장했습니다. 삼성, 롯데, LG CNS 등 대형 고객사 프로젝트의 기술 리드와 아키텍처 설계를 담당하고 있습니다.",
    achievements: [
      "프론트엔드 기술 스택 선정 및 아키텍처 설계 주도",
      "Core Web Vitals 최적화 — LCP 2000ms 이하, INP 150ms 이하 달성",
      "400+ 폼 필드 규모의 대규모 시스템 렌더링 최적화",
      "n8n + AI Agent 자동화 파이프라인 구축으로 운영 효율화",
      "삼성·롯데 등 대형 고객사 기술 데모 및 수주 기여",
    ],
    technologies: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Zustand", "Supabase"],
  },
  {
    company: "주식회사이트라이브",
    role: "UI 스크립트 매니저",
    period: "2021.10",
    year: 2021,
    description:
      "금융 데이터 시각화와 웹 접근성 인증 프로젝트를 시작으로, 프론트엔드 개발자로서의 여정을 시작했습니다.",
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

/* ─── Contact ─── */

export const contactEmail = "chonghocho72@gmail.com";
