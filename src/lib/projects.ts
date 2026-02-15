import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project } from "@/components/sections/project-card"
import {
  fetchAllProjects as fetchFromNotion,
  fetchProjectBySlug as fetchSlugFromNotion,
  fetchAllSlugs as fetchSlugsFromNotion,
} from "./notion"

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

// ---------------------------------------------------------------------------
// 파일 시스템 fallback (기존 로직)
// ---------------------------------------------------------------------------

function getProjectBySlugFromFiles(slug: string): Project & { content: string } {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags ?? [],
    year: data.year,
    period: data.period,
    featured: data.featured ?? false,
    thumbnail: data.thumbnail,
    images: data.images,
    links: data.links,
    content,
  }
}

function getAllProjectsFromFiles(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"))

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const filePath = path.join(PROJECTS_DIR, file)
      const raw = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(raw)

      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags ?? [],
        year: data.year,
        period: data.period,
        featured: data.featured ?? false,
        thumbnail: data.thumbnail,
        images: data.images,
        links: data.links,
      }
    })
    .sort((a, b) => a.year - b.year)
}

// ---------------------------------------------------------------------------
// 공개 API — Notion 우선, 실패 시 파일 시스템 fallback
// ---------------------------------------------------------------------------

/**
 * 모든 프로젝트의 메타데이터를 반환한다.
 * Notion API 호출을 시도하고, 실패 시 로컬 마크다운 파일을 사용한다.
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    return await fetchFromNotion()
  } catch (error) {
    console.warn("[projects] Notion 실패, 로컬 파일 fallback:", error)
    return getAllProjectsFromFiles()
  }
}

/**
 * 슬러그로 단일 프로젝트(본문 포함)를 반환한다.
 * Notion API 호출을 시도하고, 실패 시 로컬 마크다운 파일을 사용한다.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<(Project & { content: string }) | null> {
  try {
    return await fetchSlugFromNotion(slug)
  } catch (error) {
    console.warn("[projects] Notion 실패, 로컬 파일 fallback:", error)
    try {
      return getProjectBySlugFromFiles(slug)
    } catch {
      return null
    }
  }
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
