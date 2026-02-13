"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getLenisInstance } from "@/lib/lenis-store"

/**
 * 뒤로/앞으로 네비게이션 감지를 위한 모듈 레벨 플래그.
 * popstate 이벤트 시 true로 설정되어 template 마운트 시 스크롤 리셋을 건너뛴다.
 */
let isTraversal = false

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isTraversal = true
  })
}

/**
 * 특정 경로에서는 항상 스크롤을 최상단으로 리셋해야 하는지 판별한다.
 * 프로젝트 상세 페이지처럼 콘텐츠가 다른 페이지는 항상 최상단에서 시작한다.
 */
function shouldAlwaysScrollTop(pathname: string): boolean {
  // /projects/[slug] 형태의 상세 페이지
  return /^\/projects\/[^/]+$/.test(pathname)
}

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
  const pathname = usePathname()

  // 라우트 전환 시 스크롤 위치 제어
  useEffect(() => {
    const wasTraversal = isTraversal
    isTraversal = false

    // 뒤로/앞으로 네비게이션이면서 상세 페이지가 아니면 스크롤 유지
    if (wasTraversal && !shouldAlwaysScrollTop(pathname)) {
      return
    }

    // Lenis 인스턴스가 준비될 때까지 대기 후 스크롤 리셋
    const scrollToTop = () => {
      const lenis = getLenisInstance()
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    scrollToTop()

    const timer = setTimeout(() => {
      scrollToTop()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

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
