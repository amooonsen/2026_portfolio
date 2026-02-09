"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  splitBy?: "char" | "word"
  stagger?: number
  delay?: number
  animation?: "fadeUp" | "clipReveal" | "blur"
}

/**
 * 텍스트를 글자 또는 단어 단위로 순차 등장시키는 애니메이션 컴포넌트.
 * GSAP stagger와 ScrollTrigger로 뷰포트 진입 시 실행된다.
 * @param props.children - 애니메이션할 텍스트 문자열
 * @param props.as - 렌더링할 HTML 태그 (기본: p)
 * @param props.splitBy - 분할 기준 (char: 글자, word: 단어)
 * @param props.stagger - 각 단위 간 딜레이 (초)
 * @param props.animation - 프리셋 (fadeUp/clipReveal/blur)
 */
export function TextReveal({
  children,
  className,
  as: Tag = "p",
  splitBy = "word",
  stagger,
  delay = 0,
  animation = "fadeUp",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const defaultStagger = stagger ?? (splitBy === "char" ? 0.03 : 0.08)

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const spans = containerRef.current.querySelectorAll("[data-reveal-unit]")
    if (spans.length === 0) return

    const baseConfig = {
      duration: 0.6,
      stagger: defaultStagger,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current!,
        start: "top 85%",
        toggleActions: "play none none none" as const,
      },
    }

    const ctx = gsap.context(() => {
      switch (animation) {
        case "fadeUp":
          gsap.from(spans, { opacity: 0, y: 20, ...baseConfig })
          break
        case "clipReveal":
          gsap.fromTo(
            spans,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ...baseConfig }
          )
          break
        case "blur":
          gsap.from(spans, {
            opacity: 0,
            filter: "blur(10px)",
            ...baseConfig,
          })
          break
      }
    })

    return () => ctx.revert()
  }, [reducedMotion, delay, defaultStagger, animation])

  /** 텍스트를 단어 단위로 분할하여 span 배열을 생성한다. */
  function buildWordUnits() {
    return children.split(" ").map((word, i, arr) => (
      <span key={i}>
        <span data-reveal-unit className="inline-block">
          {word}
        </span>
        {i < arr.length - 1 && " "}
      </span>
    ))
  }

  /** 텍스트를 글자 단위로 분할하여 span 배열을 생성한다. */
  function buildCharUnits() {
    return children.split("").map((char, i) => (
      <span
        key={i}
        data-reveal-unit
        className="inline-block"
        style={char === " " ? { width: "0.25em" } : undefined}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef}>
      <Tag
        className={cn("overflow-hidden", className)}
        aria-label={children}
      >
        {reducedMotion
          ? children
          : splitBy === "char"
            ? buildCharUnits()
            : buildWordUnits()}
      </Tag>
    </div>
  )
}
