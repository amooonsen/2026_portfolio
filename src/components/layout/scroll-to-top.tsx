"use client";

import {useScrollThreshold} from "@/hooks/use-scroll-threshold";
import {getLenisInstance} from "@/lib/lenis-store";
import {cn} from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

/**
 * 스크롤 최상단 이동 버튼.
 * 일정 스크롤 이후 표시되며, 클릭 시 최상단으로 이동한다.
 */
export function ScrollToTop() {
  const visible = useScrollThreshold(SCROLL_THRESHOLD);

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
      onClick={handleClick}
      aria-label="맨 위로 스크롤"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-8 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "border border-glass-border bg-glass-bg text-foreground backdrop-blur-xl",
        "shadow-lg shadow-glass-shadow",
        "transition-all duration-200 ease-out",
        "hover:bg-glass-hover-bg hover:border-glass-hover-border hover:scale-110",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-indigo",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      )}
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
