import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  href: string
  title: string
  description: string
  external?: boolean
  className?: string
}

/**
 * 메인 페이지 개요 카드 컴포넌트.
 * 각 섹션 페이지로의 링크를 GlassCard 스타일로 표시한다.
 * 외부 링크인 경우 새 탭으로 연다.
 * @param props.href - 이동할 경로
 * @param props.title - 카드 제목
 * @param props.description - 카드 설명
 * @param props.external - 외부 링크 여부
 * @param props.className - 추가 CSS 클래스
 */
export function OverviewCard({
  href,
  title,
  description,
  external,
  className,
}: OverviewCardProps) {
  const content = (
    <GlassCard
      hover
      padding="lg"
      className="flex h-full flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        <span>{external ? "방문하기" : "자세히 보기"}</span>
        {external ? (
          <ExternalLink className="size-4" />
        ) : (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        )}
      </div>
    </GlassCard>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group block", className)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={cn("group block", className)}>
      {content}
    </Link>
  )
}
