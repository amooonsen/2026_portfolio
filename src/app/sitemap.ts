import { MetadataRoute } from "next"
import { getAllProjects } from "@/lib/projects"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cho-kyeongmoon.dev"

/**
 * 동적 sitemap 생성.
 * 정적 페이지와 프로젝트 페이지를 포함한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()

  // 정적 페이지
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ]

  // 프로젝트 페이지
  const projectPages = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
