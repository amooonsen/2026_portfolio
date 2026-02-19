import {siteConfig} from "@/lib/metadata";

/**
 * Person Schema (개인 프로필)
 */
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: siteConfig.author.email,
    jobTitle: "Frontend Developer",
    description: siteConfig.description,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Frontend Development",
      "GSAP",
      "Three.js",
    ],
    sameAs: [
      // 실제 소셜 미디어 링크로 교체하세요
      "https://github.com/amoonsen",
      // "https://linkedin.com/in/cho-kyeongmoon",
      "https://www.instagram.com/_mo___on/",
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
  );
}

/**
 * Website Schema (웹사이트)
 */
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    inLanguage: "ko-KR",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
  );
}

/**
 * BreadcrumbList Schema
 */
export function BreadcrumbSchema({items}: {items: Array<{name: string; url: string}>}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
  );
}

/**
 * CreativeWork Schema (프로젝트)
 */
export function ProjectSchema({
  title,
  description,
  image,
  datePublished,
  tags,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  tags?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    ...(image && {image}),
    ...(datePublished && {datePublished}),
    ...(tags && {keywords: tags.join(", ")}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
  );
}
