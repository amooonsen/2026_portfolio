"use client"

import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  disabled?: boolean
}

/**
 * 마우스 커서에 자석처럼 끌리는 효과 컴포넌트.
 * 감지 반경(radius) 내에 커서가 들어오면 요소가 커서를 향해 이동한다.
 * ref-based DOM 조작으로 React 리렌더 없이 transform을 직접 업데이트한다.
 * prefers-reduced-motion 또는 disabled 시 효과가 비활성화된다.
 * @param props.strength - 자석 강도 (0~1, 기본: 0.3)
 * @param props.radius - 감지 반경 (px, 기본: 150)
 * @param props.disabled - 효과 비활성화 여부
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  radius = 150,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const isActive = !disabled && !reducedMotion

  /** 마우스 위치와 요소 중심 간 거리를 계산하여 이동량을 결정한다. */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !isActive) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < radius) {
      const factor = 1 - distance / radius
      ref.current.style.transform = `translate(${distX * strength * factor}px, ${distY * strength * factor}px)`
    } else {
      ref.current.style.transform = "translate(0px, 0px)"
    }
  }

  /** 마우스 이탈 시 CSS transition으로 원위치 복귀한다. */
  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = "translate(0px, 0px)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-block transition-transform duration-200 ease-out",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
