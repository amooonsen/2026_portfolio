"use client";

import {useEffect, useRef, useState} from "react";
import {useScrollThreshold} from "@/hooks/use-scroll-threshold";
import {getLenisInstance} from "@/lib/lenis-store";
import {cn} from "@/lib/utils";

const SCROLL_THRESHOLD = 400;
const FOOTER_OFFSET = 40;

/**
 * 스크롤 최상단 이동 버튼.
 * 간소화된 CSS 전환으로 빠르게 표시/숨김 처리한다.
 * 푸터에 닿으면 즉시 위로 올라간다.
 */
export function ScrollToTop() {
  const visible = useScrollThreshold(SCROLL_THRESHOLD);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [bottomOffset, setBottomOffset] = useState(32);

  // 푸터 위치 감지 — 버튼이 푸터 위에서 멈추도록 bottom 값 조정
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    let rafId: number | null = null;

    function updatePosition() {
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        const newBottom = viewportHeight - footerRect.top + FOOTER_OFFSET;
        setBottomOffset(Math.max(32, newBottom));
      } else {
        setBottomOffset(32);
      }
    }

    function handleScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updatePosition();
          rafId = null;
        });
      }
    }

    updatePosition();
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  function handleClick() {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, {duration: 0.6});
    } else {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label="맨 위로 스크롤"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-indigo-500/90 text-white backdrop-blur-sm",
        "transition-all duration-200 ease-out",
        "hover:bg-indigo-500 hover:scale-110",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      )}
      style={{
        bottom: `${bottomOffset}px`,
        transition: "bottom 0.15s ease-out, opacity 0.2s ease-out, transform 0.2s ease-out, background-color 0.15s",
      }}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
