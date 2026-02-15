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

  // 새로고침 시 항상 최상단에서 시작
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // 모바일 기기 감지
    const isMobile = window.matchMedia("(max-width: 767px)").matches

    // reduced motion이거나 모바일이면 Lenis 비활성화
    if (prefersReducedMotion || isMobile) return

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      wheelMultiplier: 0.8,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    lenis.on("scroll", ScrollTrigger.update)

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [])

  return null
}
