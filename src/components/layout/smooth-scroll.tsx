"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "@/lib/gsap"
import { setLenisInstance } from "@/lib/lenis-store"

/**
 * Lenis 기반 스무스 스크롤 컴포넌트.
 * GSAP ScrollTrigger와 연동하여 부드러운 스크롤을 제공한다.
 * 모바일 기기에서는 비활성화하여 네이티브 스크롤을 사용한다.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // 모바일 기기 감지
    const isMobile = window.matchMedia("(max-width: 767px)").matches

    // reduced motion이거나 모바일이면 Lenis 비활성화
    if (prefersReducedMotion || isMobile) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    lenis.on("scroll", ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [])

  return null
}
