import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unstable_cache } from "next/cache"
import type { Project } from "@/components/sections/project-card"
import { getPlaceholderThumbnail } from "@/data/project-thumbnails"
import { getBlurDataURL } from "@/lib/image"
import {
  fetchAllProjects as fetchFromNotion,
  fetchProjectBySlug as fetchSlugFromNotion,
  fetchAllSlugs as fetchSlugsFromNotion,
} from "./notion"

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")
const THUMBNAILS_DIR = path.join(process.cwd(), "public/images/projects")

// ---------------------------------------------------------------------------
// 파일 시스템 fallback
// ---------------------------------------------------------------------------

/** front-matter data → Project 공통 매핑 */
function toProject(slug: string, data: Record<string, unknown>): Project {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    year: data.year as number,
    period: data.period as string | undefined,
    featured: (data.featured as boolean) ?? false,
    thumbnail: data.thumbnail as string | undefined,
    images: data.images as string[] | undefined,
    links: data.links as { github?: string; live?: string } | undefined,
  }
}

function getProjectBySlugFromFiles(slug: string): Project & { content: string } {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf-8")
  const { data, content } = matter(raw)
  return { ...toProject(slug, data), content }
}

function getAllProjectsFromFiles(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data } = matter(
        fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8"),
      )
      return toProject(slug, data)
    })
    .sort((a, b) => a.year - b.year)
}

// ---------------------------------------------------------------------------
// 공개 API — Notion 우선, 실패 시 파일 시스템 fallback
// ---------------------------------------------------------------------------

/**
 * public/images/projects/{slug}.{jpg|png|webp} 파일이 있으면 경로를 반환한다.
 * 없으면 undefined.
 */
function getLocalThumbnail(slug: string): string | undefined {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(THUMBNAILS_DIR, `${slug}.${ext}`))) {
      return `/images/projects/${slug}.${ext}`
    }
  }
  return undefined
}

/**
 * 썸네일 우선순위:
 * 1. Notion에 설정된 thumbnail URL
 * 2. public/images/projects/{slug}.{jpg|png|webp}
 * 3. 로컬 placeholder SVG
 *
 * 썸네일 확정 후 로컬 이미지에 대해 blur data URL을 생성한다.
 */
async function assignThumbnails(projects: Project[]): Promise<Project[]> {
  return Promise.all(
    projects.map(async (p, i) => {
      const thumbnail = p.thumbnail ?? getLocalThumbnail(p.slug) ?? getPlaceholderThumbnail(i)
      const blurDataURL = await getBlurDataURL(thumbnail)
      return { ...p, thumbnail, blurDataURL }
    }),
  )
}

/**
 * 모든 프로젝트의 메타데이터를 반환한다.
 * Notion API 호출을 시도하고, 실패 시 로컬 마크다운 파일을 사용한다.
 * unstable_cache로 래핑하여 요청 간에도 서버 레벨 캐싱을 유지한다.
 */
export const getAllProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      return await assignThumbnails(await fetchFromNotion())
    } catch (error) {
      console.warn("[projects] Notion 실패, 로컬 파일 fallback:", error)
      return await assignThumbnails(getAllProjectsFromFiles())
    }
  },
  ["all-projects"],
  { revalidate: 3600, tags: ["projects"] },
)

/**
 * 슬러그로 단일 프로젝트(본문 포함)를 반환한다.
 * Notion API 호출을 시도하고, 실패 시 로컬 마크다운 파일을 사용한다.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<(Project & { content: string }) | null> {
  let project: (Project & { content: string }) | null = null
  try {
    project = await fetchSlugFromNotion(slug)
  } catch (error) {
    console.warn("[projects] Notion 실패, 로컬 파일 fallback:", error)
    try {
      project = getProjectBySlugFromFiles(slug)
    } catch {
      return null
    }
  }
  if (project) {
    const thumbnail = project.thumbnail ?? getLocalThumbnail(slug) ?? getPlaceholderThumbnail(0)
    const blurDataURL = await getBlurDataURL(thumbnail)
    project = { ...project, thumbnail, blurDataURL }
  }
  return project
}

/**
 * generateStaticParams용 슬러그 목록을 반환한다.
 */
export async function getAllSlugs(): Promise<string[]> {
  try {
    return await fetchSlugsFromNotion()
  } catch (error) {
    console.warn("[projects] Notion 실패, 로컬 파일 fallback:", error)
    return getAllProjectsFromFiles().map((p) => p.slug)
  }
}
