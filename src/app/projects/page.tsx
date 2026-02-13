import {ProjectGrid} from "@/components/sections/project-grid";
import {getAllProjects} from "@/lib/projects";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "프로젝트",
  description:
    "조경문이 진행한 프론트엔드 개발 프로젝트들입니다. React, Next.js, TypeScript를 활용한 다양한 웹 애플리케이션을 확인하세요.",
  path: "/projects",
});

/**
 * 프로젝트 페이지.
 * Featured 프로젝트를 상단에 인라인 배너로 표시하고, 나머지를 BentoGrid로 표시한다.
 */
export default function ProjectsPage() {
  const projects = getAllProjects();
  const featuredProject = projects.find((p) => p.slug === "ai-caramel") ?? null;

  return (
    <ProjectGrid projects={projects} featuredProject={featuredProject} />
  );
}
