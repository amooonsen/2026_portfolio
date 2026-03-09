import type {TechCategory} from "@/components/sections/tech-stack";

/* ─── 네비게이션 ─── */

export const navItems = [{label: "Experience", href: "/experience"}];

/* ─── AX 역량 스펙트럼 ─── */

export const techCategories: TechCategory[] = [
  {
    name: "기획 & 발굴",
    items: [
      {name: "Notion"},
      {name: "FigJam"},
      {name: "Miro"},
      {name: "ChatGPT"},
      {name: "Perplexity"},
      {name: "Claude"},
    ],
  },
  {
    name: "디자인 & 프로토타입",
    items: [
      {name: "Figma"},
      {name: "v0"},
      {name: "Midjourney"},
      {name: "DALL-E"},
      {name: "Framer"},
    ],
  },
  {
    name: "프론트엔드 개발",
    items: [
      {name: "React"},
      {name: "Next.js"},
      {name: "TypeScript"},
      {name: "Vue.js"},
      {name: "Tailwind CSS"},
      {name: "GSAP"},
      {name: "Three.js"},
    ],
  },
  {
    name: "AI & 자동화",
    items: [
      {name: "Claude Code"},
      {name: "Antigravity"},
      {name: "GitHub Copilot"},
      {name: "Cursor"},
      {name: "n8n"},
      {name: "GitHub Actions"},
    ],
  },
  {
    name: "데이터 & 시각화",
    items: [
      {name: "Amcharts"},
      {name: "Chart.js"},
      {name: "Lottie.js"},
      {name: "Supabase"},
      {name: "Fastify"},
    ],
  },
  {
    name: "협업 & 운영",
    items: [
      {name: "Git / GitHub"},
      {name: "GitLab CI/CD"},
      {name: "Sentry"},
      {name: "AWS"},
      {name: "Confluence"},
    ],
  },
];
