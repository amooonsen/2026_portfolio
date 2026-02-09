"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "vertical" | "horizontal"
}

/**
 * 스크롤에 따라 요소가 다른 속도로 이동하는 패럴랙스 컴포넌트.
 * GSAP ScrollTrigger scrub 모드를 사용하여 부드러운 효과를 구현한다.
 * @param props.speed - 이동 속도 (-1~1, 양수: 느리게, 음수: 빠르게)
 * @param props.direction - 이동 방향 (vertical/horizontal)
 */
export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reducedMotion) return

    const distance = speed * 100

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        y: direction === "vertical" ? distance : 0,
        x: direction === "horizontal" ? distance : 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [reducedMotion, speed, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
