import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Section } from "@/components/ui/section"
import { GlassCard } from "@/components/ui/glass-card"
import { TechBadge } from "@/components/ui/tech-badge"
import { GradientText } from "@/components/ui/gradient-text"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animation/fade-in"
import { ProjectGallery } from "@/components/sections/project-gallery"
import { MarkdownContent } from "@/components/ui/markdown-content"
import { ProjectSchema, BreadcrumbSchema } from "@/components/seo/json-ld"
import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import { createMetadata } from "@/lib/metadata"

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

/**
 * 정적 경로 생성.
 * 빌드 시 모든 프로젝트 slug에 대한 페이지를 미리 생성한다.
 */
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

/**
 * 동적 메타데이터 생성.
 */
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = getProjectBySlug(slug)
    const description =
      project.description ||
      `${project.title} 프로젝트 - ${project.tags.join(", ")}`
    const image = project.thumbnail || project.images?.[0] || "/og-image.png"

    return createMetadata({
      title: project.title,
      description,
      image,
      path: `/projects/${slug}`,
    })
  } catch {
    return createMetadata({
      title: "프로젝트",
      path: `/projects/${slug}`,
      noIndex: true,
    })
  }
}

/**
 * 프로젝트 상세 페이지.
 * 마크다운 파일에서 읽어온 프로젝트 설명, 기술 스택, 외부 링크를 표시한다.
 */
export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params

  let project
  try {
    project = getProjectBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <>
      <ProjectSchema
        title={project.title}
        description={project.description || `${project.title} 프로젝트`}
        image={project.thumbnail || project.images?.[0]}
        datePublished={project.date}
        tags={project.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "/" },
          { name: "프로젝트", url: "/projects" },
          { name: project.title, url: `/projects/${slug}` },
        ]}
      />

      <Section spacing="lg" container containerSize="md">
        <FadeIn>
          <nav aria-label="빵가루 네비게이션">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              프로젝트 목록
            </Link>
          </nav>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GradientText as="h1" gradient="primary" className="text-4xl font-bold md:text-5xl">
            {project.title}
          </GradientText>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechBadge key={tag} name={tag} variant="outline" />
            ))}
          </div>
        </FadeIn>

        {project.content && (
          <FadeIn delay={0.3}>
            <GlassCard padding="lg" className="mt-8">
              <article>
                <MarkdownContent content={project.content} />
              </article>
            </GlassCard>
          </FadeIn>
        )}

        {project.images && project.images.length > 0 && (
          <FadeIn delay={0.35}>
            <ProjectGallery images={project.images} title={project.title} />
          </FadeIn>
        )}

        {project.links && (project.links.github || project.links.live) && (
          <FadeIn delay={0.4}>
            <div className="mt-8 flex gap-4">
              {project.links.github && (
                <Button variant="outline" asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                    aria-label={`${project.title} GitHub 저장소`}
                  >
                    <Github className="size-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.links.live && (
                <Button asChild>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                    aria-label={`${project.title} 라이브 데모`}
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    라이브 데모
                  </a>
                </Button>
              )}
            </div>
          </FadeIn>
        )}
      </Section>
    </>
  )
}
