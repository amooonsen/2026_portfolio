"use client";

import {useEffect, useState} from "react";
import {getLenisInstance} from "@/lib/lenis-store";
import type {TocHeading} from "@/components/ui/markdown-content";
import {cn} from "@/lib/utils";

/** heading이 이 위치(뷰포트 상단으로부터) 이하이면 active로 간주 */
const ACTIVATE_THRESHOLD = 120;

interface TableOfContentsProps {
  headings: TocHeading[];
}

/**
 * 프로젝트 상세 페이지 목차(Table of Contents) 컴포넌트.
 * getBoundingClientRect 기반으로 현재 활성 heading을 감지한다.
 */
export function TableOfContents({headings}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    function updateActive() {
      let currentId = "";

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVATE_THRESHOLD) {
          currentId = heading.id;
        }
      }

      // 페이지 하단 도달 시 마지막 heading 활성화
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        currentId = headings[headings.length - 1].id;
      }

      setActiveId(currentId);
    }

    window.addEventListener("scroll", updateActive, {passive: true});
    updateActive();

    return () => window.removeEventListener("scroll", updateActive);
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
