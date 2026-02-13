"use client";

import {useEffect, useRef, useState} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {Section} from "@/components/ui/section";
import {BentoGridItem} from "@/components/ui/bento-grid";
import {FadeIn} from "@/components/animation/fade-in";
import {GradientText} from "@/components/ui/gradient-text";
import {ProjectCard} from "./project-card";
import type {Project} from "./project-card";

interface ProjectGridOptions {
  showTitle?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
}

interface ProjectGridProps {
  projects: Project[];
  columns?: 2 | 3 | 4;
  options?: ProjectGridOptions;
}

type SortOrder = "latest" | "oldest";

/**
 * BentoGrid 레이아웃 규칙을 결정하는 함수.
 * - 첫 번째 프로젝트: 2x2 (대형 피처)
 * - 이후 7번째마다: 2x1 (와이드 카드)
 * - 나머지: 1x1 (일반 카드)
 */
function getGridSize(index: number): {colSpan: 1 | 2; rowSpan: 1 | 2} {
  if (index === 0) {
    return {colSpan: 2, rowSpan: 2};
  }
  if (index % 7 === 0) {
    return {colSpan: 2, rowSpan: 1};
  }
  return {colSpan: 1, rowSpan: 1};
}

/**
 * 프로젝트 그리드 섹션 컴포넌트.
 * 각 카드가 스크롤 위치에 따라 개별적으로 등장하는 stagger 애니메이션을 적용한다.
 */
export function ProjectGrid({projects, options}: ProjectGridProps) {
  const {showTitle = true, showDescription = true, showTags = true} = options ?? {};
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortOrder === "latest") return b.year - a.year;
    return a.year - b.year;
  });

  useEffect(() => {
    if (!gridRef.current || reducedMotion) return;

    const cards = gridRef.current.querySelectorAll("[data-project-card]");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, [reducedMotion, sortOrder]);

  return (
    <Section spacing="lg" container>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FadeIn>
          <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
            Projects
          </GradientText>
          <p className="mt-2 text-muted-foreground">
            다양한 도메인에서 설계하고 구현한 프로젝트들입니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">정렬:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder("latest")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortOrder === "latest"
                    ? "bg-accent-indigo-subtle text-accent-indigo"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortOrder === "oldest"
                    ? "bg-accent-indigo-subtle text-accent-indigo"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                오래된순
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div
        ref={gridRef}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]"
      >
        {sortedProjects.map((project, i) => {
          const {colSpan, rowSpan} = getGridSize(i);
          const isFeatured = colSpan === 2 && rowSpan === 2;

          return (
            <BentoGridItem key={project.slug} colSpan={colSpan} rowSpan={rowSpan}>
              <div data-project-card>
                <ProjectCard
                  project={project}
                  featured={isFeatured}
                  showTitle={showTitle}
                  showDescription={showDescription}
                  showTags={showTags}
                />
              </div>
            </BentoGridItem>
          );
        })}
      </div>
    </Section>
  );
}
