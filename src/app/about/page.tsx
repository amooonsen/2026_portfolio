import type { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { CountUp } from "@/components/animation/count-up"
import { TechStack } from "@/components/sections/tech-stack"
import { techCategories } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "소개",
}

/**
 * 소개 페이지.
 * 자기소개, 통계, 기술 스택을 포함한다.
 */
export default function AboutPage() {
  return (
    <>
      <Section spacing="lg" container>
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
            <p className="mt-1 text-sm text-muted-foreground">완료 프로젝트</p>
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
            <p className="mt-1 text-sm text-muted-foreground">코드 품질 목표</p>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-3xl font-bold">
              <CountUp end={15} suffix="개" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">기술 스택</p>
          </GlassCard>
        </StaggerChildren>
      </Section>

      <TechStack categories={techCategories} />
    </>
  )
}
