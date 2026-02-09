import type { Metadata } from "next"
import { Section } from "@/components/ui/section"
import { GradientText } from "@/components/ui/gradient-text"
import { FadeIn } from "@/components/animation/fade-in"
import { StaggerChildren } from "@/components/animation/stagger-children"
import { BlogCard } from "@/components/sections/blog-card"
import { blogPosts } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "블로그",
}

/**
 * 블로그 페이지.
 * 기술 블로그 포스트 목록을 카드 그리드로 표시한다.
 */
export default function BlogPage() {
  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          Blog
        </GradientText>
        <p className="mt-2 text-muted-foreground">
          개발 경험과 기술적 인사이트를 공유합니다.
        </p>
      </FadeIn>
      <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </StaggerChildren>
    </Section>
  )
}
