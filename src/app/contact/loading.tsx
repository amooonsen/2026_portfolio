import {Skeleton} from "@/components/ui/skeleton";
import {Section} from "@/components/ui/section";

export default function ContactLoading() {
  return (
    <Section spacing="lg" container containerSize="md">
      {/* 헤더 */}
      <div className="text-center">
        <Skeleton className="mx-auto h-9 w-40" /> {/* "Get in Touch" text-3xl */}
        <div className="mt-3 space-y-2">
          <Skeleton className="mx-auto h-5 w-80" />
          <Skeleton className="mx-auto h-5 w-64" />
        </div>
      </div>

      {/* 폼 카드 — GlassCard padding="lg"(p-8) mx-auto mt-10 max-w-xl */}
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border p-8">
        <div className="space-y-6">
          {/* 이름 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* 소속 / 직위 — sm:grid-cols-2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          {/* 메시지 — textarea rows=5 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          {/* 전송 버튼 */}
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </Section>
  );
}
