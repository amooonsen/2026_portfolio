import { FadeIn } from "@/components/animation/fade-in"
import type { JourneyItem } from "@/data/constants/home"

interface ExperienceJourneyProps {
  items: JourneyItem[]
}

/**
 * 개발 여정 연대기 컴포넌트.
 * 경력 페이지 상단에서 연도별 주요 이력을 타임라인으로 표시한다.
 */
export function ExperienceJourney({ items }: ExperienceJourneyProps) {
  return (
    <div className="relative mt-10" role="list" aria-label="개발 여정">
      <div className="space-y-0">
        {items.map((item, i) => (
          <FadeIn key={item.year} delay={i * 0.1}>
            <article
              className="group relative grid gap-4 border-l border-white/10 py-8 pl-8 md:grid-cols-5 md:gap-8"
              role="listitem"
            >
              <div
                className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full border-2 border-indigo-400/60 bg-background transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-400/20"
                aria-hidden="true"
              />

              <div className="md:col-span-1">
                <time className="text-sm font-mono font-medium text-indigo-400">
                  {item.year}
                </time>
                <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
