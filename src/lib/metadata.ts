import type { Metadata } from "next"

/**
 * 사이트 기본 정보
 */
export const siteConfig = {
  name: "조경문 | Frontend Developer",
  description:
    "4년 경력 프론트엔드 개발자 조경문의 포트폴리오입니다. React, Next.js, TypeScript를 주력으로 하며, Claude Code·Antigravity 등 AI 도구를 활용해 모던 웹 애플리케이션을 구축합니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cho-kyeongmoon.dev",
  author: {
    name: "조경문",
    email: "cho.kyeongmoon@example.com",
    url: "https://cho-kyeongmoon.dev",
  },
  ogImage: "/opengraph-image.png",
  keywords: [
    "프론트엔드 개발자",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI 활용 개발",
    "Claude Code",
    "웹 개발",
    "조경문",
    "포트폴리오",
  ],
}

/**
 * 기본 메타데이터 생성 함수
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = "",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@cho_kyeongmoon",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  }
}
