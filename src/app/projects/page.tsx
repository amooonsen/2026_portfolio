import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Section} from "@/components/ui/section";
import {TechBadge} from "@/components/ui/tech-badge";
import {FadeIn} from "@/components/animation/fade-in";
import {ProjectGrid} from "@/components/sections/project-grid";
import {getAllProjects} from "@/lib/projects";
import {createMetadata} from "@/lib/metadata";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "프로젝트",
  description:
    "조경문이 진행한 프론트엔드 개발 프로젝트들입니다. React, Next.js, TypeScript를 활용한 다양한 웹 애플리케이션을 확인하세요.",
  path: "/projects",
});

/**
 * 프로젝트 페이지.
 * Featured 프로젝트를 상단에 인라인 배너로 표시하고, 나머지를 BentoGrid로 표시한다.
 * Section 래퍼와 Featured 배너는 서버에서 렌더링되고, 그리드는 클라이언트에서 애니메이션된다.
 */
export default async function ProjectsPage() {
  const projects = await getAllProjects();
  // 진행중 프로젝트 중 가장 최근 연도 기준으로 배너에 표시할 1개 선택
  const featuredProject =
    [...projects]
      .filter((p) => p.featured)
      .sort((a, b) => b.year - a.year)[0] ?? null;
  const gridProjects = featuredProject
    ? projects.filter((p) => p.slug !== featuredProject.slug)
    : projects;

  return (
    <Section spacing="md" container>
      <ProjectGrid projects={gridProjects}>
        {/* Featured Project — 서버 렌더링 배너 */}
        {featuredProject && (
          <FadeIn>
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="group mt-8 block focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none focus-visible:rounded-xl"
            >
              <div className="flex items-center gap-4 rounded-xl border border-border px-5 py-4 transition-colors duration-200 hover:border-accent-highlight/30 hover:bg-glass-hover-bg md:gap-6">
                {/* 뱃지 + 타이틀 */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      진행중
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider text-accent-highlight uppercase">
                      Featured
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-lg font-bold text-foreground md:text-xl">
                    {featuredProject.title}
                    <span className="ml-2 font-mono text-xs font-normal text-muted-foreground/50">
                      {featuredProject.period}
                    </span>
                  </h2>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {featuredProject.description}
                  </p>
                </div>

                {/* 태그 — 데스크톱만 */}
                <div className="hidden shrink-0 items-center gap-2 lg:flex">
                  {featuredProject.tags.slice(0, 3).map((tag) => (
                    <TechBadge key={tag} name={tag} variant="outline" size="sm" />
                  ))}
                </div>

                {/* CTA 화살표 */}
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent-highlight" />
              </div>
            </Link>
          </FadeIn>
        )}
      </ProjectGrid>
    </Section>
  );
}
