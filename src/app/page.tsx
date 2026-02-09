import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Button } from "@/components/ui/button"
import { SkipNav } from "@/components/layout/skip-nav"
import { Header } from "@/components/layout/header"
import { FloatingNav } from "@/components/layout/floating-nav"
import { ScrollProgress } from "@/components/layout/scroll-progress"

const navItems = [
  { label: "홈", href: "#home" },
  { label: "소개", href: "#about" },
  { label: "프로젝트", href: "#projects" },
  { label: "경력", href: "#experience" },
  { label: "연락처", href: "#contact" },
]

/**
 * 메인 페이지 컴포넌트.
 * Phase 1~2 Foundation 및 Navigation 컴포넌트를 통합하여 렌더링한다.
 */
export default function Home() {
  return (
    <>
      <SkipNav />
      <ScrollProgress />
      <Header items={navItems} />

      <main id="main-content" className="min-h-screen pt-16">
        <Section id="home" spacing="xl" container>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            프론트엔드 개발자
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            사용자 경험을 최우선으로, 세밀한 인터랙션과 성능 최적화에
            집중합니다.
          </p>
          <div className="mt-8 flex gap-4">
            <Button>프로젝트 보기</Button>
            <Button variant="outline">연락하기</Button>
          </div>
        </Section>

        <Section id="about" spacing="lg" container>
          <h2 className="text-3xl font-bold">소개</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            프론트엔드 개발자로 React, Next.js, TypeScript를 주력으로
            사용합니다. 웹 접근성과 성능 최적화에 깊은 관심을 갖고 있으며,
            사용자 중심의 인터페이스 설계를 지향합니다.
          </p>
        </Section>

        <Section id="projects" spacing="lg" container>
          <h2 className="text-3xl font-bold mb-8">프로젝트</h2>
          <BentoGrid columns={3}>
            <BentoGridItem colSpan={2} rowSpan={2}>
              <GlassCard hover padding="lg" className="h-full">
                <h3 className="text-2xl font-semibold">대시보드 플랫폼</h3>
                <p className="mt-2 text-muted-foreground">
                  실시간 데이터 시각화와 팀 협업을 위한 통합 대시보드
                </p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">디자인 시스템</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  일관된 UI를 위한 컴포넌트 라이브러리
                </p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">AI 챗봇</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  자연어 처리 기반 고객 상담 자동화
                </p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem colSpan={2}>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">이커머스 리디자인</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  전환율 40% 향상을 이끈 UX 개선 프로젝트
                </p>
              </GlassCard>
            </BentoGridItem>
            <BentoGridItem>
              <GlassCard hover className="h-full">
                <h3 className="text-lg font-medium">모바일 앱</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  React Native 크로스플랫폼 앱
                </p>
              </GlassCard>
            </BentoGridItem>
          </BentoGrid>
        </Section>

        <Section id="experience" spacing="lg" container>
          <h2 className="text-3xl font-bold">경력</h2>
          <div className="mt-8 space-y-6">
            <GlassCard padding="lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-xl font-semibold">
                    시니어 프론트엔드 개발자
                  </h3>
                  <p className="text-muted-foreground">스타트업 A사</p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">
                  2024 — 현재
                </span>
              </div>
              <p className="mt-3 text-muted-foreground">
                Next.js 기반 B2B SaaS 제품의 프론트엔드 아키텍처 설계 및
                개발을 리드했습니다.
              </p>
            </GlassCard>
            <GlassCard padding="lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-xl font-semibold">
                    프론트엔드 개발자
                  </h3>
                  <p className="text-muted-foreground">IT 기업 B사</p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">
                  2022 — 2024
                </span>
              </div>
              <p className="mt-3 text-muted-foreground">
                React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발에
                참여했습니다.
              </p>
            </GlassCard>
          </div>
        </Section>

        <Section id="contact" spacing="lg" container containerSize="md">
          <h2 className="text-3xl font-bold text-center">연락처</h2>
          <p className="mt-4 text-center text-muted-foreground">
            새로운 프로젝트나 협업에 관심이 있으시다면 편하게 연락해 주세요.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button>이메일 보내기</Button>
            <Button variant="outline">GitHub</Button>
            <Button variant="outline">LinkedIn</Button>
          </div>
        </Section>
      </main>

      <FloatingNav items={navItems} />
    </>
  )
}
