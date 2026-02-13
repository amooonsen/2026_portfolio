import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ExperienceLoading() {
  return (
    <Section spacing="lg" container>
      <div>
        <Skeleton className="h-9 w-32" />
        <Skeleton className="mt-2 h-5 w-44" />
      </div>

      <div className="relative mt-16 space-y-16 md:space-y-20">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i} className="relative">
            {/* 연도 뱃지 */}
            <div className="mb-4 md:flex md:justify-center">
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>

            {/* 카드 */}
            <div
              className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}
            >
              <Skeleton className="h-56 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
