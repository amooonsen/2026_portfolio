import { Container } from "@/components/ui/container"

/**
 * 전역 로딩 스켈레톤.
 * 라우트 전환 시 표시되는 shimmer 애니메이션 스켈레톤 UI.
 */
export default function Loading() {
  return (
    <Container className="py-20">
      <div className="animate-pulse space-y-8">
        {/* 제목 스켈레톤 */}
        <div className="space-y-3">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-80 rounded-md bg-muted" />
        </div>

        {/* 콘텐츠 스켈레톤 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
