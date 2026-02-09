# Component Design System Specification

포트폴리오 전체 커스텀 컴포넌트 설계 명세.
shadcn/ui(New York, Zinc, OKLCH) 위에 포트폴리오 전용 레이어를 구축한다.

---

## Component Map

```
src/components/
├── ui/                    ← shadcn primitives + custom UI
│   ├── button.tsx            (shadcn)
│   ├── badge.tsx             (shadcn)
│   ├── card.tsx              (shadcn)
│   ├── separator.tsx         (shadcn)
│   ├── tooltip.tsx           (shadcn)
│   ├── glass-card.tsx        ★ custom
│   ├── bento-grid.tsx        ★ custom
│   ├── section.tsx           ★ custom
│   ├── container.tsx         ★ custom
│   ├── gradient-text.tsx     ★ custom
│   ├── magnetic.tsx          ★ custom
│   ├── spotlight.tsx         ★ custom
│   ├── tech-badge.tsx        ★ custom
│   └── icon-button.tsx       ★ custom
│
├── layout/                ← 페이지 레이아웃
│   ├── header.tsx
│   ├── floating-nav.tsx
│   ├── mobile-nav.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── scroll-progress.tsx
│   └── skip-nav.tsx
│
├── sections/              ← 페이지 섹션
│   ├── hero-section.tsx
│   ├── about-preview.tsx
│   ├── project-grid.tsx
│   ├── project-card.tsx
│   ├── tech-stack.tsx
│   ├── experience-timeline.tsx
│   ├── contact-section.tsx
│   └── blog-card.tsx
│
├── animation/             ← 애니메이션 래퍼
│   ├── fade-in.tsx
│   ├── slide-up.tsx
│   ├── stagger-children.tsx
│   ├── parallax.tsx
│   ├── text-reveal.tsx
│   ├── count-up.tsx
│   └── magnetic-wrapper.tsx
│
└── three/                 ← 3D 컴포넌트
    ├── hero-scene.tsx
    ├── floating-shapes.tsx
    └── particle-field.tsx
```

---

## 1. Core UI Components

### 1.1 Container

경로: `src/components/ui/container.tsx`
타입: Server Component

```tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
  size?: "sm" | "md" | "lg" | "xl" | "full";
}
```

| size   | max-width                      |
| ------ | ------------------------------ |
| `sm`   | `max-w-3xl` (768px)            |
| `md`   | `max-w-5xl` (1024px)           |
| `lg`   | `max-w-7xl` (1280px) — default |
| `xl`   | `max-w-[1440px]`               |
| `full` | `w-full`                       |

기본 패딩: `px-4 sm:px-6 lg:px-8`

---

### 1.2 Section

경로: `src/components/ui/section.tsx`
타입: Server Component

```tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
  container?: boolean; // true면 내부에 Container 래핑
  containerSize?: ContainerProps["size"];
}
```

| spacing | padding                             |
| ------- | ----------------------------------- |
| `sm`    | `py-12 md:py-16`                    |
| `md`    | `py-16 md:py-24`                    |
| `lg`    | `py-24 md:py-32 lg:py-40` — default |
| `xl`    | `py-32 md:py-40 lg:py-48`           |

`id` prop은 앵커 네비게이션용. `scroll-mt-20`으로 fixed nav 높이 보정.

---

### 1.3 GlassCard

경로: `src/components/ui/glass-card.tsx`
타입: Server Component

2026 Glassmorphism 트렌드 적용. 반투명 배경 + backdrop-blur + 미세한 보더.

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // hover 시 밝기/보더 변화
  as?: "div" | "article" | "li";
  padding?: "sm" | "md" | "lg";
}
```

스타일 핵심:

```
bg-white/5 dark:bg-white/5
backdrop-blur-xl
border border-white/10 dark:border-white/10
rounded-2xl
```

hover 활성 시:

```
transition-all duration-300
hover:bg-white/10 hover:border-white/20
hover:shadow-lg hover:shadow-white/5
```

---

### 1.4 BentoGrid

경로: `src/components/ui/bento-grid.tsx`
타입: Server Component

비대칭 카드 그리드 레이아웃. CSS Grid 기반.

```tsx
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4; // 기본 3 (반응형: 1→2→3)
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2; // grid column span
  rowSpan?: 1 | 2; // grid row span
}
```

그리드 구조:

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{columns}
gap-4 md:gap-6
auto-rows-[minmax(200px,auto)]
```

BentoGridItem의 span 예시:

```
Featured project:  colSpan=2, rowSpan=2  → 큰 카드
Normal project:    colSpan=1, rowSpan=1  → 표준 카드
Wide project:      colSpan=2, rowSpan=1  → 가로 넓은 카드
Tall project:      colSpan=1, rowSpan=2  → 세로 긴 카드
```

---

### 1.5 GradientText

경로: `src/components/ui/gradient-text.tsx`
타입: Server Component

그라디언트 텍스트. Hero 타이틀 등에 사용.

```tsx
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  gradient?: "primary" | "accent" | "rainbow" | "custom";
  animate?: boolean; // 그라디언트 시프트 애니메이션
}
```

그라디언트 프리셋:

```
primary:  from-foreground via-foreground/80 to-muted-foreground
accent:   from-indigo-400 via-purple-400 to-pink-400
rainbow:  from-red-400 via-yellow-400 via-green-400 to-blue-400
custom:   className으로 직접 지정
```

animate=true일 때: `bg-[length:200%_auto] animate-gradient-shift`

---

### 1.6 Magnetic

경로: `src/components/ui/magnetic.tsx`
타입: Client Component (`"use client"`)

마우스 커서에 자석처럼 끌리는 효과. 버튼, 링크에 적용.

```tsx
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 자석 강도 0-1, default 0.3
  radius?: number; // 감지 반경 px, default 150
  disabled?: boolean;
}
```

동작:

1. `onMouseMove`로 마우스 위치 추적
2. 요소 중심과의 거리 계산
3. `radius` 내에 들어오면 `transform: translate(dx, dy)` 적용
4. strength로 이동 거리 스케일링
5. 마우스 leave 시 스프링 애니메이션으로 원위치

`prefers-reduced-motion` 시 효과 비활성화.

---

### 1.7 Spotlight

경로: `src/components/ui/spotlight.tsx`
타입: Client Component (`"use client"`)

마우스 따라다니는 스포트라이트 효과. 카드 hover에 사용.

```tsx
interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number; // 스포트라이트 크기 px, default 400
  color?: string; // 스포트라이트 색상, default "white"
  opacity?: number; // 0-1, default 0.08
}
```

구현:

```
position: relative; overflow: hidden;
::after pseudo-element로 radial-gradient 생성
onMouseMove로 gradient 위치 업데이트
CSS custom properties (--x, --y)로 실시간 업데이트
```

`prefers-reduced-motion` 시 정적 효과 또는 비활성화.

---

### 1.8 TechBadge

경로: `src/components/ui/tech-badge.tsx`
타입: Server Component

기술 스택 표시용 뱃지. 아이콘 + 텍스트.

```tsx
interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode; // Lucide icon 또는 커스텀 SVG
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md";
}
```

스타일:

```
default:  bg-muted text-muted-foreground
outline:  border border-border text-muted-foreground
ghost:    text-muted-foreground hover:bg-muted
```

---

### 1.9 IconButton

경로: `src/components/ui/icon-button.tsx`
타입: Server Component (기본) / Client Component (tooltip 포함 시)

아이콘 전용 버튼. 소셜 링크, 액션 버튼에 사용.

```tsx
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // aria-label (필수)
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  asChild?: boolean; // Radix Slot 패턴
}
```

| size | 크기                  |
| ---- | --------------------- |
| `sm` | `h-8 w-8`             |
| `md` | `h-10 w-10` — default |
| `lg` | `h-12 w-12`           |

`label` prop은 시각적으로 숨기되 `aria-label`로 적용. 접근성 필수.

---

## 2. Layout Components

### 2.1 Header

경로: `src/components/layout/header.tsx`
타입: Client Component (`"use client"`)

고정 헤더. 스크롤 시 FloatingNav로 전환.

```tsx
interface HeaderProps {
  className?: string;
}
```

구성:

```
<header>
  <Container>
    <Logo />               ← 좌측: 이름/로고
    <nav>                  ← 중앙: 네비게이션 링크 (desktop)
      <NavLink />...
    </nav>
    <div>                  ← 우측: ThemeToggle + MobileNav trigger
      <ThemeToggle />
      <MobileNavTrigger /> ← md 이하에서만 표시
    </div>
  </Container>
</header>
```

스크롤 동작:

- 스크롤 다운 → 헤더 hide (translateY: -100%)
- 스크롤 업 → 헤더 show + glassmorphism 배경
- 상단(scrollY < 50) → 투명 배경

---

### 2.2 FloatingNav

경로: `src/components/layout/floating-nav.tsx`
타입: Client Component (`"use client"`)

화면 하단 중앙에 떠있는 플로팅 네비게이션. 2026 트렌드.

```tsx
interface FloatingNavProps {
  items: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}
```

스타일:

```
fixed bottom-6 left-1/2 -translate-x-1/2 z-50
bg-background/80 backdrop-blur-xl
border border-border/50 rounded-full
px-2 py-1.5 shadow-2xl
```

각 NavItem:

```
px-4 py-2 rounded-full
text-sm font-medium
transition-colors duration-200
active → bg-primary text-primary-foreground
hover → bg-muted
```

활성 상태: Intersection Observer로 현재 보이는 섹션 감지.
모바일: 아이콘만 표시 (label 숨김).

---

### 2.3 MobileNav

경로: `src/components/layout/mobile-nav.tsx`
타입: Client Component (`"use client"`)

모바일 전체 화면 네비게이션 오버레이.

```tsx
interface MobileNavProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}
```

동작:

- 햄버거 아이콘 클릭 → 전체 화면 오버레이 (inset-0)
- 배경: `bg-background/95 backdrop-blur-xl`
- 링크: 큰 폰트 (text-3xl), 순차 페이드인 (stagger)
- ESC 키 또는 링크 클릭 시 닫기
- `aria-expanded`, `aria-controls` 적용
- body scroll lock 적용

---

### 2.4 Footer

경로: `src/components/layout/footer.tsx`
타입: Server Component

```tsx
interface FooterProps {
  className?: string;
}
```

구성:

```
<footer>
  <Container>
    <div>                   ← 상단: 소셜 링크 + 연락처
      <SocialLinks />
      <ContactInfo />
    </div>
    <Separator />
    <div>                   ← 하단: 저작권 + 빌드 정보
      <Copyright />
      <small>Built with Next.js 16</small>
    </div>
  </Container>
</footer>
```

---

### 2.5 ThemeToggle

경로: `src/components/layout/theme-toggle.tsx`
타입: Client Component (`"use client"`)

다크/라이트 모드 전환 토글.

```tsx
// Props 없음 (자체 상태 관리)
```

동작:

1. `<html>` 요소의 `className`에서 `dark` 클래스 토글
2. `localStorage`에 테마 선호도 저장
3. 시스템 `prefers-color-scheme` 기본값 존중
4. 아이콘: Sun ↔ Moon 전환 애니메이션 (rotate + scale)
5. `suppressHydrationWarning` (layout.tsx에 이미 적용)

---

### 2.6 ScrollProgress

경로: `src/components/layout/scroll-progress.tsx`
타입: Client Component (`"use client"`)

페이지 상단 스크롤 진행률 바.

```tsx
interface ScrollProgressProps {
  className?: string;
  color?: string; // 바 색상, default "bg-primary"
}
```

구현:

- `scroll` 이벤트로 스크롤 비율 계산
- `scaleX(ratio)` transform으로 너비 조절 (GPU 가속)
- `position: fixed; top: 0; left: 0; z-index: 9999`
- 높이: `h-0.5` (2px)
- `transform-origin: left`

---

### 2.7 SkipNav

경로: `src/components/layout/skip-nav.tsx`
타입: Server Component

접근성 필수: 키보드 유저를 위한 "콘텐츠로 건너뛰기" 링크.

```tsx
interface SkipNavProps {
  contentId?: string; // default "main-content"
  label?: string; // default "콘텐츠로 건너뛰기"
}
```

스타일:

```
sr-only focus:not-sr-only
focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
focus:bg-background focus:text-foreground
focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg
```

---

## 3. Section Components

### 3.1 HeroSection

경로: `src/components/sections/hero-section.tsx`
타입: Client Component (`"use client"`) — 애니메이션 포함

```tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}
```

구성:

```
<Section spacing="xl">
  <Container>
    <div className="relative min-h-screen flex items-center">
      <!-- 3D Background (lazy loaded) -->
      <HeroScene />

      <!-- Content overlay -->
      <div className="relative z-10">
        <TextReveal>
          <GradientText as="h1" gradient="accent">
            {title}
          </GradientText>
        </TextReveal>

        <FadeIn delay={0.3}>
          <p>{subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p>{description}</p>
        </FadeIn>

        <SlideUp delay={0.7}>
          <Magnetic>
            <Button>{ctaLabel}</Button>
          </Magnetic>
        </SlideUp>
      </div>

      <!-- Scroll indicator -->
      <ScrollIndicator />
    </div>
  </Container>
</Section>
```

---

### 3.2 ProjectGrid

경로: `src/components/sections/project-grid.tsx`
타입: Server Component (데이터 페칭) + Client 하위 컴포넌트 (필터링)

```tsx
interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
}

interface ProjectGridProps {
  projects: Project[];
  showFilter?: boolean;
}
```

구성:

```
<Section id="projects">
  <Container>
    <SectionHeader title="Projects" />
    {showFilter && <ProjectFilter />}    ← Client Component
    <BentoGrid columns={3}>
      {projects.map(project => (
        <BentoGridItem
          colSpan={project.featured ? 2 : 1}
          rowSpan={project.featured ? 2 : 1}
        >
          <ProjectCard project={project} />
        </BentoGridItem>
      ))}
    </BentoGrid>
  </Container>
</Section>
```

---

### 3.3 ProjectCard

경로: `src/components/sections/project-card.tsx`
타입: Client Component (`"use client"`) — hover 인터랙션

```tsx
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}
```

구성:

```
<Spotlight>
  <GlassCard hover>
    <Link href={`/projects/${project.slug}`}>
      <div className="relative overflow-hidden rounded-xl">
        <Image />                          ← 프로젝트 썸네일
        <div className="overlay" />        ← hover 시 그라디언트 오버레이
      </div>
      <div className="p-6">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="flex gap-2 mt-4">
          {project.tags.map(tag => <TechBadge name={tag} />)}
        </div>
      </div>
    </Link>
  </GlassCard>
</Spotlight>
```

---

### 3.4 ExperienceTimeline

경로: `src/components/sections/experience-timeline.tsx`
타입: Client Component (`"use client"`) — 스크롤 애니메이션

```tsx
interface TimelineItem {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  logo?: string;
}

interface ExperienceTimelineProps {
  items: TimelineItem[];
}
```

레이아웃:

- 중앙 세로선 (border-l 또는 SVG line)
- 각 아이템은 좌우 번갈아 배치 (desktop)
- 모바일에서는 모두 좌측 정렬
- ScrollTrigger로 각 아이템 순차 등장

---

### 3.5 TechStack

경로: `src/components/sections/tech-stack.tsx`
타입: Server Component

```tsx
interface TechCategory {
  name: string;
  items: Array<{
    name: string;
    icon: React.ReactNode;
    proficiency?: "learning" | "comfortable" | "expert";
  }>;
}

interface TechStackProps {
  categories: TechCategory[];
}
```

레이아웃:

```
카테고리별 그룹:
  Frontend | Backend | DevOps | Tools

각 카테고리 내에서 TechBadge를 flex-wrap으로 나열
```

---

### 3.6 ContactSection

경로: `src/components/sections/contact-section.tsx`
타입: Client Component (`"use client"`) — form 상태

```tsx
interface ContactSectionProps {
  email: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: React.ReactNode;
  }>;
}
```

구성:

```
<Section id="contact">
  <Container size="md">
    <GradientText as="h2">Get in Touch</GradientText>
    <p>설명 텍스트</p>

    <ContactForm />              ← Server Action 기반 폼

    <div className="flex gap-4">
      {socials.map(s => <IconButton icon={s.icon} label={s.platform} />)}
    </div>
  </Container>
</Section>
```

ContactForm 필드: name, email, message
Server Action으로 전송, 클라이언트에서 `useActionState` 사용.

---

### 3.7 BlogCard

경로: `src/components/sections/blog-card.tsx`
타입: Server Component

```tsx
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  thumbnail?: string;
}

interface BlogCardProps {
  post: BlogPost;
}
```

구성:

```
<GlassCard hover as="article">
  <Link href={`/blog/${post.slug}`}>
    {post.thumbnail && <Image />}
    <time>{post.date}</time>
    <h3>{post.title}</h3>
    <p>{post.excerpt}</p>
    <div className="flex gap-2">
      <span>{post.readingTime}</span>
      {post.tags.map(tag => <TechBadge name={tag} variant="ghost" size="sm" />)}
    </div>
  </Link>
</GlassCard>
```

---

## 4. Animation Components

모든 애니메이션 컴포넌트는 Client Component (`"use client"`).
`prefers-reduced-motion` 시 애니메이션 비활성화 필수.

### 4.1 FadeIn

경로: `src/components/animation/fade-in.tsx`

```tsx
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // 초 단위, default 0
  duration?: number; // 초 단위, default 0.6
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // px, default 40
  once?: boolean; // 한 번만 실행, default true
}
```

구현: GSAP + ScrollTrigger

```
gsap.from(element, {
  opacity: 0,
  y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  x: direction === "left" ? distance : direction === "right" ? -distance : 0,
  duration,
  delay,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 85%",
    toggleActions: once ? "play none none none" : "play reverse play reverse",
  },
})
```

---

### 4.2 SlideUp

경로: `src/components/animation/slide-up.tsx`

FadeIn의 단축 래퍼. direction="up" 고정.

```tsx
interface SlideUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}
```

---

### 4.3 StaggerChildren

경로: `src/components/animation/stagger-children.tsx`

자식 요소들을 순차적으로 등장시킨다.

```tsx
interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number; // 각 자식 간 딜레이, default 0.1
  delay?: number; // 전체 시작 딜레이, default 0
  animation?: "fadeUp" | "fadeIn" | "scaleUp";
}
```

구현:

- `containerRef`의 직계 자식을 `querySelectorAll(":scope > *")`로 선택
- `gsap.from(children, { stagger: stagger, ... })`
- ScrollTrigger로 뷰포트 진입 시 실행

---

### 4.4 Parallax

경로: `src/components/animation/parallax.tsx`

스크롤에 따라 느린/빠른 속도로 이동하는 패럴랙스 효과.

```tsx
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 ~ 1, default 0.5 (양수: 느리게, 음수: 빠르게)
  direction?: "vertical" | "horizontal";
}
```

구현: GSAP ScrollTrigger

```
gsap.to(element, {
  y: direction === "vertical" ? `${speed * 100}px` : 0,
  x: direction === "horizontal" ? `${speed * 100}px` : 0,
  ease: "none",
  scrollTrigger: {
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
})
```

---

### 4.5 TextReveal

경로: `src/components/animation/text-reveal.tsx`

텍스트를 글자/단어 단위로 순차 등장시킨다.

```tsx
interface TextRevealProps {
  children: string; // 텍스트 문자열
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "char" | "word"; // default "word"
  stagger?: number; // default 0.03 (char) / 0.08 (word)
  delay?: number;
  animation?: "fadeUp" | "clipReveal" | "blur";
}
```

구현:

1. 텍스트를 `splitBy` 기준으로 분할
2. 각 단위를 `<span>` 래핑 (inline-block)
3. GSAP stagger 애니메이션 적용

animation 프리셋:

```
fadeUp:     opacity 0→1, y 20→0
clipReveal: clipPath "inset(100% 0 0 0)" → "inset(0 0 0 0)"
blur:       filter "blur(10px)" → "blur(0)", opacity 0→1
```

---

### 4.6 CountUp

경로: `src/components/animation/count-up.tsx`

숫자가 카운트업되는 애니메이션.

```tsx
interface CountUpProps {
  end: number;
  start?: number; // default 0
  duration?: number; // 초, default 2
  suffix?: string; // "+", "%", "k" 등
  prefix?: string; // "$", ">" 등
  className?: string;
  separator?: string; // 천 단위 구분자, default ","
}
```

구현: GSAP로 `{ val: start }` → `{ val: end }` tween.
ScrollTrigger로 뷰포트 진입 시 시작, 한 번만 실행.

---

### 4.7 MagneticWrapper

경로: `src/components/animation/magnetic-wrapper.tsx`

Magnetic 컴포넌트의 경량 래퍼. 순수 CSS transform 기반.
Magnetic(ui/)은 독립 컴포넌트, MagneticWrapper(animation/)는 기존 요소에 자석 효과만 추가.

```tsx
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}
```

---

## 5. Hooks

### 5.1 useReducedMotion

경로: `src/hooks/use-reduced-motion.ts`

```tsx
function useReducedMotion(): boolean;
```

`prefers-reduced-motion: reduce` 미디어 쿼리 감지.
모든 애니메이션 컴포넌트에서 필수 사용.

---

### 5.2 useScrollProgress

경로: `src/hooks/use-scroll-progress.ts`

```tsx
function useScrollProgress(): number; // 0 ~ 1
```

페이지 전체 스크롤 진행률 반환.

---

### 5.3 useMediaQuery

경로: `src/hooks/use-media-query.ts`

```tsx
function useMediaQuery(query: string): boolean;
```

미디어 쿼리 매칭 상태 반환.
SSR hydration mismatch 방지: 초기값 false, mount 후 업데이트.

---

### 5.4 useActiveSection

경로: `src/hooks/use-active-section.ts`

```tsx
function useActiveSection(sectionIds: string[]): string | null;
```

Intersection Observer로 현재 뷰포트에 보이는 섹션 ID 반환.
FloatingNav의 활성 상태 표시에 사용.

---

## 6. Dependency Summary

현재 설치됨:

- `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` (shadcn)
- `lucide-react` (icons)
- `tw-animate-css` (animation)

추가 필요:

```
npm install gsap @gsap/react
npm install three @react-three/fiber @react-three/drei
npm install framer-motion    # (optional, 기본 mount/unmount용)
```

GSAP: ScrollTrigger, SplitText (club 플러그인 대안으로 자체 구현)
Three.js: dynamic import으로 lazy load (번들 분리)

---

## 7. Component Rendering Strategy

| Component                     | Type          | Rendering         |
| ----------------------------- | ------------- | ----------------- |
| Container, Section, GlassCard | Server        | Static            |
| BentoGrid, BentoGridItem      | Server        | Static            |
| GradientText, TechBadge       | Server        | Static            |
| IconButton, SkipNav, Footer   | Server        | Static            |
| Header, FloatingNav           | Client        | Interactive       |
| ThemeToggle, MobileNav        | Client        | Interactive       |
| ScrollProgress                | Client        | Interactive       |
| Magnetic, Spotlight           | Client        | Interactive       |
| FadeIn, SlideUp, Stagger      | Client        | Animation         |
| Parallax, TextReveal, CountUp | Client        | Animation         |
| HeroScene, FloatingShapes     | Client + Lazy | 3D                |
| ProjectCard                   | Client        | Hover interaction |
| ExperienceTimeline            | Client        | Scroll animation  |
| ContactSection                | Client        | Form state        |

---

## 8. Implementation Priority

### Phase 1 — Foundation

1. `Container`, `Section` — 레이아웃 기반
2. `GlassCard`, `BentoGrid` — 핵심 UI
3. `useReducedMotion`, `useMediaQuery` — 필수 hooks
4. `SkipNav` — 접근성

### Phase 2 — Navigation

5. `Header`, `FloatingNav`, `MobileNav`
6. `ThemeToggle`
7. `ScrollProgress`
8. `useActiveSection`, `useScrollProgress`

### Phase 3 — Animation

9. `FadeIn`, `SlideUp`, `StaggerChildren`
10. `TextReveal`, `CountUp`
11. `Parallax`
12. `Magnetic`, `Spotlight`, `MagneticWrapper`

### Phase 4 — Sections

13. `HeroSection` + `HeroScene` (Three.js)
14. `ProjectGrid`, `ProjectCard`
15. `ExperienceTimeline`
16. `TechStack`, `TechBadge`
17. `ContactSection`
18. `BlogCard`
19. `Footer`

### Phase 5 — Polish

20. `GradientText`, `IconButton`
21. 마이크로 인터랙션 세부 조정
22. 성능 최적화 (bundle, lazy load)
23. 접근성 검증

### Phase 6 - Content

24. 각 목적에 맞게 컨텐츠별 분리(메인은 히어로와 전체 개요, about은 소개, project는 실행한 프로젝트 등)

<!-- TODO 1: 메인 페이지는 비쥬얼만 놔두고 각 관심사별로 분리하기 -->
<!-- TODO 2: context 문제 확인하기  -->
