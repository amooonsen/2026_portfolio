import { GlassCard } from "@/components/ui/glass-card"
import { TechBadge } from "@/components/ui/tech-badge"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
}

/**
 * 블로그 카드 컴포넌트.
 * GlassCard 기반으로 블로그 포스트 정보를 표시한다.
 * @param props.post - 블로그 포스트 데이터
 */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <GlassCard hover as="article" padding="lg">
      <a href={`/blog/${post.slug}`} className="block">
        <time
          dateTime={post.date}
          className="text-xs text-muted-foreground"
        >
          {post.date}
        </time>
        <h3 className="mt-2 text-lg font-semibold transition-colors hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {post.readingTime}
          </span>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <TechBadge key={tag} name={tag} variant="ghost" size="sm" />
            ))}
          </div>
        </div>
      </a>
    </GlassCard>
  )
}

export type { BlogPost }
