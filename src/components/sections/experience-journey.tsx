"use client";

import {useEffect, useRef} from "react";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {cn} from "@/lib/utils";
import type {JourneyItem} from "@/data/constants/home";

interface ExperienceJourneyProps {
  items: JourneyItem[];
}

/**
 * 개발 여정 연대기 컴포넌트.
 * 스크롤 드로잉 타임라인, 도트 글로우, 교차 방향 슬라이드인 애니메이션을 포함한다.
 */
export function ExperienceJourney({items}: ExperienceJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const articles = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-item]");
    const dots = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-dot]");
    const dotGlows = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-dot-glow]");
    const yearEls = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-year]");
    const descEls = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-desc]");
    const linkContainers = containerRef.current.querySelectorAll<HTMLElement>("[data-journey-links]");

    const ctx = gsap.context(() => {
      // 1. 타임라인 라인 스크롤 드로잉
      // scaleY 대신 실측 높이(px) 기반 height 애니메이션으로 해상도 무관 동작
      if (timelineLineRef.current) {
        const containerH = containerRef.current!.offsetHeight;
        gsap.set(timelineLineRef.current, {height: 0});
        gsap.to(timelineLineRef.current, {
          height: containerH,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top 80%",
            end: `+=${containerH}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // 2. 각 여정 아이템 교차 등장
      articles.forEach((article, i) => {
        const fromLeft = i % 2 === 0;

        // 아이템 카드 등장
        gsap.set(article, {
          opacity: 0,
          x: fromLeft ? -60 : 60,
          y: 30,
          scale: 0.95,
        });
        gsap.to(article, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // 도트 스케일인 + 글로우
        if (dots[i]) {
          gsap.set(dots[i], {scale: 0, opacity: 0});
          gsap.to(dots[i], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // 도트 펄스 글로우
        if (dotGlows[i]) {
          gsap.set(dotGlows[i], {scale: 0, opacity: 0});
          gsap.to(dotGlows[i], {
            scale: 1,
            opacity: 0.6,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
          // 지속적 펄스
          gsap.to(dotGlows[i], {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            delay: 0.6,
            ease: "power1.out",
          });
        }

        // 연도 텍스트 카운터 느낌 (클립 리빌)
        if (yearEls[i]) {
          gsap.set(yearEls[i], {
            opacity: 0,
            y: 20,
            scale: 1.2,
          });
          gsap.to(yearEls[i], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // 설명 텍스트 페이드인
        if (descEls[i]) {
          gsap.set(descEls[i], {opacity: 0, y: 15});
          gsap.to(descEls[i], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // 프로젝트 링크 뱃지 스태거
        if (linkContainers[i]) {
          const links = linkContainers[i].querySelectorAll("a");
          if (links.length > 0) {
            gsap.set(links, {opacity: 0, scale: 0.7, y: 10});
            gsap.to(links, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              delay: 0.45,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: article,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, items]);

  return (
    <div ref={containerRef} className="relative mt-10" role="list" aria-label="개발 여정">
      {/* 스크롤 드로잉 타임라인 라인 */}
      <div
        ref={timelineLineRef}
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-indigo via-gradient-accent-via to-gradient-accent-to"
        aria-hidden="true"
      />

      <div className="space-y-0">
        {items.map((item, i) => (
          <article
            key={item.year}
            data-journey-item
            className="group relative grid gap-4 py-8 pl-8 md:grid-cols-5 md:gap-8"
            role="listitem"
          >
            {/* 도트 + 펄스 글로우 */}
            <div className="absolute -left-[6px] top-10" aria-hidden="true">
              <span
                data-journey-dot
                className="relative block h-3 w-3 rounded-full border-2 border-accent-indigo bg-background transition-colors group-hover:border-accent-indigo group-hover:bg-accent-indigo-subtle"
              />
              <span
                data-journey-dot-glow
                className="absolute -inset-1 rounded-full bg-accent-indigo/40"
              />
            </div>

            <div className="md:col-span-1">
              <time
                data-journey-year
                className="text-sm font-mono font-bold text-accent-highlight"
              >
                {item.year}
              </time>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
            </div>

            <div className="md:col-span-4">
              <p data-journey-desc className="text-muted-foreground leading-relaxed">
                {item.description.split("\n").map((line, idx, arr) => (
                  <span key={idx}>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>

              {item.projects && item.projects.length > 0 && (
                <div data-journey-links className="mt-3 flex flex-wrap gap-2">
                  {item.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border border-glass-border px-3 py-1 text-xs font-medium text-muted-foreground",
                        "transition-all duration-200",
                        "hover:border-accent-indigo-muted hover:text-accent-highlight hover:-translate-y-0.5 hover:shadow-sm",
                      )}
                    >
                      {project.name}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
