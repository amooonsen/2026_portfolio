"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGsapContext } from "@/hooks/use-gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Container } from "@/components/ui/container"
import { OverviewCard } from "@/components/ui/overview-card"
import { overviewItems } from "@/data/constants/overview"

/**
 * 메인 페이지 개요 섹션 컴포넌트.
 * 각 포트폴리오 섹션으로의 네비게이션 카드를 표시한다.
 */
export function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(
    sectionRef,
    () => {
      if (reducedMotion) return

      // 헤더 fade in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      // 카드 stagger
      const cards = gridRef.current?.querySelectorAll(".overview-card-item")
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }

      // 배경 subtle parallax
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    },
    [reducedMotion]
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <Container>
        {/* 배경 장식 */}
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        >
          <div className="absolute left-1/4 top-0 size-96 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 size-96 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 blur-3xl" />
        </div>

        {/* 헤더 */}
        <div ref={headerRef} className="text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            더 알아보기
          </h2>
          <p className="mt-4 text-lg text-white/60">
            각 페이지에서 더 자세한 이야기를 확인하세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {overviewItems.map((item) => (
            <div key={item.href} className="overview-card-item">
              <OverviewCard {...item} />
            </div>
          ))}
        </div>

        {/* 하단 장식선 */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </Container>
    </section>
  )
}
