import type {ComponentType, SVGProps} from "react";
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

// ── react-icons에 없는 아이콘을 위한 커스텀 SVG ──

/** Zustand 베어 아이콘 (공식 로고 기반 간소화) */
function ZustandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-3.5 8.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm7 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM12 17c-2.21 0-4-1.34-4-3h1.5c0 .83 1.12 1.5 2.5 1.5s2.5-.67 2.5-1.5H16c0 1.66-1.79 3-4 3Z" />
    </svg>
  );
}

/**
 * 기술 태그 이름 → 아이콘 컴포넌트 매핑.
 * react-icons/si (Simple Icons) + 커스텀 SVG를 사용한다.
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
  Zustand: ZustandIcon,
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

/** 대소문자 무시 빠른 검색용 역매핑 (소문자 키 → 원본 키) */
const lowerCaseMap = new Map<string, string>(
  Object.keys(techIconMap).map((key) => [key.toLowerCase(), key]),
);

/**
 * 기술 태그 이름에 매칭되는 아이콘 컴포넌트를 반환한다.
 * 정확히 매칭 → lowercase 매칭 순으로 탐색한다.
 * 매칭이 없으면 null을 반환한다.
 */
export function getTechIcon(name: string): IconComponent | null {
  // 정확한 매칭 우선
  const exact = techIconMap[name];
  if (exact) return exact;

  // 대소문자 무시 fallback (Notion 태그 케이싱 차이 대응)
  const originalKey = lowerCaseMap.get(name.toLowerCase());
  if (originalKey) return techIconMap[originalKey];

  return null;
}
