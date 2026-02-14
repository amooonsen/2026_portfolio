"use client"

import {useEffect, useRef} from "react"
import {useGsapContext} from "@/hooks/use-gsap"
import {Section} from "@/components/ui/section"
import {GradientText} from "@/components/ui/gradient-text"
import {FadeIn} from "@/components/animation/fade-in"
import {gsap} from "@/lib/gsap"
import {useReducedMotion} from "@/hooks/use-reduced-motion"
import {cn} from "@/lib/utils"

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

/** 카테고리별 액센트 색상 매핑 — 라이트: 600, 다크: 400 */
const categoryColors: Record<string, {border: string; bg: string; text: string; glow: string; rgb: string}> = {
  Frontend: {
    border: "border-indigo-500/20 dark:border-indigo-400/30",
    bg: "bg-indigo-500/5 dark:bg-indigo-400/5",
    text: "text-indigo-600 dark:text-indigo-400",
    glow: "group-hover:shadow-indigo-500/15 dark:group-hover:shadow-indigo-400/20",
    rgb: "99, 102, 241",
  },
  "State & Form": {
    border: "border-violet-500/20 dark:border-violet-400/30",
    bg: "bg-violet-500/5 dark:bg-violet-400/5",
    text: "text-violet-600 dark:text-violet-400",
    glow: "group-hover:shadow-violet-500/15 dark:group-hover:shadow-violet-400/20",
    rgb: "139, 92, 246",
  },
  "Animation & Visualization": {
    border: "border-pink-500/20 dark:border-pink-400/30",
    bg: "bg-pink-500/5 dark:bg-pink-400/5",
    text: "text-pink-600 dark:text-pink-400",
    glow: "group-hover:shadow-pink-500/15 dark:group-hover:shadow-pink-400/20",
    rgb: "236, 72, 153",
  },
  "Backend & Infra": {
    border: "border-emerald-500/20 dark:border-emerald-400/30",
    bg: "bg-emerald-500/5 dark:bg-emerald-400/5",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "group-hover:shadow-emerald-500/15 dark:group-hover:shadow-emerald-400/20",
    rgb: "16, 185, 129",
  },
  Tools: {
    border: "border-amber-500/20 dark:border-amber-400/30",
    bg: "bg-amber-500/5 dark:bg-amber-400/5",
    text: "text-amber-600 dark:text-amber-400",
    glow: "group-hover:shadow-amber-500/15 dark:group-hover:shadow-amber-400/20",
    rgb: "245, 158, 11",
  },
}

const defaultColor = {
  border: "border-glass-hover-border",
  bg: "bg-glass-bg",
  text: "text-foreground/80",
  glow: "group-hover:shadow-glass-shadow",
  rgb: "148, 163, 184",
}

/**
 * 기술 스택 섹션 컴포넌트.
 * 카테고리별 색상 강조, 3D tilt 호버, 교차 방향 진입 애니메이션을 포함한다.
 */
export function TechStack({categories}: TechStackProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // GSAP 스크롤 등장 애니메이션
  useGsapContext(gridRef, () => {
    if (!gridRef.current || reducedMotion) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-tech-card]")
    if (cards.length === 0) return

    // 카드별 교차 방향 진입 (좌/우 교대) + 회전 + 스케일
    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0
      gsap.set(card, {
        opacity: 0,
        x: fromLeft ? -80 : 80,
        y: 40,
        rotateY: fromLeft ? -8 : 8,
        scale: 0.92,
      })

      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    })

    // 카드 내 뱃지 stagger 등장 + 바운스
    cards.forEach((card) => {
      const badges = card.querySelectorAll("[data-tech-badge]")
      if (badges.length === 0) return

      gsap.set(badges, {opacity: 0, scale: 0.6, y: 20, rotateX: -30})

      gsap.to(badges, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    })

    // 카테고리 도트 펄스 — CSS @keyframes로 위임 (off-screen 시 GPU 유휴)
    const dots = gridRef.current.querySelectorAll<HTMLElement>("[data-category-dot]")
    dots.forEach((dot) => {
      dot.classList.add("animate-dot-pulse")
    })
  }, [reducedMotion])

  // 3D tilt 효과 (마우스 트래킹)
  useEffect(() => {
    if (!gridRef.current || reducedMotion) return

    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-tech-card]")

    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(this, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.4,
        ease: "power2.out",
      })

      // 마우스 위치에 따라 내부 광원 효과
      const inner = this.querySelector<HTMLElement>("[data-card-glow]")
      if (inner) {
        inner.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(var(--card-rgb), 0.15) 0%, transparent 60%)`
      }
    }

    function handleMouseLeave(this: HTMLElement) {
      gsap.to(this, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      const inner = this.querySelector<HTMLElement>("[data-card-glow]")
      if (inner) {
        inner.style.background = "transparent"
      }
    }

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove)
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove)
        card.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [reducedMotion])

  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          Tech Stack
        </GradientText>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            <span className="text-accent-highlight">실무에서 검증된 기술</span>을 기반으로
            효율적이고 확장 가능한 시스템을 구축합니다.
            <br />
            각 기술의 선택에는{" "}
            <span className="text-accent-highlight">명확한 이유</span>가 있습니다.
          </p>
        </FadeIn>
      </FadeIn>

      <div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-2 perspective-1000">
        {categories.map((category) => {
          const color = categoryColors[category.name] ?? defaultColor
          const rgb = "rgb" in color ? color.rgb : defaultColor.rgb

          return (
            <div
              key={category.name}
              data-tech-card
              tabIndex={0}
              className={cn(
                "group relative rounded-2xl border backdrop-blur-xl p-6 transition-shadow duration-300 preserve-3d",
                "bg-glass-bg hover:bg-glass-hover-bg",
                color.border,
                "hover:shadow-xl",
                color.glow,
                "focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none",
              )}
              style={{["--card-rgb" as string]: rgb}}
            >
              {/* 마우스 트래킹 광원 오버레이 */}
              <div
                data-card-glow
                className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* 카테고리 헤더 */}
              <div className="relative mb-5 flex items-center gap-3">
                {/* 펄스 도트 */}
                <span className="relative inline-flex">
                  <span
                    className={cn(
                      "inline-block h-3 w-3 rounded-full border",
                      color.bg,
                      color.border,
                    )}
                    aria-hidden="true"
                  />
                  <span
                    data-category-dot
                    className={cn(
                      "absolute inset-0 rounded-full",
                      color.bg,
                    )}
                    aria-hidden="true"
                  />
                </span>
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
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium",
                      "border-glass-border bg-glass-bg text-foreground/90",
                      "transition-all duration-200",
                      "hover:border-glass-hover-border hover:bg-glass-hover-bg hover:text-foreground",
                      "hover:-translate-y-0.5 hover:shadow-md",
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

export type {TechCategory, TechItem}
