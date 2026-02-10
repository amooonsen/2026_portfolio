"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * 페이지 트랜지션 템플릿.
 * 라우트 전환 시 아래에서 위로 블러와 함께 등장하는 애니메이션을 적용한다.
 * App Router의 template은 네비게이션마다 새로 마운트된다.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // 라우트 전환 시 스크롤 위치를 최상단으로 리셋
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!ref.current) return

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0, filter: "none" })
      ScrollTrigger.refresh()
      return
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => ScrollTrigger.refresh(),
      }
    )
  }, [reducedMotion])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
