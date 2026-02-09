"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

const CACHE_KEY = "portfolio-intro-seen"

interface IntroLoaderProps {
  /** 3D 씬 로딩 완료 여부 */
  isSceneReady: boolean
  children: React.ReactNode
}

/**
 * 3D 씬 로딩 중 표시되는 인트로 로딩 화면.
 * 프로그레스 바와 함께 우주적 분위기의 로딩 UI를 제공한다.
 * sessionStorage로 캐싱하여 세션 내 재방문 시 건너뛴다.
 * 항상 동일한 DOM 구조를 유지하여 레이아웃 시프트를 방지한다.
 * @param props.isSceneReady - 3D 씬 로딩 완료 신호
 * @param props.children - 로딩 완료 후 표시할 콘텐츠
 */
export function IntroLoader({ isSceneReady, children }: IntroLoaderProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const animRef = useRef<number | null>(null)

  // 마운트 시 캐시 확인
  useEffect(() => {
    setIsMounted(true)
    try {
      const seen = sessionStorage.getItem(CACHE_KEY)
      if (!seen) {
        setShouldShow(true)
      }
    } catch {
      setShouldShow(true)
    }
  }, [])

  // 프로그레스 시뮬레이션 + 실제 로딩 반영
  useEffect(() => {
    if (!shouldShow) return

    let start: number | null = null
    const duration = 2500

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start

      if (!isSceneReady) {
        const simulated = Math.min((elapsed / duration) * 80, 80)
        setProgress(simulated)
      } else {
        setProgress((prev) => {
          const next = prev + (100 - prev) * 0.08
          return next > 99 ? 100 : next
        })
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [shouldShow, isSceneReady])

  // 100% 도달 시 인트로 종료
  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(CACHE_KEY, "1")
    } catch {
      // ignore
    }
    setIsDismissed(true)
  }, [])

  useEffect(() => {
    if (progress >= 100 && shouldShow && !isDismissed) {
      const timer = setTimeout(dismiss, 400)
      return () => clearTimeout(timer)
    }
  }, [progress, shouldShow, isDismissed, dismiss])

  // 일관된 상태 계산
  const showOverlay = !isMounted || (shouldShow && !isDismissed)
  const contentVisible = isMounted && (!shouldShow || isDismissed)

  return (
    <>
      {/* 인트로 오버레이 — 항상 DOM에 존재, 가시성만 제어 */}
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014]",
          shouldShow ? "transition-all duration-700" : "",
          showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!showOverlay}
      >
        {shouldShow && (
          <>
            {/* 배경 그라디언트 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-600/15 blur-[100px] animate-pulse [animation-delay:1s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-pink-600/10 blur-[80px] animate-pulse [animation-delay:0.5s]" />
            </div>

            {/* 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Portfolio
                </h1>
                <p className="text-sm text-white/50 tracking-widest uppercase">
                  Frontend Developer
                </p>
              </div>

              {/* 프로그레스 바 */}
              <div className="w-64 md:w-80">
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 transition-[width] duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-center text-xs text-white/40 tabular-nums">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 메인 콘텐츠 — 항상 렌더링하여 3D 프리로드 지원 */}
      <div
        className={cn(
          shouldShow ? "transition-opacity duration-500" : "",
          contentVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </div>
    </>
  )
}
