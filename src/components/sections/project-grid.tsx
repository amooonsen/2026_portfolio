"use client";

import {useRef, useState} from "react";
import {gsap} from "@/lib/gsap";
import {useGsapContext} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {BentoGridItem} from "@/components/ui/bento-grid";
import {FadeIn} from "@/components/animation/fade-in";
import {GradientText} from "@/components/ui/gradient-text";
import {ProjectCard} from "./project-card";
import type {Project} from "./project-card";

type SortOrder = "latest" | "oldest";

/**
 * BentoGrid 레이아웃 규칙을 결정하는 함수.
 * - 첫 번째 프로젝트: 2x1 (와이드 카드)
 * - 이후 7번째마다: 2x1 (와이드 카드)
 * - 나머지: 1x1 (일반 카드)
 */
function getGridSize(index: number): {colSpan: 1 | 2; rowSpan: 1 | 2} {
  if (index === 0 || index % 7 === 0) return {colSpan: 2, rowSpan: 1};
  return {colSpan: 1, rowSpan: 1};
}

interface ProjectGridProps {
  projects: Project[];
  children?: React.ReactNode;
}

/**
 * 프로젝트 그리드 컴포넌트.
 * 정렬 컨트롤과 스크롤 위치에 따른 개별 stagger 등장 애니메이션을 포함한다.
 * children 슬롯으로 서버에서 렌더링된 featured 배너를 삽입할 수 있다.
 */
export function ProjectGrid({projects, children}: ProjectGridProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortOrder === "latest") return b.year - a.year;
    return a.year - b.year;
  });

  useGsapContext(gridRef, () => {
    if (!gridRef.current || reducedMotion) return;

    const cards = gridRef.current.querySelectorAll("[data-project-card]");
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {opacity: 0, y: 40, scale: 0.95},
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, [reducedMotion, sortOrder]);

  return (
    <>
      {/* 헤더 — 타이틀 + 정렬 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FadeIn>
          <GradientText as="h1" gradient="primary" className="text-3xl font-bold">
            Projects
          </GradientText>
          <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
            다양한 도메인에서 사용자 경험을 최우선으로 설계하고 구현한
            프로젝트들입니다. 모던 기술 스택을 활용하여 실질적인 가치를
            만들어냈습니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">정렬:</span>
            <div role="group" aria-label="정렬 순서" className="flex gap-2">
              <button
                type="button"
                onClick={() => setSortOrder("latest")}
                aria-pressed={sortOrder === "latest"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none ${
                  sortOrder === "latest"
                    ? "bg-accent-indigo-subtle text-accent-highlight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => setSortOrder("oldest")}
                aria-pressed={sortOrder === "oldest"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none ${
                  sortOrder === "oldest"
                    ? "bg-accent-indigo-subtle text-accent-highlight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                오래된순
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Featured 프로젝트 슬롯 — 서버에서 렌더링된 배너 */}
      {children}

      {/* 프로젝트 그리드 */}
      <div
        ref={gridRef}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]"
      >
        {sortedProjects.map((project, i) => {
          const {colSpan, rowSpan} = getGridSize(i);
          const isFeatured = colSpan === 2 && rowSpan === 2;

          return (
            <BentoGridItem key={project.slug} colSpan={colSpan} rowSpan={rowSpan}>
              <div data-project-card>
                <ProjectCard project={project} featured={isFeatured} />
              </div>
            </BentoGridItem>
          );
        })}
      </div>
    </>
  );
}
