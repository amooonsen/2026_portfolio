"use client"

import {useRef} from "react"
import {useReducedMotion} from "@/hooks/use-reduced-motion"
import {cn} from "@/lib/utils"

interface MagneticWrapperProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * 마우스 커서에 자석처럼 끌리는 효과의 경량 래퍼 컴포넌트.
 * ref 기반 직접 DOM 조작으로 React 리렌더링 없이 동작한다.
 * @param props.strength - 자석 강도 (0~1, 기본: 0.3)
 */
export function MagneticWrapper({
  children,
  className,
  strength = 0.3,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * strength
    const y = (e.clientY - centerY) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-block transition-transform duration-300 ease-out",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
