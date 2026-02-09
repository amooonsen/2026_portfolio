# 2026 FE Developer Portfolio — Design Specification

## 1. Project Overview

**목표**: 2026년 최신 FE 개발 트렌드를 반영한 개발자 포트폴리오 웹사이트
**프레임워크**: Next.js 16 (App Router, Turbopack, React 19.2)
**AI 개발 환경**: Google Antigravity + Claude Code 호환 지침 구조

---

## 2. Tech Stack

### Core
| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.1+ |
| Runtime | Node.js | 20.9+ |
| Bundler | Turbopack (default) | stable |
| React | React 19.2 (Canary) | built-in |

### Styling & Animation
| Category | Technology | Purpose |
|----------|-----------|---------|
| CSS | Tailwind CSS 4 | Utility-first styling |
| Animation | GSAP + ScrollTrigger | Scroll-based animations |
| 3D | Three.js + React Three Fiber | 3D visual elements |
| Transitions | React 19.2 View Transitions | Page navigation animation |
| Motion | Framer Motion | Component-level micro-interactions |

### Design System
| Category | Technology | Purpose |
|----------|-----------|---------|
| UI Primitives | Radix UI | Accessible base components |
| Icons | Lucide React | Consistent iconography |
| Fonts | Geist (Vercel) | Modern typography |

### Infrastructure
| Category | Technology | Purpose |
|----------|-----------|---------|
| Deployment | Vercel | Edge-optimized hosting |
| Analytics | Vercel Analytics | Performance monitoring |
| CMS (optional) | MDX | Blog/content management |
| SEO | Next.js Metadata API | Automated SEO |

---

## 3. Next.js 16 Core Features 활용

### 3.1 Cache Components (`"use cache"`)
```ts
// next.config.ts
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true, // React Compiler 1.0 (stable)
};
```
- 정적 콘텐츠(About, Projects)에 `"use cache"` 적용
- 동적 콘텐츠(Blog, Contact form)는 request-time 렌더링

### 3.2 React 19.2 View Transitions
- 페이지 간 네비게이션에 View Transitions API 활용
- framer-motion 없이 기본 전환 애니메이션 구현 가능
- 복잡한 전환은 GSAP과 조합

### 3.3 proxy.ts (middleware.ts 대체)
```ts
// proxy.ts
export default function proxy(request: NextRequest) {
  // i18n routing, redirect logic
}
```

### 3.4 React Compiler
- 자동 메모이제이션으로 수동 `useMemo`/`useCallback` 불필요
- 렌더링 성능 자동 최적화

### 3.5 `<Activity />` Component
- Background에서 상태 유지하면서 display: none 처리
- 탭/섹션 전환 시 상태 보존에 활용

---

## 4. Project Structure

```
2026_portfolio/
├── .agent/                          # Antigravity agent config
│   ├── rules/
│   │   ├── code-style.md
│   │   ├── component-patterns.md
│   │   └── git-workflow.md
│   ├── skills/
│   │   ├── create-component/
│   │   │   └── SKILL.md
│   │   ├── create-page/
│   │   │   └── SKILL.md
│   │   ├── create-animation/
│   │   │   └── SKILL.md
│   │   └── optimize-performance/
│   │       └── SKILL.md
│   └── workflows/
│       ├── new-feature.md
│       └── code-review.md
├── .claude/                         # Claude Code config
│   └── settings.local.json
├── public/
│   ├── fonts/
│   ├── images/
│   ├── models/                      # 3D models (.glb/.gltf)
│   └── og/                          # OG images
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   ├── not-found.tsx
│   │   ├── global-error.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── (portfolio)/             # Route group: main sections
│   │   │   ├── layout.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── experience/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── (content)/               # Route group: blog/writing
│   │   │   ├── layout.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/                      # Primitives (Button, Card, etc.)
│   │   ├── layout/                  # Header, Footer, Navigation
│   │   ├── sections/                # Page sections (Hero, ProjectGrid)
│   │   ├── three/                   # Three.js/R3F components
│   │   └── animation/               # GSAP animation wrappers
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── metadata.ts              # SEO metadata helpers
│   ├── hooks/
│   │   ├── use-scroll-progress.ts
│   │   ├── use-media-query.ts
│   │   └── use-reduced-motion.ts
│   ├── styles/
│   │   └── globals.css
│   ├── content/                     # MDX content files
│   │   ├── projects/
│   │   └── blog/
│   └── types/
│       └── index.ts
├── proxy.ts                         # Network proxy (was middleware)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── package.json
└── .gitignore
```

---

## 5. Design System & Visual Language

### 5.1 Design Trends (2026)

| Trend | 적용 방식 |
|-------|----------|
| **Bento Grid** | Projects 섹션에 비대칭 카드 레이아웃 |
| **Glassmorphism** | Navigation, Card overlays에 반투명 블러 |
| **Micro-interactions** | Hover, click, scroll 시 세밀한 피드백 |
| **Scroll Storytelling** | GSAP ScrollTrigger 기반 스크롤 연동 애니메이션 |
| **Anti-grid 요소** | Hero 섹션에 의도적 비정렬, 스케일 플레이 |
| **3D Elements** | Hero/About에 인터랙티브 3D 오브젝트 |
| **Dark-first** | 다크 모드 기본, 라이트 모드 전환 지원 |

### 5.2 Color System

```css
/* Dark Theme (Default) */
--background: #0a0a0b;
--foreground: #fafafa;
--muted: #18181b;
--muted-foreground: #a1a1aa;
--accent: #6366f1;        /* Indigo */
--accent-hover: #818cf8;
--border: #27272a;
--glass: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);

/* Light Theme */
--background: #fafafa;
--foreground: #0a0a0b;
--muted: #f4f4f5;
--muted-foreground: #71717a;
--accent: #4f46e5;
--accent-hover: #6366f1;
--border: #e4e4e7;
--glass: rgba(0, 0, 0, 0.03);
--glass-border: rgba(0, 0, 0, 0.08);
```

### 5.3 Typography

```
Font Family: Geist Sans (body) + Geist Mono (code)
Scale: clamp()-based fluid typography

Display:  clamp(2.5rem, 5vw + 1rem, 5rem)    / 700
Heading:  clamp(1.5rem, 3vw + 0.5rem, 3rem)   / 600
Subhead:  clamp(1.125rem, 2vw + 0.5rem, 1.5rem) / 500
Body:     clamp(0.875rem, 1vw + 0.5rem, 1.125rem) / 400
Caption:  clamp(0.75rem, 0.8vw + 0.4rem, 0.875rem) / 400
Code:     Geist Mono, 0.875rem / 400
```

### 5.4 Spacing & Layout

```
Container: max-w-7xl (1280px)
Section padding: py-24 md:py-32 lg:py-40
Grid: CSS Grid + Bento-style asymmetric cards
Gap: gap-4 md:gap-6 lg:gap-8
Border radius: rounded-2xl (cards), rounded-full (buttons/pills)
```

---

## 6. Page Architecture

### 6.1 Landing Page (`/`)
- **Hero Section**: 전체화면, 3D 인터랙티브 배경 + 타이포그래피 애니메이션
- **About Preview**: 간략한 자기 소개 + CTA
- **Featured Projects**: Bento grid로 주요 프로젝트 3-4개
- **Tech Stack**: 아이콘 기반 기술 스택 표시
- **Contact CTA**: 연락처 섹션

### 6.2 About (`/about`)
- 프로필 & 소개
- 경력 타임라인 (스크롤 애니메이션)
- 기술 스택 상세 (카테고리별)
- 가치관 & 개발 철학

### 6.3 Projects (`/projects`)
- Bento Grid 프로젝트 목록
- 필터링 (카테고리, 기술 스택)
- 프로젝트 상세 (`/projects/[slug]`)
  - 스크린샷/데모
  - 기술적 도전과 해결
  - 링크 (GitHub, Live demo)

### 6.4 Experience (`/experience`)
- 경력 사항 타임라인
- 각 포지션 상세 (역할, 성과, 기술)

### 6.5 Blog (`/blog`)
- MDX 기반 블로그 포스트
- 카테고리/태그 필터
- 읽기 시간 표시

### 6.6 Contact (`/contact`)
- 연락 폼 (Server Action 기반)
- 소셜 링크
- 이메일 직접 연결

---

## 7. Animation Strategy

### 7.1 Layer System

```
Layer 1: CSS Transitions        → hover, focus, color changes
Layer 2: View Transitions API   → page navigation (React 19.2)
Layer 3: Framer Motion          → component mount/unmount, layout
Layer 4: GSAP + ScrollTrigger   → scroll-based storytelling
Layer 5: Three.js / R3F         → 3D scenes, particles
```

### 7.2 Performance Rules
- `prefers-reduced-motion` 체크 → 애니메이션 비활성화 옵션
- Three.js는 Hero 섹션만 → `loading="lazy"` 패턴
- GSAP 애니메이션은 Intersection Observer로 뷰포트 진입 시 실행
- `will-change` 속성은 애니메이션 직전에만 적용, 완료 후 제거

### 7.3 Scroll Animation Patterns
```
Fade Up:      opacity 0→1, translateY 40px→0
Stagger:      children 순차 등장 (0.1s delay each)
Parallax:     배경 요소 느린 스크롤
Scale Reveal: scale 0.9→1 + opacity
Clip Reveal:  clip-path로 방향성 있는 노출
Pin Section:  특정 섹션 고정 후 내부 콘텐츠 전환
```

---

## 8. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| INP | < 200ms |
| TTI | < 3.5s |
| Lighthouse Score | ≥ 95 |
| Bundle Size (JS) | < 150KB initial |

### Optimization Strategies
- Turbopack (default) → 2-5x faster builds
- React Compiler → automatic memoization
- `"use cache"` → static content pre-rendering
- Dynamic imports → Three.js, GSAP lazy loaded
- Image optimization → Next.js `<Image>` + WebP/AVIF
- Font optimization → `next/font` with Geist

---

## 9. Antigravity Agent Guidelines

### 9.1 Directory Structure

```
.agent/
├── rules/
│   ├── code-style.md
│   ├── component-patterns.md
│   └── git-workflow.md
├── skills/
│   ├── create-component/
│   │   └── SKILL.md
│   ├── create-page/
│   │   └── SKILL.md
│   ├── create-animation/
│   │   └── SKILL.md
│   └── optimize-performance/
│       └── SKILL.md
└── workflows/
    ├── new-feature.md
    └── code-review.md
```

### 9.2 Rules Files

#### `.agent/rules/code-style.md`
```markdown
# Code Style Guide

## Language & Framework
- TypeScript strict mode required for all files
- Next.js 16 App Router conventions only (no Pages Router)
- React 19.2 patterns: Server Components by default, "use client" only when needed

## Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useScrollProgress.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_PROJECTS`)
- CSS variables: kebab-case (e.g., `--accent-color`)
- Files: kebab-case for non-components (e.g., `scroll-utils.ts`)

## Import Order
1. React / Next.js built-ins
2. External libraries (gsap, three, etc.)
3. Internal aliases (@/components, @/lib, @/hooks)
4. Relative imports
5. Type imports (separate with blank line)

## Component Structure
- Server Components: default (no directive needed)
- Client Components: "use client" at top
- Cached Components: "use cache" for static content
- Props interface: named `{ComponentName}Props`
- Export: named exports preferred, default for pages

## Styling
- Tailwind CSS 4 utility classes
- No inline styles unless dynamic values
- cn() utility for conditional classes (clsx + twMerge)
- CSS variables for theming (defined in globals.css)

## Forbidden
- Do NOT use Pages Router patterns
- Do NOT use middleware.ts (use proxy.ts)
- Do NOT manually useMemo/useCallback (React Compiler handles this)
- Do NOT import from `@/app/` in components (violates separation)
- Do NOT use `any` type
```

#### `.agent/rules/component-patterns.md`
```markdown
# Component Patterns

## Server Component (Default)
- Async data fetching directly in component
- No useState, useEffect, event handlers
- Access to file system, database, environment variables

## Client Component
- "use client" directive required
- Interactive elements: forms, animations, event handlers
- Keep as small as possible, push down the tree

## Composition Pattern
- Server Component wraps Client Component
- Pass data as props from server to client
- "use cache" for expensive server computations

## Animation Components
- Wrap GSAP/Framer Motion in client components
- useRef for DOM references
- useGSAP() hook for GSAP lifecycle (not useEffect)
- Always check useReducedMotion() before animating

## Three.js Components
- Lazy load with next/dynamic + ssr: false
- Suspense boundary with loading fallback
- Canvas only in client components
- Dispose resources in cleanup

## Accessibility
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- prefers-reduced-motion respected
- Color contrast ≥ 4.5:1 (WCAG AA)
```

#### `.agent/rules/git-workflow.md`
```markdown
# Git Workflow

## Branch Naming
- feature/[description] — new features
- fix/[description] — bug fixes
- refactor/[description] — code improvements
- style/[description] — visual/CSS changes

## Commit Messages (Conventional Commits)
- feat: new feature
- fix: bug fix
- refactor: code restructuring
- style: visual changes
- perf: performance improvement
- docs: documentation
- chore: tooling, dependencies

## Flow
1. Create feature branch from main
2. Commit incrementally with meaningful messages
3. Review changes before staging
4. Never force push to main
```

### 9.3 Skill Files

#### `.agent/skills/create-component/SKILL.md`
```markdown
---
name: create-component
description: Creates a new React component following project conventions with proper typing, styling, and accessibility.
---

# Create Component

## Use this skill when
- User asks to create a new UI component
- User asks to add a new section to a page
- User needs a reusable component

## Do not use this skill when
- User is editing an existing component
- User is creating a page (use create-page skill)

## Instructions

1. **Determine component type**:
   - Server Component (default): no interactivity needed
   - Client Component: needs state, effects, event handlers, animations
   - Cached Component: expensive server computation, "use cache"

2. **Choose location**:
   - `src/components/ui/` — reusable primitives (Button, Card, Badge)
   - `src/components/layout/` — layout elements (Header, Footer, Nav)
   - `src/components/sections/` — page sections (Hero, ProjectGrid)
   - `src/components/three/` — Three.js/R3F components
   - `src/components/animation/` — animation wrappers

3. **Create component file** with this structure:
   ```tsx
   // "use client" — only if client component

   import type { ComponentNameProps } from "./types"

   export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
     return (
       <section className="...">
         {/* semantic HTML */}
       </section>
     )
   }
   ```

4. **Apply styling**:
   - Use Tailwind CSS utility classes
   - Use cn() for conditional classes
   - CSS variables for theme values

5. **Ensure accessibility**:
   - Semantic HTML elements
   - ARIA labels where needed
   - Keyboard navigation support
   - prefers-reduced-motion check for animations
```

#### `.agent/skills/create-page/SKILL.md`
```markdown
---
name: create-page
description: Creates a new page in the Next.js App Router with proper metadata, caching strategy, and layout integration.
---

# Create Page

## Use this skill when
- User asks to create a new route/page
- User wants to add a new section to the portfolio

## Do not use this skill when
- User is creating a component (use create-component)
- User is editing existing page content

## Instructions

1. **Determine route group**:
   - `(portfolio)/` — main portfolio sections (about, projects, experience)
   - `(content)/` — blog and writing content
   - Root `app/` — landing page, error pages

2. **Create page file** at `src/app/{route-group}/{page-name}/page.tsx`:
   ```tsx
   import type { Metadata } from "next"

   export const metadata: Metadata = {
     title: "Page Title | Portfolio",
     description: "Page description for SEO",
   }

   export default function PageName() {
     return (
       <main>
         {/* Page sections */}
       </main>
     )
   }
   ```

3. **Apply caching strategy**:
   - Static content → `"use cache"` directive
   - Dynamic content → default (request-time rendering)
   - Mixed → cache static parts, stream dynamic parts

4. **Add metadata**:
   - title, description for SEO
   - Open Graph images
   - Structured data where applicable

5. **Create loading.tsx** if page has async data:
   ```tsx
   export default function Loading() {
     return <PageSkeleton />
   }
   ```
```

#### `.agent/skills/create-animation/SKILL.md`
```markdown
---
name: create-animation
description: Creates scroll-based or interactive animations using GSAP, Framer Motion, or CSS transitions following the animation layer system.
---

# Create Animation

## Use this skill when
- User asks for scroll animations or interactions
- User wants to add motion to a section
- User needs 3D or particle effects

## Do not use this skill when
- User needs simple hover effects (use CSS transitions)
- User is creating page transitions (use View Transitions API)

## Instructions

1. **Select animation layer**:
   - Layer 1 (CSS): hover, focus, simple transitions
   - Layer 2 (View Transitions): page navigation
   - Layer 3 (Framer Motion): mount/unmount, layout shifts
   - Layer 4 (GSAP): scroll-based storytelling, complex timelines
   - Layer 5 (Three.js): 3D scenes, particles

2. **For GSAP animations**:
   ```tsx
   "use client"

   import { useRef } from "react"
   import { useGSAP } from "@gsap/react"
   import gsap from "gsap"
   import { ScrollTrigger } from "gsap/ScrollTrigger"
   import { useReducedMotion } from "@/hooks/use-reduced-motion"

   gsap.registerPlugin(ScrollTrigger)

   export function AnimatedSection() {
     const containerRef = useRef<HTMLDivElement>(null)
     const prefersReducedMotion = useReducedMotion()

     useGSAP(() => {
       if (prefersReducedMotion) return
       // animation code
     }, { scope: containerRef })

     return <div ref={containerRef}>...</div>
   }
   ```

3. **For Three.js scenes**:
   - Dynamic import with `ssr: false`
   - Wrap in Suspense with fallback
   - Always dispose geometries, materials, textures in cleanup

4. **Performance rules**:
   - Check `prefers-reduced-motion` before all animations
   - Lazy load heavy animation libraries
   - Use `will-change` only during animation, remove after
   - Prefer `transform` and `opacity` (GPU-accelerated)
   - Limit scroll listeners with throttle/debounce
```

#### `.agent/skills/optimize-performance/SKILL.md`
```markdown
---
name: optimize-performance
description: Analyzes and optimizes page performance targeting Core Web Vitals thresholds.
---

# Optimize Performance

## Use this skill when
- User reports slow loading or poor performance
- User asks to optimize a specific page
- Before deployment to check performance

## Do not use this skill when
- User is designing or adding features (optimize after)
- Initial prototyping phase

## Instructions

1. **Audit current state**:
   - Check bundle size with Next.js build output
   - Identify client component boundaries
   - Review image optimization
   - Check for unnecessary re-renders

2. **Apply optimizations**:
   - Convert client components to server where possible
   - Add `"use cache"` to static content
   - Dynamic import for heavy libraries (Three.js, GSAP)
   - Optimize images: WebP/AVIF, proper sizing, priority hints
   - Font optimization: next/font preloading

3. **Performance targets**:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
   - INP < 200ms
   - Lighthouse ≥ 95

4. **Validation**:
   - Run `next build` and check output
   - Lighthouse audit
   - Test on throttled connection (3G)
```

### 9.4 Workflow Files

#### `.agent/workflows/new-feature.md`
```markdown
# New Feature Workflow

1. Create feature branch: `git checkout -b feature/[name]`
2. Read existing code patterns in related files
3. If new component needed → use `create-component` skill
4. If new page needed → use `create-page` skill
5. If animation needed → use `create-animation` skill
6. Write implementation following rules in `.agent/rules/`
7. Test in browser (dev server)
8. Run `next build` to verify no errors
9. Run ESLint: `npx eslint .`
10. Commit with conventional commit message
```

#### `.agent/workflows/code-review.md`
```markdown
# Code Review Workflow

1. Check TypeScript strict compliance: no `any`, proper types
2. Verify component type (Server vs Client) is appropriate
3. Check accessibility: semantic HTML, ARIA, keyboard nav
4. Verify animation performance: reduced motion check, lazy loading
5. Check import order follows convention
6. Verify no forbidden patterns (see code-style.md)
7. Check responsive design: mobile-first, fluid typography
8. Verify SEO metadata on pages
```

---

## 10. next.config.ts Specification

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Cache Components (opt-in caching)
  cacheComponents: true,

  // React Compiler (automatic memoization)
  reactCompiler: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add remote image domains as needed
    ],
  },

  // Turbopack is default — no config needed
  // Use `next build --webpack` to opt out if required

  // TypeScript strict checking in build
  typescript: {
    // Set to false in production for CI speed if type-checking separately
    ignoreBuildErrors: false,
  },

  // ESLint in build
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
```

---

## 11. SEO & Metadata Strategy

### Root Layout Metadata
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "이름 | Frontend Developer",
    template: "%s | 이름",
  },
  description: "포트폴리오 설명",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    images: ["/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

### Per-page Metadata
각 페이지별 `export const metadata` 또는 `generateMetadata()` 사용

### Structured Data
JSON-LD로 Person, WebSite 스키마 적용

---

## 12. Responsive Strategy

```
Breakpoints (Tailwind defaults):
  sm:  640px   — Mobile landscape
  md:  768px   — Tablet
  lg:  1024px  — Desktop
  xl:  1280px  — Large desktop
  2xl: 1536px  — Ultra-wide

Approach: Mobile-first
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Typography: clamp()-based fluid scaling
Images: srcSet + sizes for responsive loading
3D: 해상도/디바이스별 quality 조절 (mobile에서 simplified)
```

---

## 13. Accessibility Requirements

| Requirement | Standard |
|-------------|----------|
| Color Contrast | WCAG AA (4.5:1) |
| Keyboard Navigation | Full support |
| Screen Reader | Semantic HTML + ARIA |
| Reduced Motion | `prefers-reduced-motion` respected |
| Focus Indicators | Visible focus rings |
| Skip Navigation | Skip to content link |
| Language | `lang="ko"` attribute |
| Alt Text | All images have descriptive alt |

---

## 14. Deployment & CI/CD

```
Vercel (Recommended):
  - Auto-deploy on push to main
  - Preview deployments on PR
  - Edge Functions for proxy.ts
  - Analytics built-in
  - Image optimization CDN

Environment Variables:
  - NEXT_PUBLIC_SITE_URL
  - CONTACT_EMAIL (server only)
  - ANALYTICS_ID (if external)
```

---

## References

- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Web Design Trends 2026 — Figma](https://www.figma.com/resource-library/web-design-trends/)
- [UI/UX Design Trends 2026](https://www.index.dev/blog/ui-ux-design-trends)
- [Google Antigravity Skills Tutorial](https://github.com/rominirani/antigravity-skills)
- [Antigravity Agent Skills Setup Guide](https://www.honogear.com/en/blog/engineering/antigravity-guide-2026)
- [Getting Started with Antigravity](https://codelabs.developers.google.com/getting-started-google-antigravity)
