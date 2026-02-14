import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project } from "@/components/sections/project-card"

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

/**
 * 단일 마크다운 파일을 파싱하여 Project 객체를 반환한다.
 * @param slug - 파일명(확장자 제외)
 */
export function getProjectBySlug(slug: string): Project & { content: string } {
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

/**
 * 모든 프로젝트의 메타데이터만 파싱하여 year 기준 오름차순으로 반환한다.
 * content 필드를 제외하여 직렬화 비용을 줄인다.
 */
export function getAllProjects(): Project[] {
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
