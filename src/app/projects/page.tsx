import type { Metadata } from "next"
import { ProjectGrid } from "@/components/sections/project-grid"
import { getAllProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "프로젝트",
  description:
    "조경문이 진행한 프론트엔드 개발 프로젝트들입니다. React, Next.js, TypeScript를 활용한 다양한 웹 애플리케이션을 확인하세요.",
}

/**
 * 프로젝트 페이지.
 * 마크다운 기반 프로젝트 데이터를 BentoGrid 레이아웃으로 표시한다.
 */
export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectGrid projects={projects} />
}
