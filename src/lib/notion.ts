import { cache } from "react"
import { Client } from "@notionhq/client"
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

import type { Project } from "@/components/sections/project-card"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
  console.warn("[notion] NOTION_TOKEN 또는 NOTION_DATABASE_ID 환경변수 누락")
}

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

/** Notion DB 프로퍼티명 — DB 스키마 변경 시 여기만 수정 */
const PROP = {
  title: "프로젝트 제목",
  slug: "Slug",
  description: "설명",
  status: "상태",
  public: "공개",
  year: "연도",
  tags: "태그",
  period: "기간",
  thumbnail: "썸네일",
  images: "이미지",
  github: "GitHub",
  live: "Live",
  url: "URL",
} as const

// ---------------------------------------------------------------------------
// Database query — REST API 직접 호출
// SDK v5.x dataSources.query() 비호환으로 안정적인 databases API 사용
// ---------------------------------------------------------------------------

async function queryDatabase(body: {
  filter?: Record<string, unknown>
  sorts?: Array<Record<string, unknown>>
  start_cursor?: string
  page_size?: number
}) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  )

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ code: res.status, message: res.statusText }))
    throw new Error(`Notion API error: ${err.code} — ${err.message}`)
  }

  return res.json() as Promise<{
    results: PageObjectResponse[]
    has_more: boolean
    next_cursor: string | null
  }>
}

// ---------------------------------------------------------------------------
// Property helpers
// ---------------------------------------------------------------------------

type PageProperty = PageObjectResponse["properties"][string]

/** title / rich_text 프로퍼티에서 plain text를 추출한다 */
function getText(prop: PageProperty | undefined): string {
  if (!prop) return ""
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("")
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("")
  return ""
}

function getStatus(prop: PageProperty | undefined): string | null {
  if (prop?.type === "status") return prop.status?.name ?? null
  return null
}

function getMultiSelect(prop: PageProperty | undefined): string[] {
  if (prop?.type === "multi_select") return prop.multi_select.map((s) => s.name)
  return []
}

function getNumber(prop: PageProperty | undefined): number {
  if (prop?.type === "number") return prop.number ?? 0
  return 0
}

function getUrl(prop: PageProperty | undefined): string | undefined {
  if (prop?.type === "url") return prop.url ?? undefined
  return undefined
}

// ---------------------------------------------------------------------------
// Rich text → Markdown
// ---------------------------------------------------------------------------

function richTextToMarkdown(richTexts: RichTextItemResponse[]): string {
  return richTexts
    .map((rt) => {
      let text = rt.plain_text
      const { bold, italic, strikethrough, code } = rt.annotations

      if (code) {
        text = `\`${text}\``
      } else {
        if (bold) text = `**${text}**`
        if (italic) text = `*${text}*`
        if (strikethrough) text = `~~${text}~~`
      }

      if (rt.href) text = `[${text}](${rt.href})`
      return text
    })
    .join("")
}

// ---------------------------------------------------------------------------
// Page → Project 매핑
// ---------------------------------------------------------------------------

function pageToProject(page: PageObjectResponse): Project {
  const p = page.properties

  const status = getStatus(p[PROP.status])
  const imagesRaw = getText(p[PROP.images])
  const images = imagesRaw
    ? imagesRaw
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    : undefined

  const github = getUrl(p[PROP.github])
  const live = getUrl(p[PROP.live]) ?? getUrl(p[PROP.url])
  const links = github || live ? { github, live } : undefined

  return {
    slug: getText(p[PROP.slug]),
    title: getText(p[PROP.title]),
    description: getText(p[PROP.description]),
    thumbnail: getUrl(p[PROP.thumbnail]),
    tags: getMultiSelect(p[PROP.tags]),
    year: getNumber(p[PROP.year]),
    period: getText(p[PROP.period]) || undefined,
    featured: status === "진행중",
    images,
    links,
  }
}

// ---------------------------------------------------------------------------
// Blocks → Markdown
// ---------------------------------------------------------------------------

async function fetchAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })

    for (const block of response.results) {
      if ("type" in block) blocks.push(block as BlockObjectResponse)
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined
  } while (cursor)

  return blocks
}

async function fetchChildMarkdown(
  blockId: string,
  indent: string = "  ",
): Promise<string> {
  const children = await fetchAllBlocks(blockId)
  const md = await blocksToMarkdown(children)
  return md
    .split("\n")
    .map((line) => (line ? `${indent}${line}` : ""))
    .join("\n")
}

/** 다음 블록이 같은 타입이 아니면 빈 줄을 추가해야 함 (리스트 아이템 간격) */
function isEndOfList(
  blocks: BlockObjectResponse[],
  index: number,
  type: string,
): boolean {
  const next = blocks[index + 1]
  return !next || next.type !== type
}

async function blocksToMarkdown(
  blocks: BlockObjectResponse[],
): Promise<string> {
  const lines: string[] = []
  let numberedIndex = 0

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    if (block.type === "numbered_list_item") {
      numberedIndex++
    } else {
      numberedIndex = 0
    }

    switch (block.type) {
      case "paragraph": {
        lines.push(richTextToMarkdown(block.paragraph.rich_text))
        if (block.has_children) lines.push(await fetchChildMarkdown(block.id))
        lines.push("")
        break
      }

      case "heading_2":
        lines.push(`## ${richTextToMarkdown(block.heading_2.rich_text)}`, "")
        break

      case "heading_3":
        lines.push(`### ${richTextToMarkdown(block.heading_3.rich_text)}`, "")
        break

      case "bulleted_list_item": {
        lines.push(`- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}`)
        if (block.has_children) lines.push(await fetchChildMarkdown(block.id))
        if (isEndOfList(blocks, i, "bulleted_list_item")) lines.push("")
        break
      }

      case "numbered_list_item": {
        lines.push(`${numberedIndex}. ${richTextToMarkdown(block.numbered_list_item.rich_text)}`)
        if (block.has_children) lines.push(await fetchChildMarkdown(block.id))
        if (isEndOfList(blocks, i, "numbered_list_item")) lines.push("")
        break
      }

      case "code": {
        const lang =
          block.code.language === "plain text" ? "" : block.code.language
        lines.push(
          `\`\`\`${lang}`,
          richTextToMarkdown(block.code.rich_text),
          "```",
          "",
        )
        break
      }

      case "image": {
        const url =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url
        const caption =
          block.image.caption.length > 0
            ? richTextToMarkdown(block.image.caption)
            : ""
        lines.push(`![${caption}](${url})`, "")
        break
      }

      case "quote": {
        lines.push(`> ${richTextToMarkdown(block.quote.rich_text)}`)
        if (block.has_children)
          lines.push(await fetchChildMarkdown(block.id, "> "))
        lines.push("")
        break
      }

      case "callout": {
        const icon = block.callout.icon
        const emoji = icon?.type === "emoji" ? `${icon.emoji} ` : ""
        lines.push(`> ${emoji}${richTextToMarkdown(block.callout.rich_text)}`)
        if (block.has_children)
          lines.push(await fetchChildMarkdown(block.id, "> "))
        lines.push("")
        break
      }

      case "divider":
        lines.push("---", "")
        break

      case "table": {
        const rows = await fetchAllBlocks(block.id)
        const tableRows = rows.filter(
          (r): r is BlockObjectResponse & { type: "table_row" } =>
            r.type === "table_row",
        )

        for (let rowIdx = 0; rowIdx < tableRows.length; rowIdx++) {
          const cells = tableRows[rowIdx].table_row.cells.map((cell) =>
            richTextToMarkdown(cell),
          )
          lines.push(`| ${cells.join(" | ")} |`)
          if (rowIdx === 0) {
            lines.push(`| ${cells.map(() => "---").join(" | ")} |`)
          }
        }
        lines.push("")
        break
      }

      default:
        break
    }
  }

  return lines.join("\n").trimEnd()
}

// ---------------------------------------------------------------------------
// DB 쿼리 공통 필터
// ---------------------------------------------------------------------------

const baseFilter = {
  and: [
    { property: PROP.public, checkbox: { equals: true } },
    { property: PROP.status, status: { does_not_equal: "보류" } },
  ],
}

// ---------------------------------------------------------------------------
// Exported functions (React.cache로 중복 호출 방지)
// ---------------------------------------------------------------------------

export const fetchAllProjects = cache(async (): Promise<Project[]> => {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await queryDatabase({
      filter: baseFilter,
      sorts: [{ property: PROP.year, direction: "ascending" }],
      start_cursor: cursor,
      page_size: 100,
    })

    for (const page of response.results) {
      if ("properties" in page) pages.push(page as PageObjectResponse)
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined
  } while (cursor)

  return pages.map(pageToProject)
})

export const fetchProjectBySlug = cache(
  async (slug: string): Promise<(Project & { content: string }) | null> => {
    const response = await queryDatabase({
      filter: {
        and: [
          ...baseFilter.and,
          { property: PROP.slug, rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    })

    const page = response.results[0]
    if (!page || !("properties" in page)) return null

    const typedPage = page as PageObjectResponse
    const project = pageToProject(typedPage)
    const blocks = await fetchAllBlocks(typedPage.id)
    const content = await blocksToMarkdown(blocks)

    return { ...project, content }
  },
)

export const fetchAllSlugs = cache(async (): Promise<string[]> => {
  const projects = await fetchAllProjects()
  return projects.map((p) => p.slug).filter(Boolean)
})
