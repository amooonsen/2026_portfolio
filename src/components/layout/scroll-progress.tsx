"use client"

import { cn } from "@/lib/utils"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

interface ScrollProgressProps {
  className?: string
  color?: string
}

/**
 * 페이지 상단에 고정되는 스크롤 진행률 바.
 * scaleX transform으로 GPU 가속 애니메이션을 사용한다.
 * @param props.color - 바 색상 CSS 클래스 (기본: bg-primary)
 * @param props.className - 추가 CSS 클래스
 */
export function ScrollProgress({
  className,
  color = "bg-primary",
}: ScrollProgressProps) {
  const progress = useScrollProgress()

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] h-0.5 origin-left",
        color,
        className
      )}
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="페이지 스크롤 진행률"
    />
  )
}
