import type { Metadata } from "next"
import { ProjectGrid } from "@/components/sections/project-grid"
import { getAllProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "프로젝트",
}

/**
 * 프로젝트 페이지.
 * 마크다운 기반 프로젝트 데이터를 BentoGrid 레이아웃으로 표시한다.
 */
export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectGrid projects={projects} />
}
