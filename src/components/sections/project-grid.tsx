"use client"

import { useState } from "react"
import { Section } from "@/components/ui/section"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { GradientText } from "@/components/ui/gradient-text"
import { ProjectCard } from "./project-card"
import type { Project } from "./project-card"

interface ProjectGridOptions {
  showTitle?: boolean
  showDescription?: boolean
  showTags?: boolean
}

interface ProjectGridProps {
  projects: Project[]
  columns?: 2 | 3 | 4
  options?: ProjectGridOptions
}

type SortOrder = "latest" | "oldest"

/**
 * BentoGrid 레이아웃 규칙을 결정하는 함수.
 * - 첫 번째 프로젝트: 2x2 (대형 피처)
 * - 이후 7번째마다: 2x1 (와이드 카드)
 * - 나머지: 1x1 (일반 카드)
 */
function getGridSize(index: number): { colSpan: 1 | 2; rowSpan: 1 | 2 } {
  // 첫 번째 프로젝트는 2x2
  if (index === 0) {
    return { colSpan: 2, rowSpan: 2 }
  }

  // 7번째마다 2x1 (와이드 카드)
  if (index % 7 === 0) {
    return { colSpan: 2, rowSpan: 1 }
  }

  // 나머지는 1x1
  return { colSpan: 1, rowSpan: 1 }
}

/**
 * 프로젝트 그리드 섹션 컴포넌트.
 * BentoGrid 레이아웃으로 프로젝트 카드를 규칙적으로 배치한다.
 * 날짜 기준 최신순/오래된순 정렬을 지원한다.
 *
 * **레이아웃 규칙**:
 * - 첫 번째: 2x2 (featured)
 * - 7번째마다: 2x1 (wide)
 * - 나머지: 1x1 (normal)
 *
 * @param props.projects - 프로젝트 데이터 배열
 * @param props.columns - 그리드 열 수 (2/3/4, 기본: 3)
 * @param props.options - 카드 표시 옵션
 */
export function ProjectGrid({
  projects,
  columns = 3,
  options,
}: ProjectGridProps) {
  const {
    showTitle = true,
    showDescription = true,
    showTags = true,
  } = options ?? {}

  const [sortOrder, setSortOrder] = useState<SortOrder>("latest")

  // 정렬된 프로젝트 목록
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortOrder === "latest") {
      return b.year - a.year
    }
    return a.year - b.year
  })

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
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  sortOrder === "oldest"
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                오래된순
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* BentoGrid를 StaggerChildren으로 감싸서 카드들이 순차적으로 등장 */}
      <StaggerChildren
        stagger={0.12}
        delay={0.2}
        animation="scaleUp"
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]"
      >
        {sortedProjects.map((project, i) => {
          const { colSpan, rowSpan } = getGridSize(i)
          const isFeatured = colSpan === 2 && rowSpan === 2

          return (
            <BentoGridItem key={project.slug} colSpan={colSpan} rowSpan={rowSpan}>
              <ProjectCard
                project={project}
                featured={isFeatured}
                showTitle={showTitle}
                showDescription={showDescription}
                showTags={showTags}
              />
            </BentoGridItem>
          )
        })}
      </StaggerChildren>
    </Section>
  )
}
