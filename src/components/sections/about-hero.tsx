"use client";

import {useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {useGsapContext} from "@/hooks/use-gsap";
import {cn} from "@/lib/utils";

interface AboutHeroProps {
  text: string;
  className?: string;
}

/**
 * About 페이지 스크롤 리빌 히어로 섹션.
 * GSAP ScrollTrigger pin + scrub으로 단어별 opacity 리빌 효과를 구현한다.
 * @param props.text - 표시할 텍스트 (공백 기준 단어 분할)
 */
export function AboutHero({text, className}: AboutHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    wrapperRef,
    () => {
      if (!contentRef.current || !textRef.current || reducedMotion) return;

      const words = textRef.current.querySelectorAll("[data-word]");

      gsap.to(words, {
        opacity: 1,
        stagger: {each: 0.1},
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top+=64",
          end: "bottom bottom",
          scrub: 0.8,
          pin: contentRef.current,
          pinSpacing: false,
        },
      });
    },
    [reducedMotion, text]
  );

  const words = text.split(" ");

  return (
    <div ref={wrapperRef} className={cn("relative h-[200vh]", className)}>
      <div ref={contentRef} className="flex min-h-screen items-center">
        <div className="mx-auto max-w-5xl px-6">
          <p ref={textRef} className="text-3xl font-bold leading-relaxed md:text-5xl lg:text-6xl">
            {reducedMotion ? (
              <span className="text-white">{text}</span>
            ) : (
              words.map((word, i) => (
                <span
                  key={i}
                  data-word
                  className="mr-[0.25em] inline-block text-white"
                  style={{opacity: 0.15}}
                >
                  {word}
                </span>
              ))
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
