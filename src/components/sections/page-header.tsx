"use client";

import {useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useGsapContext} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {cn} from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  /** 줄 단위 배열 — 각 줄이 클립 마스크 reveal 애니메이션으로 순차 등장한다 */
  description?: React.ReactNode[];
  className?: string;
}

/**
 * PageHeader description 내 인라인 하이라이트.
 * experience p 태그의 text-accent-highlight 스타일과 동일하다.
 */
export function PageHeaderHighlight({children}: {children: React.ReactNode}) {
  return <span className="text-accent-highlight">{children}</span>;
}

/**
 * 내부 페이지 공통 헤더 (Projects / Experience / Contact).
 * - h1: 글자별 하단 클립 마스크 reveal (마운트 시 재생)
 * - description: 줄별 클립 마스크 reveal (h1과 겹치며 순차 등장)
 * - className으로 text-center 등 정렬 커스텀 가능
 */
export function PageHeader({title, description, className}: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(containerRef, () => {
    if (!containerRef.current) return;

    if (reducedMotion) {
      gsap.set(containerRef.current, {opacity: 1});
      return;
    }

    gsap.set(containerRef.current, {opacity: 1});

    const chars = containerRef.current.querySelectorAll<HTMLElement>(".ph-char");
    const lines = containerRef.current.querySelectorAll<HTMLElement>(".ph-line");

    // 마운트 기반 타임라인 — 페이지 상단 고정이므로 ScrollTrigger 불필요
    const tl = gsap.timeline({delay: 0.05});

    if (chars.length) {
      gsap.set(chars, {yPercent: 120});
      tl.to(chars, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
      });
    }

    if (lines.length) {
      gsap.set(lines, {yPercent: 100});
      tl.to(
        lines,
        {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.25,
      );
    }
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={{opacity: reducedMotion ? 1 : 0}}
    >
      <h1 aria-label={title}>
        {title.split("").map((char, i) =>
          char === " " ? (
            <span key={i}>{"\u00A0"}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden leading-[1.2]">
              <span className="ph-char inline-block text-3xl font-bold bg-gradient-to-r from-gradient-accent-from via-gradient-accent-via to-gradient-accent-to bg-clip-text text-transparent">
                {char}
              </span>
            </span>
          ),
        )}
      </h1>

      {description && description.length > 0 && (
        <div className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="ph-line block">
                {line}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
