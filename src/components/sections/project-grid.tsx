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

// ---------------------------------------------------------------------------
// Bento 레이아웃 생성기
// ---------------------------------------------------------------------------

type GridSize = {colSpan: 1 | 2 | 3; rowSpan: 1 | 2};
type CardSize = "default" | "wide" | "featured" | "banner";

interface LayoutItem {
  grid: GridSize;
  card: CardSize;
}

/** 행을 완전히 채우는 블록 정의 (3열 기준) */
const BLOCKS = {
  /** 2×2 피처드 + 1×1 × 2 → 3 아이템, 2행 */
  featured: [
    {grid: {colSpan: 2, rowSpan: 2}, card: "featured"},
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
  ],
  /** 1×1 × 3 → 3 아이템, 1행 */
  triple: [
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
  ],
  /** 2×1 와이드(좌) + 1×1 → 2 아이템, 1행 */
  wideLeft: [
    {grid: {colSpan: 2, rowSpan: 1}, card: "wide"},
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
  ],
  /** 1×1 + 2×1 와이드(우) → 2 아이템, 1행 */
  wideRight: [
    {grid: {colSpan: 1, rowSpan: 1}, card: "default"},
    {grid: {colSpan: 2, rowSpan: 1}, card: "wide"},
  ],
  /** 3×1 풀 와이드 배너 → 1 아이템, 1행 */
  banner: [
    {grid: {colSpan: 3, rowSpan: 1}, card: "banner"},
  ],
} satisfies Record<string, LayoutItem[]>;

/** 시각적 다양성을 위한 블록 순환 시퀀스 */
const BLOCK_SEQUENCE: LayoutItem[][] = [
  BLOCKS.featured,   // 3 아이템 → 2행
  BLOCKS.wideRight,  // 2 아이템 → 1행
  BLOCKS.triple,     // 3 아이템 → 1행
  BLOCKS.wideLeft,   // 2 아이템 → 1행
];
// 사이클 합계: 10 아이템

/**
 * 3열 Bento 그리드에서 빈 영역 없이 아이템을 배치하는 레이아웃 생성기.
 * 블록 단위로 아이템을 배치하며, 각 블록은 행을 완전히 채운다.
 * 나머지 아이템도 빈 영역 없이 처리한다.
 */
function generateBentoLayout(count: number): LayoutItem[] {
  if (count === 0) return [];

  const layout: LayoutItem[] = [];
  let remaining = count;
  let seqIndex = 0;

  while (remaining > 0) {
    const block = BLOCK_SEQUENCE[seqIndex % BLOCK_SEQUENCE.length];

    if (remaining >= block.length) {
      layout.push(...block);
      remaining -= block.length;
      seqIndex++;
    } else {
      // 나머지 아이템 — 빈 영역 없이 채우기
      if (remaining >= 3) {
        layout.push(...BLOCKS.triple);
        remaining -= 3;
      } else if (remaining === 2) {
        layout.push(...BLOCKS.wideLeft);
        remaining -= 2;
      } else {
        // 1개 남음 → 풀 와이드 배너
        layout.push(...BLOCKS.banner);
        remaining -= 1;
      }
    }
  }

  return layout;
}

// ---------------------------------------------------------------------------
// ProjectGrid 컴포넌트
// ---------------------------------------------------------------------------

interface ProjectGridProps {
  projects: Project[];
  children?: React.ReactNode;
}

/**
 * 프로젝트 그리드 컴포넌트.
 * 블록 기반 Bento 레이아웃으로 빈 영역 없이 프로젝트를 배치한다.
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

  const layout = generateBentoLayout(sortedProjects.length);

  useGsapContext(gridRef, () => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-project-card]");
    if (cards.length === 0) return;

    if (reducedMotion) {
      gsap.set(cards, {opacity: 1, y: 0, scale: 1});
      return;
    }

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
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-flow-dense auto-rows-[minmax(200px,auto)]"
      >
        {sortedProjects.map((project, i) => {
          const {grid, card} = layout[i];

          return (
            <BentoGridItem key={project.slug} colSpan={grid.colSpan} rowSpan={grid.rowSpan}>
              <div data-project-card style={{opacity: 0}}>
                <ProjectCard project={project} size={card} />
              </div>
            </BentoGridItem>
          );
        })}
      </div>
    </>
  );
}
