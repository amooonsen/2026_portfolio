import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  href: string
  title: string
  description: string
  className?: string
}

/**
 * 메인 페이지 개요 카드 컴포넌트.
 * 각 섹션 페이지로의 링크를 GlassCard 스타일로 표시한다.
 * @param props.href - 이동할 경로
 * @param props.title - 카드 제목
 * @param props.description - 카드 설명
 * @param props.className - 추가 CSS 클래스
 */
export function OverviewCard({
  href,
  title,
  description,
  className,
}: OverviewCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
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
          <span>자세히 보기</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </GlassCard>
    </Link>
  )
}
