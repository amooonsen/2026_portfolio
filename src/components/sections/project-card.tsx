"use client"

import Image from "next/image"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { TechBadge } from "@/components/ui/tech-badge"
import { Spotlight } from "@/components/ui/spotlight"
import { cn } from "@/lib/utils"

interface Project {
  slug: string
  title: string
  description: string
  thumbnail?: string
  tags: string[]
  year: number
  period?: string
  featured?: boolean
  images?: string[]
  content?: string
  links?: {
    github?: string
    live?: string
  }
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
  showTitle?: boolean
  showDescription?: boolean
  showTags?: boolean
}

/**
 * 프로젝트 카드 컴포넌트.
 * Spotlight + GlassCard 조합으로 hover 시 조명 효과를 제공한다.
 * showTitle, showDescription, showTags로 표시 항목을 제어한다.
 * @param props.project - 프로젝트 데이터
 * @param props.featured - 피처드 프로젝트 여부 (큰 카드 스타일 적용)
 * @param props.showTitle - 제목 표시 여부 (기본: true)
 * @param props.showDescription - 설명 표시 여부 (기본: true)
 * @param props.showTags - 태그 표시 여부 (기본: true)
 */
export function ProjectCard({
  project,
  featured,
  showTitle = true,
  showDescription = true,
  showTags = true,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Spotlight>
        <GlassCard hover padding="lg" className="flex h-full flex-col">
          {/* 썸네일 영역 */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl bg-muted/30",
              featured ? "mb-6 aspect-video" : "mb-4 aspect-video"
            )}
          >
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={`${project.title} 썸네일`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={featured ? 48 : 32}
                  height={featured ? 48 : 32}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            )}
          </div>

          {/* 콘텐츠 */}
          {(showTitle || showDescription || showTags) && (
            <div className="flex flex-1 flex-col">
              {showTitle && (
                <h3 className={cn("font-semibold", featured ? "text-2xl" : "text-lg")}>
                  {project.title}
                </h3>
              )}
              {project.period && (
                <span className="mt-1 text-xs text-muted-foreground/70">
                  {project.period}
                </span>
              )}
              {showDescription && (
                <p
                  className={cn(
                    "mt-2 text-muted-foreground",
                    featured ? "text-base" : "text-sm",
                    !featured && "line-clamp-2"
                  )}
                >
                  {project.description}
                </p>
              )}

              {/* 태그 */}
              {showTags && (
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag} name={tag} variant="outline" size="sm" />
                  ))}
                </div>
              )}
            </div>
          )}
        </GlassCard>
      </Spotlight>
    </Link>
  )
}

export type { Project }
