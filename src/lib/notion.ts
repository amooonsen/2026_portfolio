import { cache } from "react"
import { Client } from "@notionhq/client"
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

import type { Project } from "@/components/sections/project-card"

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const dataSourceId = process.env.NOTION_DATABASE_ID!

// ---------------------------------------------------------------------------
// Property helpers
// ---------------------------------------------------------------------------

/** Notion 페이지의 프로퍼티에서 값을 안전하게 추출하는 헬퍼 */
type PageProperty = PageObjectResponse["properties"][string]

function getTitle(prop: PageProperty | undefined): string {
  if (prop?.type === "title") {
    return prop.title.map((t) => t.plain_text).join("")
  }
  return ""
}

function getRichText(prop: PageProperty | undefined): string {
  if (prop?.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("")
  }
  return ""
}

function getSelect(prop: PageProperty | undefined): string | null {
  if (prop?.type === "select") {
    return prop.select?.name ?? null
  }
  return null
}

function getMultiSelect(prop: PageProperty | undefined): string[] {
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((s) => s.name)
  }
  return []
}

function getNumber(prop: PageProperty | undefined): number {
  if (prop?.type === "number") {
    return prop.number ?? 0
  }
  return 0
}

function getUrl(prop: PageProperty | undefined): string | undefined {
  if (prop?.type === "url") {
    return prop.url ?? undefined
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Rich text → Markdown inline formatting
// ---------------------------------------------------------------------------

function richTextToMarkdown(richTexts: RichTextItemResponse[]): string {
  return richTexts
    .map((rt) => {
      let text = rt.plain_text
      const { bold, italic, strikethrough, code } = rt.annotations
      const href = rt.href

      // 인라인 코드는 다른 서식보다 우선
      if (code) {
        text = `\`${text}\``
      } else {
        if (bold) text = `**${text}**`
        if (italic) text = `*${text}*`
        if (strikethrough) text = `~~${text}~~`
      }

      if (href) {
        text = `[${text}](${href})`
      }

      return text
    })
    .join("")
}

// ---------------------------------------------------------------------------
// Notion page → Project 매핑
// ---------------------------------------------------------------------------

function pageToProject(page: PageObjectResponse): Project {
  const props = page.properties

  const status = getSelect(props["상태"])
  const imagesRaw = getRichText(props["이미지"])
  const images = imagesRaw
    ? imagesRaw
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    : undefined

  const github = getUrl(props["GitHub"])
  const live = getUrl(props["Live"])
  const links =
    github || live ? { github, live } : undefined

  return {
    slug: getRichText(props["Slug"]),
    title: getTitle(props["이름"]),
    description: getRichText(props["설명"]),
    thumbnail: getUrl(props["썸네일"]),
    tags: getMultiSelect(props["태그"]),
    year: getNumber(props["연도"]),
    period: getRichText(props["기간"]) || undefined,
    featured: status === "진행중",
    images,
    links,
  }
}

// ---------------------------------------------------------------------------
// Blocks → Markdown
// ---------------------------------------------------------------------------

/** 모든 블록을 재귀적으로 페이징하여 가져온다 */
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
      if ("type" in block) {
        blocks.push(block as BlockObjectResponse)
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

/** has_children인 블록의 자식을 재귀적으로 가져와 마크다운으로 변환한다 */
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

/** Notion 블록 배열을 마크다운 문자열로 변환한다 */
async function blocksToMarkdown(
  blocks: BlockObjectResponse[],
): Promise<string> {
  const lines: string[] = []
  let numberedIndex = 0

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    // numbered_list_item의 연속 인덱스 관리
    if (block.type === "numbered_list_item") {
      numberedIndex++
    } else {
      numberedIndex = 0
    }

    switch (block.type) {
      case "paragraph": {
        const text = richTextToMarkdown(block.paragraph.rich_text)
        lines.push(text)
        if (block.has_children) {
          lines.push(await fetchChildMarkdown(block.id))
        }
        lines.push("")
        break
      }

      case "heading_2": {
        const text = richTextToMarkdown(block.heading_2.rich_text)
        lines.push(`## ${text}`)
        lines.push("")
        break
      }

      case "heading_3": {
        const text = richTextToMarkdown(block.heading_3.rich_text)
        lines.push(`### ${text}`)
        lines.push("")
        break
      }

      case "bulleted_list_item": {
        const text = richTextToMarkdown(block.bulleted_list_item.rich_text)
        lines.push(`- ${text}`)
        if (block.has_children) {
          lines.push(await fetchChildMarkdown(block.id))
        }
        // 다음 블록이 bulleted_list_item이 아니면 빈 줄 추가
        const nextBlock = blocks[i + 1]
        if (!nextBlock || nextBlock.type !== "bulleted_list_item") {
          lines.push("")
        }
        break
      }

      case "numbered_list_item": {
        const text = richTextToMarkdown(block.numbered_list_item.rich_text)
        lines.push(`${numberedIndex}. ${text}`)
        if (block.has_children) {
          lines.push(await fetchChildMarkdown(block.id))
        }
        // 다음 블록이 numbered_list_item이 아니면 빈 줄 추가
        const nextBlock = blocks[i + 1]
        if (!nextBlock || nextBlock.type !== "numbered_list_item") {
          lines.push("")
        }
        break
      }

      case "code": {
        const text = richTextToMarkdown(block.code.rich_text)
        const lang = block.code.language === "plain text" ? "" : block.code.language
        lines.push(`\`\`\`${lang}`)
        lines.push(text)
        lines.push("```")
        lines.push("")
        break
      }

      case "image": {
        const url =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url
        const caption = block.image.caption.length > 0
          ? richTextToMarkdown(block.image.caption)
          : ""
        lines.push(`![${caption}](${url})`)
        lines.push("")
        break
      }

      case "quote": {
        const text = richTextToMarkdown(block.quote.rich_text)
        lines.push(`> ${text}`)
        if (block.has_children) {
          const childMd = await fetchChildMarkdown(block.id, "> ")
          lines.push(childMd)
        }
        lines.push("")
        break
      }

      case "divider": {
        lines.push("---")
        lines.push("")
        break
      }

      case "callout": {
        const text = richTextToMarkdown(block.callout.rich_text)
        const icon = block.callout.icon
        let emoji = ""
        if (icon?.type === "emoji") {
          emoji = `${icon.emoji} `
        }
        lines.push(`> ${emoji}${text}`)
        if (block.has_children) {
          const childMd = await fetchChildMarkdown(block.id, "> ")
          lines.push(childMd)
        }
        lines.push("")
        break
      }

      case "table": {
        const rows = await fetchAllBlocks(block.id)
        const tableRows = rows.filter(
          (r): r is BlockObjectResponse & { type: "table_row" } =>
            r.type === "table_row",
        )

        for (let rowIdx = 0; rowIdx < tableRows.length; rowIdx++) {
          const row = tableRows[rowIdx]
          const cells = row.table_row.cells.map((cell) =>
            richTextToMarkdown(cell),
          )
          lines.push(`| ${cells.join(" | ")} |`)

          // 첫 번째 행(헤더) 뒤에 구분선 추가
          if (rowIdx === 0) {
            lines.push(`| ${cells.map(() => "---").join(" | ")} |`)
          }
        }
        lines.push("")
        break
      }

      default:
        // 지원하지 않는 블록 타입은 건너뛴다
        break
    }
  }

  return lines.join("\n").trimEnd()
}

// ---------------------------------------------------------------------------
// DB 쿼리 공통 필터
// ---------------------------------------------------------------------------

/** 공개===true, 상태!==보류 필터 */
const baseFilter = {
  and: [
    {
      property: "공개",
      checkbox: { equals: true as const },
    },
    {
      property: "상태",
      select: { does_not_equal: "보류" },
    },
  ],
}

// ---------------------------------------------------------------------------
// Exported functions (React.cache로 중복 호출 방지)
// ---------------------------------------------------------------------------

/**
 * 모든 프로젝트를 조회한다.
 * 공개===true, 상태!==보류 필터 적용 후 연도 오름차순 정렬.
 */
export const fetchAllProjects = cache(async (): Promise<Project[]> => {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: baseFilter,
      sorts: [{ property: "연도", direction: "ascending" }],
      start_cursor: cursor,
      page_size: 100,
    })

    for (const page of response.results) {
      if ("properties" in page) {
        pages.push(page as PageObjectResponse)
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return pages.map(pageToProject)
})

/**
 * 슬러그로 단일 프로젝트를 조회하고 본문 블록을 마크다운으로 변환한다.
 * 해당 슬러그가 없거나 비공개/보류 상태이면 null을 반환한다.
 */
export const fetchProjectBySlug = cache(
  async (slug: string): Promise<(Project & { content: string }) | null> => {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          ...baseFilter.and,
          {
            property: "Slug",
            rich_text: { equals: slug },
          },
        ],
      },
      page_size: 1,
    })

    const page = response.results[0]
    if (!page || !("properties" in page)) {
      return null
    }

    const typedPage = page as PageObjectResponse
    const project = pageToProject(typedPage)

    const blocks = await fetchAllBlocks(typedPage.id)
    const content = await blocksToMarkdown(blocks)

    return { ...project, content }
  },
)

/**
 * generateStaticParams용 슬러그 목록을 반환한다.
 */
export const fetchAllSlugs = cache(async (): Promise<string[]> => {
  const projects = await fetchAllProjects()
  return projects.map((p) => p.slug).filter(Boolean)
})
