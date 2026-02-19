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

type CardSize = "default" | "wide" | "featured" | "banner"

interface ProjectCardProps {
  project: Project
  /** @deprecated Use `size` instead */
  featured?: boolean
  size?: CardSize
  showTitle?: boolean
  showDescription?: boolean
  showTags?: boolean
}

function ThumbnailImage({
  project,
  isFeatured,
}: {
  project: Project
  isFeatured: boolean
}) {
  if (project.thumbnail) {
    return (
      <Image
        src={project.thumbnail}
        alt={`${project.title} 썸네일`}
        fill
        sizes={
          isFeatured
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-500 hover:scale-105"
        unoptimized={project.thumbnail.endsWith(".svg")}
      />
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center text-muted-foreground/50"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={isFeatured ? 48 : 32}
        height={isFeatured ? 48 : 32}
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
  )
}

/** 기본 세로 레이아웃 (1×1, 2×1, 2×2) */
function VerticalLayout({
  project,
  size,
  showTitle,
  showDescription,
  showTags,
}: {
  project: Project
  size: CardSize
  showTitle: boolean
  showDescription: boolean
  showTags: boolean
}) {
  const isFeatured = size === "featured"
  const isWide = size === "wide"

  return (
    <GlassCard hover padding="lg" className="flex h-full flex-col">
      {/* 썸네일 영역 */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-muted/30",
          isFeatured ? "mb-6 aspect-video" : "mb-4 aspect-video",
        )}
      >
        <ThumbnailImage project={project} isFeatured={isFeatured} />
      </div>

      {/* 콘텐츠 */}
      {(showTitle || showDescription || showTags) && (
        <div className="flex flex-1 flex-col">
          {showTitle && (
            <h3
              className={cn(
                "font-semibold text-foreground",
                isFeatured ? "text-2xl" : isWide ? "text-xl" : "text-lg",
              )}
            >
              {project.title}
            </h3>
          )}
          {project.period && (
            <span className="mt-1 text-xs text-foreground/50">
              {project.period}
            </span>
          )}
          {showDescription && (
            <p
              className={cn(
                "mt-2 text-foreground/65",
                isFeatured ? "text-base" : "text-sm",
                !isFeatured && "line-clamp-2",
              )}
            >
              {project.description}
            </p>
          )}

          {/* 태그 */}
          {showTags && (
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <TechBadge key={tag} name={tag} variant="outline" size="sm" showIcon />
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  )
}

/** 가로 배너 레이아웃 (3×1 풀와이드) — md 이상에서 가로, 모바일에서 세로 */
function BannerLayout({
  project,
  showTitle,
  showDescription,
  showTags,
}: {
  project: Project
  showTitle: boolean
  showDescription: boolean
  showTags: boolean
}) {
  return (
    <GlassCard hover padding="lg" className="flex h-full flex-col md:flex-row md:items-stretch">
      {/* 썸네일 — 모바일: 위, 데스크톱: 왼쪽 */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted/30 md:aspect-auto md:w-2/5 md:shrink-0">
        <ThumbnailImage project={project} isFeatured />
      </div>

      {/* 콘텐츠 — 모바일: 아래, 데스크톱: 오른쪽 */}
      {(showTitle || showDescription || showTags) && (
        <div className="flex flex-1 flex-col justify-center pt-4 md:pl-8 md:pt-0">
          {showTitle && (
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">
              {project.title}
            </h3>
          )}
          {project.period && (
            <span className="mt-1 text-xs text-foreground/50">
              {project.period}
            </span>
          )}
          {showDescription && (
            <p className="mt-2 text-sm text-foreground/65 md:text-base md:line-clamp-3">
              {project.description}
            </p>
          )}

          {showTags && (
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <TechBadge key={tag} name={tag} variant="outline" size="sm" showIcon />
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  )
}

/**
 * 프로젝트 카드 컴포넌트.
 * Spotlight + GlassCard 조합으로 hover 시 조명 효과를 제공한다.
 * size prop으로 그리드 내 카드 유형에 맞는 레이아웃을 적용한다.
 *
 * @param props.project - 프로젝트 데이터
 * @param props.size - 카드 크기 유형 (default | wide | featured | banner)
 * @param props.showTitle - 제목 표시 여부 (기본: true)
 * @param props.showDescription - 설명 표시 여부 (기본: true)
 * @param props.showTags - 태그 표시 여부 (기본: true)
 */
export function ProjectCard({
  project,
  featured,
  size: sizeProp,
  showTitle = true,
  showDescription = true,
  showTags = true,
}: ProjectCardProps) {
  const size = sizeProp ?? (featured ? "featured" : "default")

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block h-full focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none focus-visible:rounded-2xl"
    >
      <Spotlight>
        {size === "banner" ? (
          <BannerLayout
            project={project}
            showTitle={showTitle}
            showDescription={showDescription}
            showTags={showTags}
          />
        ) : (
          <VerticalLayout
            project={project}
            size={size}
            showTitle={showTitle}
            showDescription={showDescription}
            showTags={showTags}
          />
        )}
      </Spotlight>
    </Link>
  )
}

export type { Project, CardSize }
