"use client";

import {useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useGsapContext} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {GlassCard} from "@/components/ui/glass-card";
import {TechBadge} from "@/components/ui/tech-badge";
import {cn} from "@/lib/utils";

/**
 * 경력 타임라인 섹션 컴포넌트.
 * 중앙 세로선을 기준으로 좌우 번갈아 배치하며 GSAP ScrollTrigger로 순차 등장한다.
 * 타임라인 라인 드로우, 도트 스케일, 카드 3D 슬라이드, 뱃지 스태거 애니메이션을 포함한다.
 */
export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(containerRef, () => {
    if (!containerRef.current || reducedMotion) return;

    const cards = containerRef.current.querySelectorAll("[data-timeline-item]");
    const dots = containerRef.current.querySelectorAll("[data-timeline-dot]");
    const yearBadges = containerRef.current.querySelectorAll("[data-timeline-year]");
    const techGroups = containerRef.current.querySelectorAll("[data-tech-group]");

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
  }, [reducedMotion]);

  return (
    <div className="pt-8">
      <div ref={containerRef} className="relative">
        {/* 중앙 세로선 — 스크롤 연동 드로우 */}
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-gradient-accent-from/50 via-gradient-accent-via/50 to-gradient-accent-to/50 md:left-1/2 md:block md:-translate-x-px"
        />

        <ol className="list-none space-y-16 md:space-y-20">
          {/* ── 2026 · 프론트엔드 개발 매니저 ── */}
          <TimelineEntry year={2026} isLeft>
            <GlassCard padding="lg" hover tabIndex={0} className="w-full">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">프론트엔드 개발 매니저</h3>
                  <p className="text-sm text-muted-foreground">주식회사이트라이브</p>
                </div>
                <time className="shrink-0 text-sm text-muted-foreground">2021.10 — 현재</time>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                입사 이후 프론트엔드 개발자로 시작하여{" "}
                <span className="text-accent-highlight">FE/BE 개발 매니저</span>로 성장했습니다.
                삼성, 롯데, LG CNS 등{" "}
                <span className="text-accent-highlight">대형 고객사 프로젝트의 기술 리드</span>와
                아키텍처 설계를 담당하고 있습니다.
              </p>

              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  프론트엔드 기술 스택 선정 및 아키텍처 설계 주도
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  Core Web Vitals 최적화 — <span className="text-accent-highlight">LCP 2000ms 이하, INP 150ms 이하</span> 달성
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  <span className="text-accent-highlight">400+ 폼 필드</span> 규모의 대규모 시스템 렌더링 최적화
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  Claude Code, Antigravity 등 <span className="text-accent-highlight">AI 도구를 개발 워크플로우에 도입</span>하여 생산성 향상
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  n8n + AI Agent 자동화 파이프라인 구축으로 운영 효율화
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60" />
                  삼성·롯데 등 대형 고객사 기술 데모 및 수주 기여
                </li>
              </ul>

              <div data-tech-group className="mt-4 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "React Hook Form", "Zod", "Zustand", "Supabase"].map(
                  (tech) => (
                    <span data-tech-badge key={tech}>
                      <TechBadge name={tech} size="sm" />
                    </span>
                  ),
                )}
              </div>
            </GlassCard>
          </TimelineEntry>

          {/* ── 2021 · UI 스크립트 매니저 ── */}
          <TimelineEntry year={2021} isLeft={false}>
            <GlassCard padding="lg" hover tabIndex={0} className="w-full">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">UI 스크립트 매니저</h3>
                  <p className="text-sm text-muted-foreground">주식회사이트라이브</p>
                </div>
                <time className="shrink-0 text-sm text-muted-foreground">2021.10</time>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="text-accent-highlight">금융 데이터 시각화</span>와{" "}
                <span className="text-accent-highlight">웹 접근성 인증</span> 프로젝트를 시작으로,
                프론트엔드 개발자로서의 여정을 시작했습니다.
              </p>

              <div data-tech-group className="mt-4 flex flex-wrap gap-2">
                {["JavaScript", "Amcharts4", "SCSS", "WAI-ARIA"].map((tech) => (
                  <span data-tech-badge key={tech}>
                    <TechBadge name={tech} size="sm" />
                  </span>
                ))}
              </div>
            </GlassCard>
          </TimelineEntry>
        </ol>
      </div>
    </div>
  );
}

/** 타임라인 항목 래퍼 — 연도 뱃지 + 도트 + 좌우 배치 */
function TimelineEntry({
  year,
  isLeft,
  children,
}: {
  year: number;
  isLeft: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="relative">
      {/* 연도 뱃지 */}
      <div
        data-timeline-year
        className="absolute left-4 -top-4 z-10 md:left-1/2 md:-translate-x-1/2 md:-top-5"
      >
        <time
          dateTime={year.toString()}
          className="rounded-full border border-accent-indigo-muted bg-accent-indigo-subtle px-3 py-1 text-xs font-medium text-accent-highlight backdrop-blur-sm"
        >
          {year}
        </time>
      </div>

      {/* 타임라인 도트 */}
      <div
        data-timeline-dot
        aria-hidden="true"
        className="absolute top-8 left-4 hidden h-4 w-4 rounded-full border-2 border-accent-indigo bg-background shadow-[0_0_12px_var(--accent-indigo-muted)] md:left-1/2 md:-translate-x-1/2 md:block"
      >
        <div className="absolute inset-1 rounded-full bg-accent-indigo" />
      </div>

      {/* 카드 */}
      <div
        data-timeline-item
        className={cn(
          "relative pl-10 pt-4 md:flex md:w-[calc(50%-2rem)] md:pl-0 md:pt-2 [perspective:800px]",
          isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10",
        )}
      >
        {children}
      </div>
    </li>
  );
}
