# 2026 Portfolio — Claude Code 프로젝트 지침

## 프로젝트 개요

**조경문 프론트엔드 개발자 포트폴리오** — 2026년 최신 웹 트렌드를 반영한 인터랙티브 포트폴리오 사이트

- **프레임워크**: Next.js 16.1.6 (App Router, Turbopack, React Compiler)
- **React**: 19.2.3 (Canary)
- **언어**: TypeScript 5 (strict mode)
- **스타일링**: Tailwind CSS 4 + CSS Variables + next-themes (다크/라이트 모드)
- **애니메이션**: GSAP 3.14 + ScrollTrigger
- **3D**: Three.js 0.182 + React Three Fiber 9.5
- **스무스 스크롤**: Lenis 1.3
- **콘텐츠**: Markdown + gray-matter (프로젝트)
- **폰트**: Pretendard (본문) + Geist Mono (코드)

---

## 현재 브랜치 전략

- `main`: 프로덕션 (PR 대상)
- `dev`: 활성 개발 브랜치

---

## 핵심 아키텍처 결정사항

### 스크롤 시스템: Lenis + GSAP ScrollTrigger

- `SmoothScroll` 컴포넌트 (`layout.tsx`에서 마운트)가 Lenis 인스턴스를 생성
- Lenis 인스턴스는 `lenis-store.ts`의 싱글톤으로 관리 (`getLenisInstance()`)
- **스크롤 제어 시 반드시 Lenis API 사용** — `window.scrollTo`만 사용하면 Lenis 내부 상태와 동기화되지 않음
- `template.tsx`에서 라우트 전환 시 `lenis.scrollTo(0, { immediate: true })` 호출

### GSAP 사용 패턴

- `src/lib/gsap.ts`에서 플러그인 등록 (ScrollTrigger 등)
- `useGsapContext` 훅 (`src/hooks/use-gsap.ts`)으로 GSAP context + cleanup 자동화
- 모든 애니메이션 컴포넌트에서 `useReducedMotion()` 체크 필수

### 컴포넌트 패턴

- Server Component가 기본 (directive 없음)
- Client Component: `"use client"` 명시 (상태, 이벤트, 애니메이션 필요 시)
- Three.js 컴포넌트: `next/dynamic`으로 `ssr: false` lazy load
- React Compiler 활성화 → 수동 `useMemo`/`useCallback` 사용 금지

### Server / Client Component children prop 흐름

서버 컴포넌트에서 렌더링한 HTML을 클라이언트 컴포넌트의 `children` prop으로 주입하는 패턴을 사용한다.
클라이언트 컴포넌트는 인터랙션(GSAP, 마우스, 스크롤)이 필요한 곳에만 적용한다.

```
layout.tsx (Server) ─ HTML 생성, 폰트·메타데이터·SEO
 ├─ ThemeProvider (Client) ← children으로 전체 앱 주입
 │   ├─ Header (Client), FloatingNav (Client)
 │   ├─ <main>{children}</main> ← 페이지별 Server Component
 │   └─ Footer (Server), ScrollToTop (Client)
 │
 └─ template.tsx (Client) ← 페이지 전환 애니메이션, children으로 페이지 주입

page.tsx — / (Server)
 └─ HomeClient (Client) ← children으로 서버 렌더 콘텐츠 주입
     ├─ IntroLoader (Client) + CosmicScene (3D, ssr:false)
     ├─ HeroSection (Client) ← props만, children 미사용
     ├─ AboutHero (Client) ← props만, children 미사용
     ├─ Section (Server) → FadeIn (Client) ← children으로 서버 콘텐츠 주입
     │   └─ GradientText (Server), GlassCard (Server)
     ├─ StaggerChildren (Client) ← children으로 GlassCard (Server) 목록 주입
     ├─ TechStack (Client) ← props만
     └─ PageEndCelebration (Client)

projects/page.tsx (Server, async) ← Notion 데이터 패칭
 └─ ProjectGrid (Client) ← children으로 Featured 배너 주입
     └─ FadeIn (Client) → Link (Server-safe)

projects/[slug]/page.tsx (Server, async) ← Notion 데이터 패칭
 ├─ FadeIn (Client) ← children으로 서버 렌더 콘텐츠 주입
 │   ├─ GradientText (Server), GlassCard (Server)
 │   └─ MarkdownContent (Server, async) ← Shiki 서버 렌더
 └─ TableOfContents (Client) ← props만

experience/page.tsx (Server)
 ├─ ExperienceProfile (Client) ← props 없음
 ├─ FadeIn (Client) ← children으로 GradientText (Server) 주입
 └─ ExperienceTabs (Client) ← props로 데이터 전달

contact/page.tsx (Server)
 └─ ContactSection (Client) ← props로 email, socials 전달
     └─ Server Action (submitContactForm) 호출
```

**핵심 규칙**:
- Server Component → 데이터 패칭, HTML 생성, SEO
- Client Component → 상태, 이벤트 핸들러, GSAP/Three.js 애니메이션
- `children` prop → 서버 렌더 결과를 클라이언트 래퍼에 주입 (번들 크기 최소화)
- 서버 전용 코드(`fs`, `path`, DB)가 클라이언트에 유입되지 않도록 주의

### 테마 시스템: next-themes + CSS 변수

- `next-themes`의 `ThemeProvider`가 `layout.tsx`에서 전체 앱을 래핑
- `attribute="class"`, `defaultTheme="dark"`, `enableSystem` 설정
- CSS 변수: `:root`(라이트), `.dark`(다크) 셀렉터로 분리
- 시맨틱 변수: `--glass-bg/border`, `--scene-bg`, `--accent-indigo`, `--gradient-accent-*`
- `ThemeToggle`: Header 우측, Sun/Moon 아이콘, hydration mismatch 방지 (mounted 체크)
- Three.js 색상: `useSceneColors()` 훅으로 테마별 색상 세트 반환
- Shiki 코드블록: `github-dark-dimmed` + `github-light` 듀얼 테마

### 콘텐츠 관리

- 프로젝트 데이터: `content/projects/*.md` (gray-matter front-matter)
- 정적 데이터: `src/data/portfolio-data.ts` (navItems, experiences, techCategories)
- 소셜 링크: `src/data/socials.tsx` (SVG 아이콘 포함)
- 블로그: 외부 링크로 리다이렉트 (내부 MDX 미사용)

---

## 라우트 구조 (실제)

```
/               → src/app/page.tsx               (Landing + 3D + Overview + 철학 + 기술스택)
/projects       → src/app/projects/page.tsx      (프로젝트 그리드)
/projects/[slug]→ src/app/projects/[slug]/page.tsx(프로젝트 상세 - Notion/Markdown)
/experience     → src/app/experience/page.tsx    (경력 타임라인)
/contact        → src/app/contact/page.tsx       (Contact 폼)
```

- Route Group `(portfolio)/`, `(content)/` 미사용 — 플랫 구조 채택
- `proxy.ts`, `middleware.ts` 미사용
- `template.tsx`: 페이지 전환 애니메이션 + 스크롤 리셋

---

## 디렉토리 구조 (실제)

```
src/
├── app/                    # 페이지 + 레이아웃
│   ├── layout.tsx          # Root: 폰트, Header, Footer, SmoothScroll, FloatingNav
│   ├── template.tsx        # 페이지 전환 애니메이션 + 스크롤 리셋
│   ├── page.tsx            # Landing (3D + Overview)
│   ├── not-found.tsx
│   ├── actions.ts          # Server Actions
│   ├── robots.ts           # robots.txt 생성
│   ├── sitemap.ts          # sitemap.xml 생성
│   ├── projects/
│   ├── experience/
│   └── contact/
├── components/
│   ├── ui/                 # 기본 UI (Container, Section, GlassCard, BentoGrid 등)
│   ├── layout/             # 레이아웃 (Header, FloatingNav, Footer, IntroLoader 등)
│   ├── sections/           # 페이지 섹션 (HeroSection, ProjectGrid 등)
│   ├── animation/          # GSAP 래퍼 (FadeIn, SlideUp, StaggerChildren)
│   ├── three/              # Three.js (CosmicScene, SpaceAstronaut, CelebrationScene)
│   └── seo/                # 구조화된 데이터 (JSON-LD)
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티
├── data/                   # 정적 데이터
├── styles/
│   └── globals.css
├── types/
└── fonts/
content/
└── projects/               # 프로젝트 Markdown 파일
```

---

## 컴포넌트 목록 (구현 완료)

### UI (`src/components/ui/`)

button, container, section, bento-grid, glass-card, gradient-text, magnetic, spotlight, tech-badge, icon-button, markdown-content, skeleton, table-of-contents, tabs

### Layout (`src/components/layout/`)

header, floating-nav, mobile-nav, footer, skip-nav, scroll-progress, scroll-to-top, intro-loader, smooth-scroll, route-announcer, theme-provider, theme-toggle

### Sections (`src/components/sections/`)

hero-section, about-hero, project-grid, project-card, project-gallery, experience-timeline, experience-tabs, experience-journey, experience-profile, tech-stack, contact-section, contact-success, page-end-celebration

### Animation (`src/components/animation/`)

fade-in, slide-up, stagger-children

### Three.js (`src/components/three/`)

cosmic-scene, space-astronaut, celebration-scene

### SEO (`src/components/seo/`)

json-ld

### Hooks (`src/hooks/`)

use-gsap, use-reduced-motion, use-media-query, use-scroll-threshold, use-theme-colors, use-focus-trap

### Lib (`src/lib/`)

utils, gsap, gsap-utils, lenis-store, projects, notion, metadata, mail, session-storage, intro-context, astronaut-ready, validations

---

## 스펙 대비 변경사항

| 항목             | DESIGN_SPEC 계획             | 실제 구현               |
| ---------------- | ---------------------------- | ----------------------- |
| Route Group      | `(portfolio)/`, `(content)/` | 플랫 구조               |
| `/about` 라우트  | 독립 페이지                  | 삭제 — 홈 페이지에 AboutHero로 통합 |
| 블로그           | 내부 MDX                     | 외부 링크               |
| 폰트             | Geist Sans                   | Pretendard              |
| 미들웨어         | `proxy.ts`                   | 미사용                  |
| Framer Motion    | Layer 3                      | 미사용 (GSAP으로 대체)  |
| View Transitions | React 19.2 API               | template.tsx GSAP 전환  |
| 스무스 스크롤    | 미계획                       | Lenis 도입              |
| ThemeToggle      | 계획됨                       | 구현 완료 (next-themes + CSS 변수) |
| 콘텐츠 파서      | MDX                          | gray-matter (Markdown) + Notion API |
| 데이터 소스      | 로컬 Markdown만              | Notion 우선, 로컬 fallback |

---

## 해결된 이슈

### 페이지 전환 시 스크롤 위치 미초기화 (2025-02-10)

- **원인**: `template.tsx`에서 `window.scrollTo(0, 0)` 사용 → Lenis 내부 상태 미동기화
- **해결**: `getLenisInstance().scrollTo(0, { immediate: true })` 사용
- **교훈**: Lenis 사용 시 모든 스크롤 제어는 Lenis API를 통해야 함

---

## 절대 삭제 금지 코드

- **Career 탭 / ExperienceTimeline**: `experience-tabs.tsx`의 Career 관련 코드(`showCareerTab`, `ExperienceTimeline`, `TabsTrigger value="career"` 등)를 절대 삭제하지 마세요. 현재 히든(`showCareerTab = false`) 상태이며, 경력이 쌓이면 다시 활성화합니다.
- **Experience 페이지 (`/experience`)**: 라우트, 페이지 파일, 관련 컴포넌트를 삭제하지 마세요.

---

## 개발 규칙

### 코드 스타일

- TypeScript strict mode 필수
- 컴포넌트: PascalCase (`HeroSection.tsx`)
- 훅: camelCase + `use` prefix (`use-scroll-progress.ts`)
- CSS 변수: kebab-case (`--accent-color`)
- 파일명: kebab-case (`glass-card.tsx`)

### Import 순서

1. React / Next.js 내장
2. 외부 라이브러리 (gsap, three 등)
3. 내부 alias (`@/components`, `@/lib`, `@/hooks`)
4. 상대 경로
5. 타입 import (빈 줄로 구분)

### 스타일링

- Tailwind CSS 4 유틸리티 클래스
- 조건부 클래스: `cn()` (`clsx` + `tailwind-merge`)
- 테마: CSS 변수 (`globals.css` 정의)
- 인라인 스타일: 동적 값일 때만

### 애니메이션

- 모든 애니메이션에 `useReducedMotion()` 체크
- GSAP context는 `useGsapContext` 훅으로 관리 (자동 cleanup)
- Three.js: `dynamic(() => import(...), { ssr: false })`
- `will-change`: 애니메이션 중에만 적용, 완료 후 제거
- transform + opacity 우선 (GPU 가속)

### 접근성

- 시맨틱 HTML 필수
- ARIA 라벨 (인터랙티브 요소)
- 키보드 내비게이션
- `prefers-reduced-motion` 존중
- 색상 대비 4.5:1 이상 (WCAG AA)
- Skip Navigation 링크

### Git

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `perf:`, `docs:`, `chore:`
- Feature branch → 커밋 → PR
- `main` force push 금지
