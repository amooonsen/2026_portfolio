"use client";

import {useEffect, useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {GlassCard} from "@/components/ui/glass-card";
import {TechBadge} from "@/components/ui/tech-badge";
import {cn} from "@/lib/utils";

interface TimelineItem {
  company: string;
  role: string;
  period: string;
  year: number;
  description: string;
  achievements?: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  items: TimelineItem[];
}

/**
 * 경력 타임라인 섹션 컴포넌트.
 * 중앙 세로선을 기준으로 좌우 번갈아 배치하며 GSAP ScrollTrigger로 순차 등장한다.
 * 타임라인 라인 드로우, 도트 스케일, 카드 3D 슬라이드, 뱃지 스태거 애니메이션을 포함한다.
 * @param props.items - 경력 항목 배열 (최신순 권장)
 */
export function ExperienceTimeline({items}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const cards = containerRef.current.querySelectorAll("[data-timeline-item]");
    const dots = containerRef.current.querySelectorAll("[data-timeline-dot]");
    const yearBadges = containerRef.current.querySelectorAll("[data-timeline-year]");
    const techGroups = containerRef.current.querySelectorAll("[data-tech-group]");

    const ctx = gsap.context(() => {
      // 타임라인 라인 드로우 — 컨테이너 진입 시 완전히 그어짐
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {scaleY: 0},
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // 카드 입장 — 좌우에서 3D 회전 + 페이드
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -80 : 80,
          rotateY: isLeft ? -8 : 8,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // 타임라인 도트 — 스케일 + 바운스 등장
      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // 연도 뱃지 — 페이드 + 스케일
      yearBadges.forEach((badge) => {
        gsap.from(badge, {
          opacity: 0,
          scale: 0.6,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badge,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // 기술 뱃지 — 스태거 페이드인
      techGroups.forEach((group) => {
        const badges = group.querySelectorAll("[data-tech-badge]");
        gsap.from(badges, {
          opacity: 0,
          y: 10,
          scale: 0.8,
          stagger: 0.06,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="pt-8">
      <div ref={containerRef} className="relative">
        {/* 중앙 세로선 — 스크롤 연동 드로우 */}
        <div
          ref={lineRef}
          className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-gradient-accent-from/50 via-gradient-accent-via/50 to-gradient-accent-to/50 md:left-1/2 md:block md:-translate-x-px"
        />

        <div className="space-y-16 md:space-y-20">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={`${item.company}-${item.period}`} className="relative">
                {/* 연도 뱃지 */}
                <div
                  data-timeline-year
                  className="absolute left-4 -top-4 z-10 md:left-1/2 md:-translate-x-1/2 md:-top-5"
                >
                  <time dateTime={item.year.toString()} className="rounded-full border border-accent-indigo-muted bg-accent-indigo-subtle px-3 py-1 text-xs font-medium text-accent-indigo backdrop-blur-sm">
                    {item.year}
                  </time>
                </div>

                {/* 타임라인 도트 */}
                <div
                  data-timeline-dot
                  className="absolute top-8 left-4 hidden h-4 w-4 rounded-full border-2 border-accent-indigo bg-background shadow-[0_0_12px_var(--accent-indigo-muted)] md:left-1/2 md:-translate-x-1/2 md:block"
                >
                  <div className="absolute inset-1 rounded-full bg-accent-indigo" />
                </div>

                {/* 카드 */}
                <div
                  data-timeline-item
                  className={cn(
                    "relative pl-10 pt-4 md:flex md:w-[calc(50%-2rem)] md:pl-0 md:pt-2",
                    isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10",
                  )}
                  style={{perspective: "800px"}}
                >
                  <GlassCard padding="lg" hover className="w-full">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{item.role}</h3>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                      </div>
                      <time className="shrink-0 text-sm text-muted-foreground">{item.period}</time>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    {/* 성과 목록 */}
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {item.achievements.map((achievement, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 기술 스택 뱃지 */}
                    <div data-tech-group className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span data-tech-badge key={tech}>
                          <TechBadge name={tech} size="sm" />
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type {TimelineItem};
