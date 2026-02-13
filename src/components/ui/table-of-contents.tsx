"use client";

import {useEffect, useState} from "react";
import {getLenisInstance} from "@/lib/lenis-store";
import type {TocHeading} from "@/components/ui/markdown-content";
import {cn} from "@/lib/utils";

interface TableOfContentsProps {
  headings: TocHeading[];
}

/**
 * 프로젝트 상세 페이지 목차(Table of Contents) 컴포넌트.
 * 현재 스크롤 위치에 따라 활성 heading을 하이라이트하며,
 * 클릭 시 Lenis smooth scroll로 해당 섹션으로 이동한다.
 */
export function TableOfContents({headings}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 뷰포트에 들어오는 heading 중 가장 위에 있는 것을 active로 설정
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // boundingClientRect.top이 가장 작은(=가장 위) 항목 선택
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr,
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
