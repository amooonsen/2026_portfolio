"use client"

import { useRef, useState } from "react"
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
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  /** 마우스 위치를 추적하여 스포트라이트 중심 좌표를 업데이트한다. */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, oklch(from ${color} l c h / ${opacity}), transparent)`,
          }}
        />
      )}
    </div>
  )
}
