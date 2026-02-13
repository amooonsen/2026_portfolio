"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { PartyPopper } from "lucide-react"
import { ScrollTrigger } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { GradientText } from "@/components/ui/gradient-text"
import { cn } from "@/lib/utils"

const CelebrationScene = dynamic(
  () => import("@/components/three/celebration-scene").then((mod) => mod.CelebrationScene),
  { ssr: false },
)

/**
 * 페이지 최하단 축하 애니메이션 컴포넌트.
 * 스크롤이 트리거 영역에 도달하면 3D 컨페티 파티클과 감사 메시지를 표시한다.
 */
export function PageEndCelebration() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [celebrating, setCelebrating] = useState(false)
  const [showScene, setShowScene] = useState(false)
  const celebratedRef = useRef(false)

  useEffect(() => {
    if (!triggerRef.current || reducedMotion) return

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (celebratedRef.current) return
        celebratedRef.current = true
        setShowScene(true)
        setCelebrating(true)
        setTimeout(() => setCelebrating(false), 6000)
        setTimeout(() => setShowScene(false), 8000)
      },
    })

    return () => st.kill()
  }, [reducedMotion])

  return (
    <>
      <div ref={triggerRef} className="flex flex-col items-center gap-4 py-20">
        <div
          className={cn(
            "text-center transition-all duration-700",
            celebrating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <PartyPopper className="mx-auto h-10 w-10 text-indigo-400" strokeWidth={1.5} />
          <GradientText as="p" gradient="primary" className="mt-2 text-xl font-bold">
            여기까지 봐주셔서 감사합니다!
          </GradientText>
          <p className="mt-1 text-sm text-muted-foreground">
            함께 성장할 기회를 기다리고 있습니다.
          </p>
        </div>
      </div>

      {showScene && !reducedMotion && <CelebrationScene active={celebrating} />}
    </>
  )
}
