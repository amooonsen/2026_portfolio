"use client"

import { useState } from "react"
import { Section } from "@/components/ui/section"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { FadeIn } from "@/components/animation/fade-in"
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
 * 프로젝트 그리드 섹션 컴포넌트.
 * BentoGrid 레이아웃으로 프로젝트 카드를 비대칭 배치한다.
 * 날짜 기준 최신순/오래된순 정렬을 지원한다.
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
            직접 기획하고 개발한 프로젝트들입니다.
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

      <BentoGrid columns={columns} className="mt-10">
        {sortedProjects.map((project, i) => (
          <BentoGridItem
            key={project.slug}
            colSpan={project.featured ? 2 : 1}
            rowSpan={project.featured ? 2 : 1}
          >
            <FadeIn delay={i * 0.1}>
              <ProjectCard
                project={project}
                featured={project.featured}
                showTitle={showTitle}
                showDescription={showDescription}
                showTags={showTags}
              />
            </FadeIn>
          </BentoGridItem>
        ))}
      </BentoGrid>
    </Section>
  )
}
