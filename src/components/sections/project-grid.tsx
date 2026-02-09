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

/**
 * 프로젝트 그리드 섹션 컴포넌트.
 * BentoGrid 레이아웃으로 프로젝트 카드를 비대칭 배치한다.
 * columns, showTitle, showDescription, showTags 옵션으로 표시를 제어한다.
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

  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          Projects
        </GradientText>
        <p className="mt-2 text-muted-foreground">
          직접 기획하고 개발한 프로젝트들입니다.
        </p>
      </FadeIn>

      <BentoGrid columns={columns} className="mt-10">
        {projects.map((project, i) => (
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
