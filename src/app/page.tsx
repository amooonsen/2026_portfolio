import { SkipNav } from "@/components/layout/skip-nav"
import { Header } from "@/components/layout/header"
import { FloatingNav } from "@/components/layout/floating-nav"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"

import { HeroSection } from "@/components/sections/hero-section"
import { ProjectGrid } from "@/components/sections/project-grid"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { TechStack } from "@/components/sections/tech-stack"
import { ContactSection } from "@/components/sections/contact-section"

import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { CountUp } from "@/components/animation/count-up"
import { BlogCard } from "@/components/sections/blog-card"

import type { Project } from "@/components/sections/project-card"
import type { TimelineItem } from "@/components/sections/experience-timeline"
import type { TechCategory } from "@/components/sections/tech-stack"
import type { BlogPost } from "@/components/sections/blog-card"

/* ─── 네비게이션 ─── */

const navItems = [
  { label: "홈", href: "#home" },
  { label: "소개", href: "#about" },
  { label: "프로젝트", href: "#projects" },
  { label: "기술", href: "#tech" },
  { label: "경력", href: "#experience" },
  { label: "블로그", href: "#blog" },
  { label: "연락처", href: "#contact" },
]

/* ─── 더미 데이터 ─── */

const projects: Project[] = [
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
    description: "일관된 UI를 위한 사내 컴포넌트 라이브러리. Storybook 문서화와 자동 시각적 회귀 테스트를 포함합니다.",
    tags: ["React", "Storybook", "Tailwind CSS"],
    links: { github: "#" },
  },
  {
    slug: "ai-chatbot",
    title: "AI 챗봇",
    description: "자연어 처리 기반 고객 상담 자동화 서비스. RAG 파이프라인으로 도메인 특화 응답을 제공합니다.",
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
    description: "React Native 크로스플랫폼 헬스케어 앱. 실시간 건강 데이터 추적 및 커뮤니티 기능.",
    tags: ["React Native", "Expo", "Firebase"],
    links: { github: "#", live: "#" },
  },
]

const experiences: TimelineItem[] = [
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

const techCategories: TechCategory[] = [
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

const blogPosts: BlogPost[] = [
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

const socials = [
  {
    platform: "GitHub",
    url: "https://github.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    platform: "Twitter",
    url: "https://twitter.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
]

/* ─── 메인 페이지 ─── */

/**
 * 메인 페이지 컴포넌트.
 * Phase 1~4 Foundation, Navigation, Animation, Section 컴포넌트를 통합하여 렌더링한다.
 */
export default function Home() {
  return (
    <>
      <SkipNav />
      <ScrollProgress />
      <Header items={navItems} />

      <main id="main-content" className="min-h-screen pt-16">
        {/* Hero */}
        <HeroSection
          title="Frontend Developer"
          subtitle="프론트엔드 개발자"
          description="사용자 경험을 최우선으로, 세밀한 인터랙션과 성능 최적화에 집중합니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다."
          ctaLabel="프로젝트 보기"
          ctaHref="#projects"
          secondaryLabel="연락하기"
          secondaryHref="#contact"
        />

        {/* 소개 + 통계 */}
        <Section id="about" spacing="lg" container>
          <FadeIn>
            <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
              About
            </GradientText>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              프론트엔드 개발자로 React, Next.js, TypeScript를 주력으로
              사용합니다. 웹 접근성과 성능 최적화에 깊은 관심을 갖고 있으며,
              사용자 중심의 인터페이스 설계를 지향합니다.
            </p>
          </FadeIn>
          <StaggerChildren className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            <GlassCard className="text-center">
              <div className="text-3xl font-bold">
                <CountUp end={50} suffix="+" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                완료 프로젝트
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-3xl font-bold">
                <CountUp end={3} suffix="년+" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">개발 경력</p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-3xl font-bold">
                <CountUp end={99} suffix="%" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                코드 품질 목표
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-3xl font-bold">
                <CountUp end={15} suffix="개" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                기술 스택
              </p>
            </GlassCard>
          </StaggerChildren>
        </Section>

        {/* 프로젝트 */}
        <ProjectGrid projects={projects} />

        {/* 기술 스택 */}
        <TechStack categories={techCategories} />

        {/* 경력 */}
        <ExperienceTimeline items={experiences} />

        {/* 블로그 */}
        <Section id="blog" spacing="lg" container>
          <FadeIn>
            <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
              Blog
            </GradientText>
            <p className="mt-2 text-muted-foreground">
              개발 경험과 기술적 인사이트를 공유합니다.
            </p>
          </FadeIn>
          <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </StaggerChildren>
        </Section>

        {/* 연락처 */}
        <ContactSection email="hello@example.com" socials={socials} />
      </main>

      <Footer socials={socials} />
      <FloatingNav items={navItems} />
    </>
  )
}
