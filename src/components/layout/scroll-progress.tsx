"use client"

import {useEffect, useRef} from "react"
import {cn} from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  color?: string
}

/**
 * 페이지 상단에 고정되는 스크롤 진행률 바.
 * ref 기반 직접 DOM 조작으로 React 리렌더링 없이 매 프레임 업데이트한다.
 * @param props.color - 바 색상 CSS 클래스 (기본: bg-primary)
 */
export function ScrollProgress({
  className,
  color = "bg-primary",
}: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number | null = null

    function handleScroll() {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (!barRef.current) return
        const scrollTop = window.scrollY
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollTop / docHeight : 0
        barRef.current.style.transform = `scaleX(${progress})`
        barRef.current.setAttribute(
          "aria-valuenow",
          String(Math.round(progress * 100))
        )
      })
    }

    window.addEventListener("scroll", handleScroll, {passive: true})
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] h-0.5 origin-left",
        color,
        className
      )}
      style={{transform: "scaleX(0)"}}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="페이지 스크롤 진행률"
    />
  )
}
