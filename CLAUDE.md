# 2026 Portfolio — Claude Code 프로젝트 지침

## 프로젝트 개요

**조경문 프론트엔드 개발자 포트폴리오** — 2026년 최신 웹 트렌드를 반영한 인터랙티브 포트폴리오 사이트

- **프레임워크**: Next.js 16.1.6 (App Router, Turbopack, React Compiler)
- **React**: 19.2.3 (Canary)
- **언어**: TypeScript 5 (strict mode)
- **스타일링**: Tailwind CSS 4 + CSS Variables
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

### 콘텐츠 관리

- 프로젝트 데이터: `content/projects/*.md` (gray-matter front-matter)
- 정적 데이터: `src/data/portfolio-data.ts` (navItems, experiences, techCategories)
- 소셜 링크: `src/data/socials.tsx` (SVG 아이콘 포함)
- 블로그: 외부 링크로 리다이렉트 (내부 MDX 미사용)

---

## 라우트 구조 (실제)

```
/               → src/app/page.tsx          (Landing + 3D + Overview)
/about          → src/app/about/page.tsx     (소개 + 기술 스택 + 스킬)
/projects       → src/app/projects/page.tsx  (프로젝트 그리드)
/projects/[slug]→ src/app/projects/[slug]/page.tsx (프로젝트 상세 - Markdown)
/experience     → src/app/experience/page.tsx(경력 타임라인)
/contact        → src/app/contact/page.tsx   (연락처 폼)
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
│   ├── about/
│   ├── projects/
│   ├── experience/
│   └── contact/
├── components/
│   ├── ui/                 # 기본 UI (Container, Section, GlassCard, BentoGrid 등)
│   ├── layout/             # 레이아웃 (Header, FloatingNav, Footer, IntroLoader 등)
│   ├── sections/           # 페이지 섹션 (HeroSection, ProjectGrid 등)
│   ├── animation/          # GSAP 래퍼 (FadeIn, SlideUp, Parallax 등)
│   └── three/              # Three.js (HeroScene, CosmicScene)
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
button, container, section, bento-grid, glass-card, gradient-text, magnetic, spotlight, tech-badge, icon-button, overview-card, markdown-content

### Layout (`src/components/layout/`)
header, floating-nav, mobile-nav, footer, skip-nav, scroll-progress, scroll-to-top, intro-loader, smooth-scroll, route-announcer

### Sections (`src/components/sections/`)
hero-section, about-hero, project-grid, project-card, project-gallery, experience-timeline, tech-stack, skill-bars, contact-section, blog-card

### Animation (`src/components/animation/`)
fade-in, slide-up, stagger-children, parallax, text-reveal, count-up, magnetic-wrapper

### Three.js (`src/components/three/`)
hero-scene, cosmic-scene

### Hooks (`src/hooks/`)
use-gsap, use-reduced-motion, use-media-query, use-scroll-progress, use-active-section, use-scroll-threshold

### Lib (`src/lib/`)
utils, gsap, gsap-utils, lenis-store, projects, session-storage

---

## 스펙 대비 변경사항

| 항목 | DESIGN_SPEC 계획 | 실제 구현 |
|------|------------------|-----------|
| Route Group | `(portfolio)/`, `(content)/` | 플랫 구조 |
| 블로그 | 내부 MDX | 외부 링크 |
| 폰트 | Geist Sans | Pretendard |
| 미들웨어 | `proxy.ts` | 미사용 |
| Framer Motion | Layer 3 | 미사용 (GSAP으로 대체) |
| View Transitions | React 19.2 API | template.tsx GSAP 전환 |
| 스무스 스크롤 | 미계획 | Lenis 도입 |
| ThemeToggle | 계획됨 | 미구현 (다크 모드 고정) |
| 콘텐츠 파서 | MDX | gray-matter (Markdown) |

---

## 해결된 이슈

### 페이지 전환 시 스크롤 위치 미초기화 (2025-02-10)
- **원인**: `template.tsx`에서 `window.scrollTo(0, 0)` 사용 → Lenis 내부 상태 미동기화
- **해결**: `getLenisInstance().scrollTo(0, { immediate: true })` 사용
- **교훈**: Lenis 사용 시 모든 스크롤 제어는 Lenis API를 통해야 함

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
