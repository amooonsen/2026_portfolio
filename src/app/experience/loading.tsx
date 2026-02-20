import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ExperienceLoading() {
  return (
    <Section spacing="lg" container>
      {/* 헤더: 프로필 이미지 + 텍스트 */}
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
        {/* 프로필 이미지 — ExperienceProfile canvas 240×240 */}
        <div className="shrink-0">
          <Skeleton className="h-60 w-60 rounded-2xl" />
        </div>

        {/* 텍스트 영역 */}
        <div className="w-full">
          <Skeleton className="h-9 w-44" /> {/* "Experience" h1 text-3xl */}
          <div className="mt-6 space-y-2.5">
            <Skeleton className="h-5 w-full max-w-lg" />
            <Skeleton className="h-5 w-11/12 max-w-lg" />
            <Skeleton className="h-5 w-4/5 max-w-md" />
          </div>
        </div>
      </div>

      {/* Journey 탭 컨텐츠 — showCareerTab=false이므로 탭 헤더 없음 */}
      <div className="mt-8 px-1 pt-8">
        <div className="relative mt-10">
          {/* 타임라인 세로 라인 */}
          <div className="absolute left-0 top-0 h-full w-px bg-border/50" aria-hidden="true" />

          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="relative py-8 pl-8">
              {/* 도트 */}
              <div
                className="absolute -left-[5px] top-10 h-3 w-3 rounded-full bg-border"
                aria-hidden="true"
              />

              {/* 그리드: 모바일=단일 / 데스크톱=5열 */}
              <div className="grid gap-4 md:grid-cols-5 md:gap-8">
                {/* 연도 + 제목 */}
                <div className="space-y-2 md:col-span-1">
                  <Skeleton className="h-4 w-14" /> {/* year */}
                  <Skeleton className="h-6 w-28" /> {/* title */}
                </div>

                {/* 설명 + 프로젝트 링크 뱃지 */}
                <div className="md:col-span-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
