"use client"

import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  size?: number
  color?: string
  opacity?: number
}

/**
 * 마우스를 따라다니는 스포트라이트 효과 컴포넌트.
 * 카드 hover 시 커서 위치에 radial-gradient 조명 효과를 생성한다.
 * ref 기반 DOM 직접 조작으로 re-render 없이 60fps 추적을 구현한다.
 * @param props.size - 스포트라이트 크기 (px, 기본: 400)
 * @param props.color - 스포트라이트 색상 (CSS 색상값, 기본: "white")
 * @param props.opacity - 스포트라이트 불투명도 (0~1, 기본: 0.08)
 */
export function Spotlight({
  children,
  className,
  size = 400,
  color = "white",
  opacity = 0.08,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current || !overlayRef.current || reducedMotion) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    overlayRef.current.style.background =
      `radial-gradient(${size}px circle at ${x}px ${y}px, oklch(from ${color} l c h / ${opacity}), transparent)`
  }

  function handleMouseEnter() {
    if (overlayRef.current) overlayRef.current.style.opacity = "1"
  }

  function handleMouseLeave() {
    if (overlayRef.current) overlayRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {!reducedMotion && (
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      )}
    </div>
  )
}
