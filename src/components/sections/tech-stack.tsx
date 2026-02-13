"use client"

import { useEffect, useRef } from "react"
import { Section } from "@/components/ui/section"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface TechItem {
  name: string
  icon?: React.ReactNode
}

interface TechCategory {
  name: string
  items: TechItem[]
}

interface TechStackProps {
  categories: TechCategory[]
}

/** 카테고리별 액센트 색상 매핑 */
const categoryColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  Frontend: {
    border: "border-indigo-400/30",
    bg: "bg-indigo-400/5",
    text: "text-indigo-400",
    glow: "group-hover:shadow-indigo-400/20",
  },
  "State & Form": {
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
    text: "text-violet-400",
    glow: "group-hover:shadow-violet-400/20",
  },
  "Animation & Visualization": {
    border: "border-pink-400/30",
    bg: "bg-pink-400/5",
    text: "text-pink-400",
    glow: "group-hover:shadow-pink-400/20",
  },
  "Backend & Infra": {
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
    text: "text-emerald-400",
    glow: "group-hover:shadow-emerald-400/20",
  },
  Tools: {
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    text: "text-amber-400",
    glow: "group-hover:shadow-amber-400/20",
  },
}

const defaultColor = {
  border: "border-white/20",
  bg: "bg-white/5",
  text: "text-white/80",
  glow: "group-hover:shadow-white/10",
}

/**
 * 기술 스택 섹션 컴포넌트.
 * 카테고리별 색상 강조, 개별 뱃지 stagger 등장 애니메이션을 포함한다.
 */
export function TechStack({ categories }: TechStackProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reducedMotion) return

    const cards = gridRef.current.querySelectorAll("[data-tech-card]")
    if (cards.length === 0) return

    // 초기 상태 설정
    gsap.set(cards, { opacity: 0, y: 40 })

    const ctx = gsap.context(() => {
      // 카드별 순차 등장
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      // 카드 내 뱃지 stagger 등장
      cards.forEach((card) => {
        const badges = card.querySelectorAll("[data-tech-badge]")
        if (badges.length === 0) return

        gsap.set(badges, { opacity: 0, scale: 0.8, y: 10 })

        gsap.to(badges, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.4)",
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
          Tech Stack
        </GradientText>
        <p className="mt-2 text-muted-foreground">
          주력으로 사용하는 기술들입니다.
        </p>
      </FadeIn>

      <div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-2">
        {categories.map((category) => {
          const color = categoryColors[category.name] ?? defaultColor

          return (
            <div
              key={category.name}
              data-tech-card
              className={cn(
                "group relative rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300",
                "bg-white/[0.03] hover:bg-white/[0.07]",
                color.border,
                "hover:shadow-lg",
                color.glow,
              )}
            >
              {/* 카테고리 헤더 */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={cn(
                    "inline-block h-3 w-3 rounded-full",
                    color.bg,
                    color.border,
                    "border",
                  )}
                  style={{
                    boxShadow: `0 0 8px currentColor`,
                  }}
                  aria-hidden="true"
                />
                <h3 className={cn("text-lg font-semibold", color.text)}>
                  {category.name}
                </h3>
                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                  {category.items.length}
                </span>
              </div>

              {/* 기술 뱃지 */}
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    data-tech-badge
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                      "border-white/10 bg-white/[0.04] text-white/90",
                      "hover:border-white/25 hover:bg-white/[0.08] hover:text-white",
                      "hover:shadow-sm",
                    )}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export type { TechCategory, TechItem }
