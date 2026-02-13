"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {Section} from "@/components/ui/section";
import {BentoGridItem} from "@/components/ui/bento-grid";
import {FadeIn} from "@/components/animation/fade-in";
import {GradientText} from "@/components/ui/gradient-text";
import {TechBadge} from "@/components/ui/tech-badge";
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
  featuredProject?: Project | null;
}

type SortOrder = "latest" | "oldest";

/**
 * BentoGrid 레이아웃 규칙을 결정하는 함수.
 * - 첫 번째 프로젝트: 2x1 (와이드 카드)
 * - 이후 7번째마다: 2x1 (와이드 카드)
 * - 나머지: 1x1 (일반 카드)
 */
function getGridSize(index: number): {colSpan: 1 | 2; rowSpan: 1 | 2} {
  if (index === 0) {
    return {colSpan: 2, rowSpan: 1};
  }
  if (index % 7 === 0) {
    return {colSpan: 2, rowSpan: 1};
  }
  return {colSpan: 1, rowSpan: 1};
}

/**
 * 프로젝트 그리드 섹션 컴포넌트.
 * Featured 프로젝트를 컴팩트 배너로 상단에 표시하고,
 * 나머지 카드를 스크롤 위치에 따라 개별적으로 등장하는 stagger 애니메이션으로 표시한다.
 */
export function ProjectGrid({projects, options, featuredProject}: ProjectGridProps) {
  const {showTitle = true, showDescription = true, showTags = true} = options ?? {};
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const excludeSlugs = featuredProject ? [featuredProject.slug] : [];
  const filteredProjects = projects.filter((p) => !excludeSlugs.includes(p.slug));

  const sortedProjects = [...filteredProjects].sort((a, b) => {
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
    <Section spacing="md" container>
      {/* 헤더 — 타이틀 + 정렬 */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <FadeIn>
          <GradientText as="h1" gradient="primary" className="text-3xl font-bold">
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
                aria-pressed={sortOrder === "latest"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortOrder === "latest"
                    ? "bg-accent-indigo-subtle text-accent-highlight"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                aria-pressed={sortOrder === "oldest"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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

      {/* Featured Project — 컴팩트 인라인 배너 */}
      {featuredProject && (
        <FadeIn>
          <Link href={`/projects/${featuredProject.slug}`} className="group mt-8 block">
            <div className="flex items-center gap-4 rounded-xl border border-border px-5 py-4 transition-colors duration-200 hover:border-accent-highlight/30 hover:bg-glass-hover-bg md:gap-6">
              {/* 뱃지 + 타이틀 */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    진행중
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-accent-highlight uppercase">
                    Featured
                  </span>
                </div>
                <h2 className="mt-1.5 text-lg font-bold text-foreground md:text-xl">
                  {featuredProject.title}
                  <span className="ml-2 font-mono text-xs font-normal text-muted-foreground/50">
                    {featuredProject.period}
                  </span>
                </h2>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {featuredProject.description}
                </p>
              </div>

              {/* 태그 — 데스크톱만 */}
              <div className="hidden shrink-0 items-center gap-2 lg:flex">
                {featuredProject.tags.slice(0, 3).map((tag) => (
                  <TechBadge key={tag} name={tag} variant="outline" size="sm" />
                ))}
              </div>

              {/* CTA 화살표 */}
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent-highlight" />
            </div>
          </Link>
        </FadeIn>
      )}

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
