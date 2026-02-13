import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ProjectDetailLoading() {
  return (
    <Section spacing="lg" container containerSize="md">
      {/* 뒤로가기 링크 */}
      <Skeleton className="mb-8 h-5 w-28" />

      {/* 제목 */}
      <Skeleton className="h-12 w-3/4 md:h-14" />

      {/* 태그 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({length: 5}).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>

      {/* 콘텐츠 카드 */}
      <Skeleton className="mt-8 h-64 rounded-xl" />

      {/* 갤러리 */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>

      {/* 링크 버튼 */}
      <div className="mt-8 flex gap-4">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
    </Section>
  );
}
