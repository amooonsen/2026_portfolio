"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getLenisInstance } from "@/lib/lenis-store"

/**
 * 페이지 트랜지션 템플릿.
 * 라우트 전환 시 아래에서 위로 블러와 함께 등장하는 애니메이션을 적용한다.
 * 모바일에서는 간소화된 페이드인 애니메이션을 사용한다.
 * App Router의 template은 네비게이션마다 새로 마운트된다.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")

  // 라우트 전환 시 스크롤 위치를 최상단으로 리셋 (Lenis 내부 상태 포함)
  useEffect(() => {
    // Lenis 인스턴스가 준비될 때까지 대기 후 스크롤 리셋
    const scrollToTop = () => {
      const lenis = getLenisInstance()
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    // 즉시 실행
    scrollToTop()

    // Lenis 초기화를 위한 재시도 로직 (100ms 후)
    const timer = setTimeout(() => {
      scrollToTop()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ref.current) return

    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0, filter: "none" })
      ScrollTrigger.refresh()
      return
    }

    // 모바일에서는 간소화된 페이드인 애니메이션
    if (isMobile) {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh(),
        }
      )
      return
    }

    // 데스크톱: 블러 + 슬라이드 애니메이션
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          // filter: blur(0px)가 인라인 스타일에 남으면 새로운 containing block이 생성되어
          // 하위 요소의 position: sticky가 깨짐 → "none"으로 명시 제거
          if (ref.current) {
            ref.current.style.filter = "none"
            ref.current.style.transform = "none"
          }
          ScrollTrigger.refresh()
        },
      }
    )
  }, [reducedMotion, isMobile])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
