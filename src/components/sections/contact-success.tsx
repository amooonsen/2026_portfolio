"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"
import { useGsapContext } from "@/hooks/use-gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home } from "lucide-react"

/** 스파클 위치 — 원 주변 12개, 결정론적 의사 난수 분포 */
const SPARKLE_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  const radius = 60 + (((i * 7 + 3) % 12) / 12) * 20
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    size: 3 + (((i * 5 + 1) % 12) / 12) * 4,
  }
})

/**
 * 연락 전송 성공 시 표시되는 애니메이션 컴포넌트.
 * GSAP 타임라인으로 체크마크 드로우 → 스파클 → 텍스트 리빌 → 버튼 등장을 빠르게 연출한다.
 */
export function ContactSuccess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const checkRef = useRef<SVGPathElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(containerRef, () => {
    if (!containerRef.current) return

    if (reducedMotion) {
      gsap.set(containerRef.current.querySelectorAll("[data-anim]"), {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      if (circleRef.current) circleRef.current.style.strokeDashoffset = "0"
      if (checkRef.current) checkRef.current.style.strokeDashoffset = "0"
      return
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // 컨테이너 페이드인
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3 },
    )

    // 원 드로우
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 40
      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      })
      tl.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: 0.45,
        ease: "power2.inOut",
      }, "-=0.05")
    }

    // 체크마크 드로우
    if (checkRef.current) {
      const checkLength = checkRef.current.getTotalLength()
      gsap.set(checkRef.current, {
        strokeDasharray: checkLength,
        strokeDashoffset: checkLength,
      })
      tl.to(checkRef.current, {
        strokeDashoffset: 0,
        duration: 0.25,
        ease: "power2.out",
      }, "-=0.1")
    }

    // 스파클 폭발
    if (sparklesRef.current) {
      const sparkles = sparklesRef.current.querySelectorAll("[data-sparkle]")
      gsap.set(sparkles, { scale: 0, opacity: 0 })
      tl.to(sparkles, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        stagger: { each: 0.02, from: "random" },
        ease: "back.out(3)",
      }, "-=0.15")
      tl.to(sparkles, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        stagger: { each: 0.015, from: "random" },
        ease: "power2.in",
      }, "+=0.1")
    }

    // 펄스 효과
    tl.to("[data-check-group]", {
      scale: 1.1,
      duration: 0.12,
      ease: "power2.in",
    }, "-=0.4")
      .to("[data-check-group]", {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1.2, 0.5)",
      })

    // 타이틀 글자별 리빌
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll("[data-word]")
      gsap.set(words, { yPercent: 100, opacity: 0 })
      tl.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.04,
        ease: "power3.out",
      }, "-=0.25")
    }

    // 설명 텍스트
    if (descRef.current) {
      gsap.set(descRef.current, { opacity: 0, y: 10 })
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.3 }, "-=0.1")
    }

    // 버튼 등장
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("[data-btn]")
      gsap.set(buttons, { opacity: 0, y: 15, scale: 0.95 })
      tl.to(buttons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.08,
        ease: "back.out(1.5)",
      }, "-=0.05")
    }
  }, [reducedMotion])

  // 스파클 위치 (원 주변 12개) — 결정론적 분포
  const sparklePositions = SPARKLE_POSITIONS

  const titleText = "감사합니다!"

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center py-8"
      style={{ opacity: reducedMotion ? 1 : 0 }}
    >
      {/* 체크마크 + 스파클 */}
      <div className="relative mb-8 flex h-[140px] w-[140px] items-center justify-center">
        <div ref={sparklesRef} className="absolute inset-0">
          {sparklePositions.map((pos, i) => (
            <span
              key={i}
              data-sparkle
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: pos.size,
                height: pos.size,
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                background: i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#a78bfa" : "#f472b6",
                boxShadow: `0 0 ${pos.size * 2}px currentColor`,
              }}
            />
          ))}
        </div>

        <svg
          data-check-group
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          className="relative z-10"
          aria-hidden="true"
        >
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="40"
            stroke="url(#check-gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <path
            ref={checkRef}
            d="M30 52 L44 66 L70 36"
            stroke="url(#check-gradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="check-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 타이틀 */}
      <h3 ref={titleRef} className="mb-3 text-2xl font-bold text-foreground" aria-label={titleText}>
        {titleText.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span data-word className="inline-block">{char}</span>
          </span>
        ))}
      </h3>

      {/* 설명 */}
      <p ref={descRef} data-anim className="mb-8 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
        메시지가 성공적으로 전송되었습니다.
        <br />
        빠른 시일 내에 답변 드리겠습니다.
      </p>

      {/* 버튼 */}
      <div ref={buttonsRef} className="flex gap-4">
        <div data-btn>
          <Button variant="outline" size="lg" className="gap-2 border-glass-hover-border text-foreground hover:bg-glass-hover-bg" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              홈으로
            </Link>
          </Button>
        </div>
        <div data-btn>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/projects">
              프로젝트 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
