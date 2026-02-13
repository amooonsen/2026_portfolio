import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ProjectsLoading() {
  return (
    <Section spacing="lg" container>
      <div>
        <Skeleton className="h-9 w-28" />
        <Skeleton className="mt-2 h-5 w-56" />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* featured 프로젝트 (2x2) */}
        <div className="sm:col-span-2 sm:row-span-2">
          <Skeleton className="h-80 rounded-xl sm:h-full" />
        </div>

        {/* 일반 프로젝트 카드 */}
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-xl" />
        ))}
      </div>
    </Section>
  );
}
