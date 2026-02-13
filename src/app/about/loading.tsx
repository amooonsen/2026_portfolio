import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function AboutLoading() {
  return (
    <>
      {/* AboutHero 스켈레톤 */}
      <Section spacing="lg" container>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="w-full max-w-3xl space-y-4">
            <Skeleton className="mx-auto h-6 w-full" />
            <Skeleton className="mx-auto h-6 w-5/6" />
            <Skeleton className="mx-auto h-6 w-4/6" />
          </div>
        </div>
      </Section>

      {/* About Me 스켈레톤 */}
      <Section spacing="lg" container>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="mt-6 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-4 h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </Section>

      {/* Journey 스켈레톤 */}
      <Section spacing="lg" container>
        <Skeleton className="h-9 w-28" />
        <Skeleton className="mt-2 h-5 w-56" />
        <div className="mt-10 space-y-8">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="grid gap-4 border-l border-glass-border py-6 pl-8 md:grid-cols-5">
              <div className="space-y-2 md:col-span-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="md:col-span-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Philosophy 스켈레톤 */}
      <Section spacing="lg" container>
        <Skeleton className="h-9 w-32" />
        <Skeleton className="mt-2 h-5 w-64" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({length: 6}).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-xl" />
          ))}
        </div>
      </Section>

      {/* Skills 스켈레톤 */}
      <Section spacing="lg" container>
        <Skeleton className="h-9 w-32" />
        <Skeleton className="mt-2 h-5 w-48" />
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {Array.from({length: 2}).map((_, col) => (
            <div key={col} className="space-y-6">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* TechStack 스켈레톤 */}
      <Section spacing="lg" container>
        <Skeleton className="h-9 w-36" />
        <Skeleton className="mt-2 h-5 w-52" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({length: 3}).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </Section>
    </>
  );
}
