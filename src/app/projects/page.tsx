import Link from "next/link";
import {ArrowRight, Sparkles, Rocket} from "lucide-react";
import {ProjectGrid} from "@/components/sections/project-grid";
import {getAllProjects} from "@/lib/projects";
import {Section} from "@/components/ui/section";
import {FadeIn} from "@/components/animation/fade-in";
import {TechBadge} from "@/components/ui/tech-badge";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "프로젝트",
  description:
    "조경문이 진행한 프론트엔드 개발 프로젝트들입니다. React, Next.js, TypeScript를 활용한 다양한 웹 애플리케이션을 확인하세요.",
  path: "/projects",
});

/**
 * 프로젝트 페이지.
 * Featured 프로젝트를 상단에 고정 표시하고, 나머지를 BentoGrid로 표시한다.
 */
export default function ProjectsPage() {
  const projects = getAllProjects();
  const featuredProject = projects.find((p) => p.slug === "ai-caramel");
  const featuredSlugs = featuredProject ? [featuredProject.slug] : [];

  return (
    <>
      {/* Featured Project — 그라디언트 보더 + 풀 와이드 카드 */}
      {featuredProject && (
        <Section spacing="sm" container>
          <FadeIn>
            <Link href={`/projects/${featuredProject.slug}`} className="group block">
              <div className="relative rounded-2xl bg-gradient-to-r from-accent-indigo/40 via-violet-500/30 to-pink-500/20 p-px transition-all duration-500 hover:from-accent-indigo/60 hover:via-violet-500/50 hover:to-pink-500/40">
                <div className="relative overflow-hidden rounded-2xl bg-background/95 backdrop-blur-xl">
                  {/* 배경 장식 */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-accent-indigo/8 to-violet-500/8 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-pink-500/6 to-violet-500/6 blur-3xl" />
                  </div>

                  <div className="relative p-6 md:p-8">
                    {/* 상단 뱃지 라인 */}
                    <div className="mb-5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        진행중
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent-indigo-muted bg-accent-indigo-subtle px-3 py-1 text-xs font-medium text-accent-indigo">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    </div>

                    {/* 콘텐츠 — 아이콘 + 텍스트 + CTA */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                      {/* 아이콘 */}
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-indigo to-violet-500 shadow-lg shadow-accent-indigo-muted md:size-16">
                        <Rocket className="size-7 text-white md:size-8" />
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                          {featuredProject.title}
                        </h1>
                        <p className="mt-1 text-xs font-medium text-muted-foreground/60 font-mono">
                          {featuredProject.period}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {featuredProject.description}
                        </p>

                        {/* 태그 */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {featuredProject.tags.map((tag) => (
                            <TechBadge key={tag} name={tag} variant="outline" size="sm" />
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 self-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-accent-indigo md:shrink-0 md:self-auto md:pt-2">
                        <span className="hidden md:inline">자세히 보기</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        </Section>
      )}

      <ProjectGrid projects={projects} excludeSlugs={featuredSlugs} />
    </>
  );
}
