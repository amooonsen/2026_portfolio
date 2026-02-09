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
import { projects } from "@/data/portfolio-data"

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

/**
 * 정적 경로 생성.
 * 빌드 시 모든 프로젝트 slug에 대한 페이지를 미리 생성한다.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

/**
 * 동적 메타데이터 생성.
 */
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "프로젝트" }
  return { title: project.title }
}

/**
 * 프로젝트 상세 페이지.
 * 프로젝트 설명, 기술 스택, 외부 링크를 표시한다.
 */
export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <Section spacing="lg" container containerSize="md">
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          프로젝트 목록
        </Link>
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

      <FadeIn delay={0.3}>
        <GlassCard padding="lg" className="mt-8">
          <h2 className="text-lg font-semibold">프로젝트 개요</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </GlassCard>
      </FadeIn>

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
                >
                  <Github className="size-4" />
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
                >
                  <ExternalLink className="size-4" />
                  라이브 데모
                </a>
              </Button>
            )}
          </div>
        </FadeIn>
      )}
    </Section>
  )
}
