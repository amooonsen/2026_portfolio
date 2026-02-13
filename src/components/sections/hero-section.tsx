"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

/**
 * Hero 섹션 컴포넌트.
 * 3D 배경 위에 SplitText 스타일 타이틀, CTA 버튼, 스크롤 인디케이터를 표시한다.
 * GSAP 타임라인으로 순차적 인트로 애니메이션을 실행한다.
 * 모바일에서는 간소화된 애니메이션으로 성능을 최적화한다.
 * @param props.title - 메인 타이틀 (그라디언트)
 * @param props.subtitle - 서브 타이틀 (SplitText char 애니메이션)
 * @param props.description - 설명 텍스트
 * @param props.ctaLabel - 주요 CTA 버튼 텍스트
 * @param props.ctaHref - 주요 CTA 링크
 * @param props.secondaryLabel - 보조 버튼 텍스트
 * @param props.secondaryHref - 보조 버튼 링크
 */
export function HeroSection({
  title,
  subtitle,
  description,
  ctaLabel = "프로젝트 보기",
  ctaHref = "/projects",
  secondaryLabel = "연락하기",
  secondaryHref = "/contact",
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")

  useEffect(() => {
    if (!heroRef.current || reducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // 모바일에서는 간소화된 애니메이션
      if (isMobile) {
        // 서브타이틀: 전체 페이드인 (글자별 애니메이션 비활성화)
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
          tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
        }

        // 타이틀: 전체 페이드인 (단어별 애니메이션 비활성화)
        if (titleRef.current) {
          gsap.set(titleRef.current, { opacity: 0, y: 20 })
          tl.to(
            titleRef.current,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          )
        }
      } else {
        // 데스크톱: 기존 복잡한 애니메이션
        // 서브타이틀: 글자별 SplitText 슬라이드업
        const chars = subtitleRef.current?.querySelectorAll("[data-char]")
        if (chars?.length) {
          gsap.set(chars, { yPercent: 110, opacity: 0 })
          tl.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.03,
            ease: "power3.out",
          })
        }

        // 타이틀: 단어별 블러 리빌
        const words = titleRef.current?.querySelectorAll("[data-word]")
        if (words?.length) {
          gsap.set(words, { yPercent: 100, opacity: 0, filter: "blur(8px)" })
          tl.to(
            words,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.3"
          )
        }
      }

      // 설명 텍스트 페이드인
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 })
        tl.to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
      }

      // CTA 버튼 슬라이드업
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 })
        tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        )
      }

      // 스크롤 인디케이터 등장 + 반복 애니메이션
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 })
        tl.to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.1")

        const dot = scrollRef.current.querySelector("[data-scroll-dot]")
        if (dot) {
          gsap.fromTo(
            dot,
            { y: 0, opacity: 1 },
            {
              y: 16,
              opacity: 0,
              duration: 1.5,
              repeat: -1,
              ease: "power1.in",
              repeatDelay: 0.8,
            }
          )
        }
      }
    }, heroRef)

    return () => ctx.revert()
  }, [reducedMotion, isMobile])

  /** 텍스트를 글자별 span으로 분할 (SplitText 효과용) */
  function splitChars(text: string) {
    return text.split("").map((char, i) =>
      char === " " ? (
        <span key={i} className="inline-block w-[0.3em]">
          {"\u00A0"}
        </span>
      ) : (
        <span key={i} className="inline-block overflow-hidden">
          <span data-char className="inline-block will-change-transform">
            {char}
          </span>
        </span>
      )
    )
  }

  /** 텍스트를 단어별 span으로 분할 (블러 리빌 + 그라디언트 효과용) */
  function splitWords(text: string) {
    return text.split(" ").map((word, i, arr) => (
      <span key={i}>
        <span className="inline-block overflow-hidden">
          <span
            data-word
            className="inline-block will-change-[transform,opacity,filter] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
          >
            {word}
          </span>
        </span>
        {i < arr.length - 1 && " "}
      </span>
    ))
  }

  return (
    <Section spacing="xl" container>
      <div
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-4rem)] items-center"
      >
        <div className="relative z-10 w-full">
          {/* 서브타이틀 — 글자별 SplitText (데스크톱) / 전체 텍스트 (모바일) */}
          <h1
            ref={subtitleRef}
            className="text-5xl font-bold tracking-tight text-white md:text-7xl"
            aria-label={subtitle}
          >
            {reducedMotion || isMobile ? subtitle : splitChars(subtitle)}
          </h1>

          {/* 타이틀 — 단어별 블러 리빌 + 그라디언트 (데스크톱) / 전체 텍스트 (모바일) */}
          <p
            ref={titleRef}
            className={cn(
              "mt-4 text-3xl font-bold md:text-5xl",
              (reducedMotion || isMobile) &&
                "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            )}
            aria-label={title}
          >
            {reducedMotion || isMobile ? title : splitWords(title)}
          </p>

          {/* 설명 */}
          <p
            ref={descRef}
            className="mt-6 max-w-2xl text-lg text-white/60 md:text-xl"
          >
            {description}
          </p>

          {/* CTA 버튼 */}
          <div ref={ctaRef} className="mt-10 flex gap-4">
            <Magnetic>
              <Button size="lg" asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* 스크롤 인디케이터 — GSAP 반복 애니메이션 */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Scroll
            </span>
            <div className="relative h-12 w-px bg-white/10">
              <div
                data-scroll-dot
                className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-px rounded-full bg-white/60"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
