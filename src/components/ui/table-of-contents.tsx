"use client";

import {useEffect, useRef, useState} from "react";
import {getLenisInstance} from "@/lib/lenis-store";
import type {TocHeading} from "@/components/ui/markdown-content";
import {cn} from "@/lib/utils";

interface TableOfContentsProps {
  headings: TocHeading[];
}

/** 스크롤 위치 기준 오프셋 (px) — heading이 이 위치 이상에 있으면 active */
const SCROLL_OFFSET = 100;

/**
 * 프로젝트 상세 페이지 목차(Table of Contents) 컴포넌트.
 * scroll position 기반으로 현재 활성 heading을 정밀하게 감지한다.
 * 짧은 섹션(담당기간 등)도 정확히 하이라이트한다.
 */
export function TableOfContents({headings}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (headings.length === 0) return;

    /**
     * 스크롤 위치 기반 active heading 계산.
     * 현재 스크롤 위치 + offset 이하에 있는 heading 중 가장 마지막(=가장 아래) 항목을 active로 설정.
     * 이 방식은 짧은 섹션도 정확히 감지한다.
     */
    function updateActive() {
      const scrollY = window.scrollY + SCROLL_OFFSET;
      let currentId = "";

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          currentId = heading.id;
        }
      }

      // 페이지 하단 도달 시 마지막 heading 활성화
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        currentId = headings[headings.length - 1].id;
      }

      setActiveId(currentId);
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);
    }

    // Lenis scroll 이벤트 연결
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.on("scroll", onScroll);
    }
    // fallback: native scroll
    window.addEventListener("scroll", onScroll, {passive: true});

    // 초기 상태 설정
    updateActive();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  function handleClick(id: string) {
    const lenis = getLenisInstance();
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {offset: -96});
    } else {
      target.scrollIntoView({behavior: "smooth"});
    }
  }

  if (headings.length === 0) return null;

  return (
    <nav aria-label="목차" className="hidden xl:block">
      <div className="sticky top-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          목차
        </p>
        <ul className="space-y-1 border-l border-border">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "block w-full cursor-pointer border-l-2 py-1 text-left text-sm transition-colors",
                  heading.level === 3 ? "pl-6" : "pl-4",
                  activeId === heading.id
                    ? "border-indigo-400 font-medium text-indigo-400"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
