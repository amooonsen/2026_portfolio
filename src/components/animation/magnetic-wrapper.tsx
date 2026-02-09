"use client"

import { useCallback, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface MagneticWrapperProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * 마우스 커서에 자석처럼 끌리는 효과의 경량 래퍼 컴포넌트.
 * 순수 CSS transform 기반으로 기존 요소에 자석 효과만 추가한다.
 * @param props.strength - 자석 강도 (0~1, 기본: 0.3)
 */
export function MagneticWrapper({
  children,
  className,
  strength = 0.3,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  /** 마우스 위치에 따라 요소 이동량을 계산한다. */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || reducedMotion) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      setTransform({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      })
    },
    [strength, reducedMotion]
  )

  /** 마우스 이탈 시 원위치로 복귀한다. */
  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "inline-block transition-transform duration-300 ease-out",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
    >
      {children}
    </div>
  )
}
