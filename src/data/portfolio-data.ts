import type { Project } from "@/components/sections/project-card"
import type { TimelineItem } from "@/components/sections/experience-timeline"
import type { TechCategory } from "@/components/sections/tech-stack"
import type { BlogPost } from "@/components/sections/blog-card"

/* ─── 네비게이션 ─── */

export const navItems = [
  { label: "홈", href: "/" },
  { label: "소개", href: "/about" },
  { label: "프로젝트", href: "/projects" },
  { label: "경력", href: "/experience" },
  { label: "블로그", href: "/blog" },
  { label: "연락처", href: "/contact" },
]

/* ─── 프로젝트 ─── */

export const projects: Project[] = [
  {
    slug: "dashboard-platform",
    title: "대시보드 플랫폼",
    description:
      "실시간 데이터 시각화와 팀 협업을 위한 통합 대시보드. WebSocket 기반 실시간 업데이트와 드래그 앤 드롭 위젯 커스터마이징을 구현했습니다.",
    tags: ["Next.js", "TypeScript", "D3.js", "WebSocket"],
    featured: true,
    links: { github: "#", live: "#" },
  },
  {
    slug: "design-system",
    title: "디자인 시스템",
    description:
      "일관된 UI를 위한 사내 컴포넌트 라이브러리. Storybook 문서화와 자동 시각적 회귀 테스트를 포함합니다.",
    tags: ["React", "Storybook", "Tailwind CSS"],
    links: { github: "#" },
  },
  {
    slug: "ai-chatbot",
    title: "AI 챗봇",
    description:
      "자연어 처리 기반 고객 상담 자동화 서비스. RAG 파이프라인으로 도메인 특화 응답을 제공합니다.",
    tags: ["Python", "LangChain", "React"],
    links: { live: "#" },
  },
  {
    slug: "ecommerce-redesign",
    title: "이커머스 리디자인",
    description:
      "전환율 40% 향상을 이끈 UX 개선 프로젝트. A/B 테스트와 사용자 행동 분석 기반 데이터 드리븐 접근.",
    tags: ["Next.js", "Stripe", "Vercel"],
    links: { live: "#" },
  },
  {
    slug: "mobile-app",
    title: "모바일 앱",
    description:
      "React Native 크로스플랫폼 헬스케어 앱. 실시간 건강 데이터 추적 및 커뮤니티 기능.",
    tags: ["React Native", "Expo", "Firebase"],
    links: { github: "#", live: "#" },
  },
]

/* ─── 경력 ─── */

export const experiences: TimelineItem[] = [
  {
    company: "스타트업 A사",
    role: "시니어 프론트엔드 개발자",
    period: "2024 — 현재",
    description:
      "Next.js 기반 B2B SaaS 제품의 프론트엔드 아키텍처 설계 및 개발을 리드했습니다. 디자인 시스템 구축과 성능 최적화로 LCP를 40% 개선했습니다.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    company: "IT 기업 B사",
    role: "프론트엔드 개발자",
    period: "2022 — 2024",
    description:
      "React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발에 참여했습니다. CI/CD 파이프라인 구축과 테스트 자동화를 주도했습니다.",
    technologies: ["React", "TypeScript", "Redux", "Jest"],
  },
  {
    company: "에이전시 C사",
    role: "주니어 웹 개발자",
    period: "2021 — 2022",
    description:
      "다양한 클라이언트의 웹사이트와 랜딩 페이지를 개발했습니다. 반응형 디자인과 크로스 브라우저 호환성에 집중했습니다.",
    technologies: ["HTML", "CSS", "JavaScript", "Vue.js"],
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
      { name: "Tailwind CSS" },
      { name: "GSAP" },
      { name: "Three.js" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "Redis" },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
      { name: "AWS" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git" },
      { name: "Figma" },
      { name: "Storybook" },
      { name: "Vitest" },
      { name: "Playwright" },
    ],
  },
]

/* ─── 블로그 ─── */

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-16-deep-dive",
    title: "Next.js 16 딥다이브: 달라진 점과 마이그레이션 가이드",
    excerpt:
      "Next.js 16에서 변경된 주요 기능과 기존 프로젝트를 마이그레이션하는 방법을 정리합니다.",
    date: "2026-01-15",
    readingTime: "8분",
    tags: ["Next.js", "React"],
  },
  {
    slug: "gsap-scroll-animations",
    title: "GSAP ScrollTrigger로 스크롤 애니메이션 구현하기",
    excerpt:
      "GSAP의 ScrollTrigger 플러그인을 활용한 실전 스크롤 애니메이션 패턴을 소개합니다.",
    date: "2025-12-20",
    readingTime: "6분",
    tags: ["GSAP", "Animation"],
  },
  {
    slug: "accessible-web-components",
    title: "접근성을 고려한 웹 컴포넌트 설계",
    excerpt:
      "WCAG 2.1 기준을 만족하는 재사용 가능한 UI 컴포넌트를 설계하는 원칙과 실전 패턴.",
    date: "2025-11-10",
    readingTime: "10분",
    tags: ["Accessibility", "React"],
  },
]

/* ─── 연락처 ─── */

export const contactEmail = "hello@example.com"
