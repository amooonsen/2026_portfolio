import type { Metadata } from "next"
import { ProjectGrid } from "@/components/sections/project-grid"
import { projects } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "프로젝트",
}

/**
 * 프로젝트 페이지.
 * BentoGrid 레이아웃으로 프로젝트 목록을 표시한다.
 */
export default function ProjectsPage() {
  return <ProjectGrid projects={projects} />
}
