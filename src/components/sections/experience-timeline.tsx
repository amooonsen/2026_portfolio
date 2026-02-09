"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { TechBadge } from "@/components/ui/tech-badge"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { cn } from "@/lib/utils"

interface TimelineItem {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

interface ExperienceTimelineProps {
  items: TimelineItem[]
}

/**
 * 경력 타임라인 섹션 컴포넌트.
 * 중앙 세로선을 기준으로 좌우 번갈아 배치하며 GSAP ScrollTrigger로 순차 등장한다.
 * 모바일에서는 좌측 정렬 레이아웃으로 전환된다.
 * @param props.items - 경력 항목 배열
 */
export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const cards = containerRef.current.querySelectorAll("[data-timeline-item]")

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0
        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          Experience
        </GradientText>
        <p className="mt-2 text-muted-foreground">
          성장하며 쌓아온 경험들입니다.
        </p>
      </FadeIn>

      <div ref={containerRef} className="relative mt-12">
        {/* 중앙 세로선 */}
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-px" />

        <div className="space-y-8 md:space-y-12">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={`${item.company}-${item.period}`}
                data-timeline-item
                className={cn(
                  "relative md:flex md:w-1/2",
                  isLeft
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                )}
              >
                {/* 타임라인 도트 */}
                <div
                  className={cn(
                    "absolute top-6 hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block",
                    isLeft ? "md:-right-1.5" : "md:-left-1.5"
                  )}
                />

                <GlassCard padding="lg" className="w-full">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.role}</h3>
                      <p className="text-muted-foreground">{item.company}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-3 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export type { TimelineItem }
