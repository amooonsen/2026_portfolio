import type {ComponentType} from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiSass,
  SiJquery,
  SiAngular,
  SiGreensock,
  SiChartdotjs,
  SiThreedotjs,
  SiSupabase,
  SiFastify,
  SiN8N,
  SiGitlab,
  SiAmazonwebservices,
  SiSentry,
  SiGit,
  SiGithub,
  SiFigma,
  SiAxios,
  SiZod,
  SiReactquery,
  SiReacthookform,
  SiOpenai,
  SiVercel,
  SiAnthropic,
  SiGithubcopilot,
  SiThymeleaf,
  SiI18Next,
} from "react-icons/si";

type IconComponent = ComponentType<{className?: string; size?: number | string}>;

/**
 * 기술 태그 이름 → 아이콘 컴포넌트 매핑.
 * react-icons/si (Simple Icons)를 사용한다.
 * 매칭되지 않는 태그는 아이콘 없이 텍스트만 표시된다.
 */
const techIconMap: Record<string, IconComponent> = {
  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Vue.js": SiVuedotjs,
  HTML5: SiHtml5,
  HTML: SiHtml5,
  CSS: SiCss3,
  "Tailwind CSS": SiTailwindcss,
  SCSS: SiSass,
  jQuery: SiJquery,
  AngularJS: SiAngular,

  // State & Form
  "React Hook Form": SiReacthookform,
  Zod: SiZod,
  "React Query": SiReactquery,
  Axios: SiAxios,

  // Animation & Visualization
  GSAP: SiGreensock,
  "Chart.js": SiChartdotjs,
  "Three.js": SiThreedotjs,

  // Backend & Infra
  Supabase: SiSupabase,
  Fastify: SiFastify,
  n8n: SiN8N,
  "GitLab CI/CD": SiGitlab,
  AWS: SiAmazonwebservices,
  Sentry: SiSentry,
  Thymeleaf: SiThymeleaf,
  I18N: SiI18Next,

  // AI & Productivity
  "Claude Code": SiAnthropic,
  "GitHub Copilot": SiGithubcopilot,
  ChatGPT: SiOpenai,
  v0: SiVercel,

  // Tools
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Figma: SiFigma,
};

/**
 * 기술 태그 이름에 매칭되는 아이콘 컴포넌트를 반환한다.
 * 매칭이 없으면 null을 반환한다.
 */
export function getTechIcon(name: string): IconComponent | null {
  return techIconMap[name] ?? null;
}
