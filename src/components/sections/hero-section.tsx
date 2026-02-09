"use client"

import Link from "next/link"
import { Section } from "@/components/ui/section"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/animation/text-reveal"
import { FadeIn } from "@/components/animation/fade-in"
import { SlideUp } from "@/components/animation/slide-up"
import { Magnetic } from "@/components/ui/magnetic"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

/**
 * Hero 섹션 컴포넌트.
 * 3D 배경 위에 그라디언트 타이틀, CTA 버튼, 스크롤 인디케이터를 표시한다.
 * 배경 씬은 부모(page.tsx)에서 별도 렌더링한다.
 * @param props.title - 메인 타이틀
 * @param props.subtitle - 서브 타이틀
 * @param props.description - 설명 텍스트
 * @param props.ctaLabel - 주요 CTA 버튼 텍스트
 * @param props.ctaHref - 주요 CTA 링크
 * @param props.secondaryLabel - 보조 버튼 텍스트
 * @param props.secondaryHref - 보조 버튼 링크
 */
export function HeroSection({
  title,
  subtitle,
  description,
  ctaLabel = "프로젝트 보기",
  ctaHref = "/projects",
  secondaryLabel = "연락하기",
  secondaryHref = "/contact",
}: HeroSectionProps) {
  return (
    <Section spacing="xl" container>
      <div className="relative flex min-h-[calc(100vh-4rem)] items-center">
        <div className="relative z-10 w-full">
          <TextReveal
            as="h1"
            className="text-5xl font-bold tracking-tight text-white md:text-7xl"
            animation="fadeUp"
          >
            {subtitle}
          </TextReveal>

          <FadeIn delay={0.3}>
            <GradientText
              as="p"
              gradient="accent"
              className="mt-4 text-3xl font-bold md:text-5xl"
              animate
            >
              {title}
            </GradientText>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
              {description}
            </p>
          </FadeIn>

          <SlideUp delay={0.7}>
            <div className="mt-10 flex gap-4">
              <Magnetic>
                <Button size="lg" asChild>
                  <Link href={ctaHref}>{ctaLabel}</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              </Magnetic>
            </div>
          </SlideUp>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <FadeIn delay={1.2}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-white/40">스크롤</span>
              <div className="h-8 w-5 rounded-full border-2 border-white/20 p-0.5">
                <div className="h-2 w-full animate-bounce rounded-full bg-white/40" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
