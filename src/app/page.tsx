"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/sections/hero-section"
import { IntroLoader } from "@/components/layout/intro-loader"
import { Section } from "@/components/ui/section"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { OverviewCard } from "@/components/ui/overview-card"

const CosmicScene = dynamic(
  () =>
    import("@/components/three/cosmic-scene").then((mod) => mod.CosmicScene),
  { ssr: false }
)

const overviewItems = [
  {
    href: "/about",
    title: "소개",
    description: "프론트엔드 개발자로서의 여정과 기술 스택을 소개합니다.",
  },
  {
    href: "/projects",
    title: "프로젝트",
    description: "직접 기획하고 개발한 프로젝트들을 확인해 보세요.",
  },
  {
    href: "/experience",
    title: "경력",
    description: "성장하며 쌓아온 실무 경험을 타임라인으로 정리했습니다.",
  },
  {
    href: "https://blog.example.com",
    title: "블로그",
    description: "개발 경험과 기술적 인사이트를 공유합니다.",
    external: true,
  },
  {
    href: "/contact",
    title: "연락처",
    description: "새로운 프로젝트나 협업에 관심이 있으시다면 연락해 주세요.",
  },
]

/**
 * 메인 페이지 컴포넌트.
 * 3D 우주 배경의 Hero 섹션과 개요 카드를 표시한다.
 * 초기 로드 시 인트로 로딩 화면을 표시한다.
 */
export default function Home() {
  const [isSceneReady, setIsSceneReady] = useState(false)

  const handleSceneCreated = useCallback(() => {
    setIsSceneReady(true)
  }, [])

  return (
    <IntroLoader isSceneReady={isSceneReady}>
      {/* 3D 우주 배경 — fixed, 전체 화면 뒤 */}
      <CosmicScene onCreated={handleSceneCreated} />

      {/* 콘텐츠 — 배경 위에 표시 */}
      <div className="relative z-10">
        <HeroSection
          title="Frontend Developer"
          subtitle="프론트엔드 개발자"
          description="사용자 경험을 최우선으로, 세밀한 인터랙션과 성능 최적화에 집중합니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다."
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
      </div>
    </IntroLoader>
  )
}
