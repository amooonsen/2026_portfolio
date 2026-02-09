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

/* ─── 경력 ─── */

export const experiences: TimelineItem[] = [
  {
    company: "에이전시 C사",
    role: "주니어 웹 개발자",
    period: "2021 — 2022",
    year: 2021,
    description:
      "다양한 클라이언트의 웹사이트와 랜딩 페이지를 개발했습니다. 반응형 디자인과 크로스 브라우저 호환성에 집중했습니다.",
    technologies: ["HTML", "CSS", "JavaScript", "Vue.js"],
  },
  {
    company: "IT 기업 B사",
    role: "프론트엔드 개발자",
    period: "2022 — 2024",
    year: 2022,
    description:
      "React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발에 참여했습니다. CI/CD 파이프라인 구축과 테스트 자동화를 주도했습니다.",
    technologies: ["React", "TypeScript", "Redux", "Jest"],
  },
  {
    company: "스타트업 A사",
    role: "시니어 프론트엔드 개발자",
    period: "2024 — 현재",
    year: 2024,
    description:
      "Next.js 기반 B2B SaaS 제품의 프론트엔드 아키텍처 설계 및 개발을 리드했습니다. 디자인 시스템 구축과 성능 최적화로 LCP를 40% 개선했습니다.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
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

/* ─── 연락처 ─── */

export const contactEmail = "hello@example.com"
