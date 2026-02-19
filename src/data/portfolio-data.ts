import type {TechCategory} from "@/components/sections/tech-stack";

/* ─── 네비게이션 ─── */

export const navItems = [
  {label: "Projects", href: "/projects"},
  {label: "Experience", href: "/experience"},
  // { label: "블로그", href: "https://blog.example.com", external: true },
  {label: "Contact", href: "/contact"},
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
    name: "AI & Productivity",
    items: [
      {name: "Claude Code"},
      {name: "Antigravity"},
      {name: "GitHub Copilot"},
      {name: "v0"},
      {name: "ChatGPT"},
    ],
  },
  {
    name: "Tools",
    items: [{name: "Git"}, {name: "GitHub"}, {name: "GitLab"}, {name: "Figma"}, {name: "WAI-ARIA"}],
  },
];

