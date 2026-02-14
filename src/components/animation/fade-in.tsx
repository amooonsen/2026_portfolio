"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGsapContext } from "@/hooks/use-gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

/**
 * GSAP ScrollTrigger 기반 페이드인 애니메이션 컴포넌트.
 * 뷰포트 진입 시 지정된 방향에서 요소가 등장한다.
 * @param props.delay - 애니메이션 시작 지연 시간 (초)
 * @param props.duration - 애니메이션 지속 시간 (초)
 * @param props.direction - 등장 방향 (up/down/left/right/none)
 * @param props.distance - 이동 거리 (px)
 * @param props.once - true면 한 번만 실행, false면 스크롤에 따라 반복
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(ref, () => {
    if (!ref.current) return

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, x: 0, y: 0 })
      return
    }

    const y =
      direction === "up"
        ? distance
        : direction === "down"
          ? -distance
          : 0
    const x =
      direction === "left"
        ? distance
        : direction === "right"
          ? -distance
          : 0

    gsap.set(ref.current, { opacity: 0, y, x })

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    })
  }, [reducedMotion, delay, duration, direction, distance, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
