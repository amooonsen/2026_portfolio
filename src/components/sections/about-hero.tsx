"use client";

import {useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useGsapContext} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {cn} from "@/lib/utils";

interface AboutHeroProps {
  text: string;
  className?: string;
}

/**
 * About 페이지 스크롤 리빌 히어로 섹션.
 * CSS sticky + GSAP scrub으로 단어별 opacity 리빌 효과를 구현한다.
 * 외부 wrapper가 스크롤 공간(200vh)을 확보하고 내부 sticky 요소가 뷰포트에 고정된다.
 * template.tsx의 filter/transform 안에서도 안전하게 동작한다 (pin 미사용).
 * @param props.text - 표시할 텍스트 (공백 기준 단어 분할)
 */
export function AboutHero({text, className}: AboutHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(wrapperRef, () => {
    if (!wrapperRef.current || !textRef.current || reducedMotion) return;

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
      },
    });
  }, [reducedMotion, text]);

  const words = text.split(" ");

  return (
    <div ref={wrapperRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto max-w-5xl px-6">
          <p ref={textRef} aria-label={text} className="font-bold leading-relaxed text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] 2xl:text-[2.5vw]">
            {reducedMotion ? (
              <span className="text-foreground">{text}</span>
            ) : (
              words.map((word, i) => (
                <span
                  key={i}
                  data-word
                  className="mr-[0.25em] inline-block text-foreground"
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
