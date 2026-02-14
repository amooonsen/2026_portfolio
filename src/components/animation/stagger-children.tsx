"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const fromMap = {
  fadeUp: { opacity: 0, y: 30 },
  fadeIn: { opacity: 0 },
  scaleUp: { opacity: 0, scale: 0.8 },
} as const

const toMap = {
  fadeUp: { opacity: 1, y: 0 },
  fadeIn: { opacity: 1 },
  scaleUp: { opacity: 1, scale: 1 },
} as const

interface StaggerChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  animation?: keyof typeof fromMap
}

/**
 * 자식 요소들을 순차적으로 등장시키는 애니메이션 컴포넌트.
 * ScrollTrigger로 뷰포트 진입 시 직계 자식을 stagger 방식으로 애니메이션한다.
 * @param props.stagger - 각 자식 간 딜레이 (초)
 * @param props.delay - 전체 시작 딜레이 (초)
 * @param props.animation - 애니메이션 프리셋 (fadeUp/fadeIn/scaleUp)
 */
export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  animation = "fadeUp",
  ...rest
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const items = containerRef.current.querySelectorAll(":scope > *")
    if (items.length === 0) return

    // 초기 상태 즉시 적용
    gsap.set(items, fromMap[animation])

    const ctx = gsap.context(() => {
      gsap.to(items, {
        ...toMap[animation],
        duration: 0.6,
        stagger,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    })

    return () => ctx.revert()
  }, [reducedMotion, stagger, delay, animation])

  return (
    <div ref={containerRef} className={className} {...rest}>
      {children}
    </div>
  )
}
