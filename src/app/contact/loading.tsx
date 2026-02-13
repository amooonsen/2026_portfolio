import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ContactLoading() {
  return (
    <Section spacing="lg" container containerSize="md">
      {/* 타이틀 */}
      <div className="text-center">
        <Skeleton className="mx-auto h-9 w-40" />
        <Skeleton className="mx-auto mt-4 h-5 w-72" />
      </div>

      {/* 폼 카드 */}
      <div className="mx-auto mt-10 max-w-xl">
        <Skeleton className="h-[420px] rounded-xl" />
      </div>

      {/* 소셜 링크 */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton key={i} className="h-11 w-11 rounded-full" />
        ))}
      </div>
      <Skeleton className="mx-auto mt-4 h-4 w-48" />
    </Section>
  );
}
