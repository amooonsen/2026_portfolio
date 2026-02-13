import { HeroSection } from "@/components/sections/hero-section"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { OverviewCard } from "@/components/ui/overview-card"
import { overviewItems } from "@/data/constants/overview"
import { HomeClient } from "@/components/home-client"

/**
 * 메인 페이지 컴포넌트.
 * 3D 우주 배경의 Hero 섹션과 개요 카드를 표시한다.
 * 초기 로드 시 인트로 로딩 화면을 표시한다.
 */
export default function Home() {
  return (
    <HomeClient>
      <HeroSection
        title="Frontend Developer"
        subtitle="조경문"
        description="4년차 프론트엔드 개발자입니다. 사용자 경험을 최우선으로, 세밀한 인터랙션과 성능 최적화에 집중합니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다."
        ctaLabel="프로젝트 보기"
        ctaHref="/projects"
        secondaryLabel="연락하기"
        secondaryHref="/contact"
      />

      <Section spacing="lg" container>
        <FadeIn>
          <h2 className="text-2xl font-bold text-white">둘러보기</h2>
          <p className="mt-2 text-white/60">
            포트폴리오의 각 섹션을 살펴보세요.
          </p>
        </FadeIn>
        <StaggerChildren className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overviewItems.map((item) => (
            <OverviewCard key={item.href} {...item} />
          ))}
        </StaggerChildren>
      </Section>
    </HomeClient>
  )
}
