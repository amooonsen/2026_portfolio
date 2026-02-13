import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {FadeIn} from "@/components/animation/fade-in";
import type {JourneyItem} from "@/data/constants/home";

interface ExperienceJourneyProps {
  items: JourneyItem[];
}

/**
 * 개발 여정 연대기 컴포넌트.
 * 경력 페이지 상단에서 연도별 주요 이력을 타임라인으로 표시한다.
 * 각 항목에 관련 프로젝트 링크를 포함한다.
 */
export function ExperienceJourney({items}: ExperienceJourneyProps) {
  return (
    <div className="relative mt-10" role="list" aria-label="개발 여정">
      <div className="space-y-0">
        {items.map((item, i) => (
          <FadeIn key={item.year} delay={i * 0.1}>
            <article
              className="group relative grid gap-4 border-l border-glass-border py-8 pl-8 md:grid-cols-5 md:gap-8"
              role="listitem"
            >
              <div
                className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full border-2 border-accent-indigo/60 bg-background transition-colors group-hover:border-accent-indigo group-hover:bg-accent-indigo-subtle"
                aria-hidden="true"
              />

              <div className="md:col-span-1">
                <time className="text-sm font-mono font-medium text-accent-highlight">{item.year}</time>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-muted-foreground leading-relaxed">
                  {item.description.split("\n").map((line, idx, arr) => (
                    <span key={idx}>
                      {line}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                {item.projects && item.projects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.projects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border border-glass-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-accent-indigo-muted hover:text-accent-highlight"
                      >
                        {project.name}
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
