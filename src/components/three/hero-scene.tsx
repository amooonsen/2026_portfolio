"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface HeroSceneProps {
  className?: string
}

/**
 * Hero 섹션 배경 애니메이션 컴포넌트.
 * CSS gradient blob 애니메이션으로 몰입감 있는 배경을 생성한다.
 * prefers-reduced-motion 시 정적 배경으로 대체된다.
 */
export function HeroScene({ className }: HeroSceneProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[120px]",
          !reducedMotion && "animate-blob"
        )}
      />
      <div
        className={cn(
          "absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]",
          !reducedMotion && "animate-blob animation-delay-2000"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-1/4 left-1/3 h-[550px] w-[550px] rounded-full bg-pink-500/20 blur-[120px]",
          !reducedMotion && "animate-blob animation-delay-4000"
        )}
      />
    </div>
  )
}
