"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { PartyPopper, ArrowRight } from "lucide-react"
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
 * 폭죽 애니메이션 종료 후 연락처 CTA 버튼이 자연스럽게 교차 등장한다.
 */
export function PageEndCelebration() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [celebrating, setCelebrating] = useState(false)
  const [showScene, setShowScene] = useState(false)
  const [sceneFading, setSceneFading] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const celebratedRef = useRef(false)

  useEffect(() => {
    if (!triggerRef.current || reducedMotion) {
      // reduced motion 환경에서는 즉시 CTA 표시
      if (reducedMotion) setShowCta(true)
      return
    }

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (celebratedRef.current) return
        celebratedRef.current = true
        setShowScene(true)
        setCelebrating(true)
        // 폭죽 종료 시점에서 CTA 교차 등장
        setTimeout(() => setShowCta(true), 4500)
        setTimeout(() => setCelebrating(false), 6000)
        // 페이드아웃 시작 (1초간 opacity 0으로 전환)
        setTimeout(() => setSceneFading(true), 7000)
        // 페이드아웃 완료 후 언마운트
        setTimeout(() => setShowScene(false), 8000)
      },
    })

    return () => st.kill()
  }, [reducedMotion])

  return (
    <>
      <div ref={triggerRef} className="flex flex-col items-center gap-4 py-20">
        {/* 감사 메시지 */}
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

        {/* 연락처 CTA — 폭죽 종료 후 교차 등장 */}
        <div
          className={cn(
            "mt-6 transition-all duration-1000 ease-out",
            showCta
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 pointer-events-none",
          )}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-indigo-400/30 bg-indigo-500/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* 호버 시 배경 그라디언트 효과 */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">연락하기</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {showScene && !reducedMotion && (
        <div
          style={{
            opacity: sceneFading ? 0 : 1,
            transition: "opacity 1s ease-out",
          }}
        >
          <CelebrationScene active={celebrating} />
        </div>
      )}
    </>
  )
}
