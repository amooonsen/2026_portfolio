import {Section} from "@/components/ui/section";
import {GlassCard} from "@/components/ui/glass-card";
import {Skeleton} from "@/components/ui/skeleton";

/**
 * 프로젝트 상세 페이지 로딩 스켈레톤.
 * 실제 레이아웃(뒤로가기 → 제목 → 태그 → 본문 카드 → 링크 → 하단 버튼 + xl ToC)을 반영한다.
 */
export default function ProjectDetailLoading() {
  return (
    <Section spacing="lg" container>
      <div className="mx-auto max-w-3xl xl:max-w-none xl:grid xl:grid-cols-[1fr_200px] xl:gap-10">
        {/* 메인 콘텐츠 */}
        <div className="min-w-0">
          {/* 뒤로가기 링크 */}
          <Skeleton className="mb-8 h-5 w-28" />

          {/* 제목 */}
          <Skeleton className="h-10 w-3/4 md:h-12" />

          {/* 태그 배지 */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>

          {/* 본문 카드 */}
          <GlassCard padding="lg" className="mt-8">
            <div className="space-y-4">
              <Skeleton className="h-7 w-2/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="pt-2" />
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
              <div className="pt-2" />
              <Skeleton className="h-7 w-2/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </GlassCard>

          {/* 외부 링크 버튼 */}
          <div className="mt-8 flex gap-4">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          {/* 하단 목록으로 버튼 */}
          <div className="mt-16 flex justify-center border-t border-border/30 pt-8">
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>

        {/* ToC 사이드바 — xl 이상 */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </aside>
      </div>
    </Section>
  );
}
