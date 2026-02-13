import { cn } from "@/lib/utils"

interface MarkdownContentProps {
  content: string
  className?: string
}

/**
 * 마크다운 텍스트를 HTML로 변환하여 렌더링하는 컴포넌트.
 * 간단한 마크다운 파서를 사용하여 외부 의존성 없이 변환한다.
 * @param props.content - 마크다운 원본 텍스트
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const html = parseMarkdown(content)

  return (
    <div
      className={cn("prose prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * 간단한 마크다운을 HTML로 변환한다.
 * h2, h3, p, ul/li, strong, code, fenced code block 태그를 지원한다.
 */
function parseMarkdown(md: string): string {
  const lines = md.trim().split("\n")
  const result: string[] = []
  let inList = false
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLang = ""

  for (const line of lines) {
    const trimmed = line.trim()

    // fenced code block 처리
    if (trimmed.startsWith("```")) {
      if (!inCodeBlock) {
        if (inList) { result.push("</ul>"); inList = false }
        inCodeBlock = true
        codeLang = trimmed.slice(3).trim()
        codeLines = []
      } else {
        const escaped = codeLines.join("\n")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
        const langAttr = codeLang ? ` data-lang="${codeLang}"` : ""
        result.push(
          `<div class="relative mt-4 mb-4">` +
          (codeLang ? `<span class="absolute top-2 right-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">${codeLang}</span>` : "") +
          `<pre class="overflow-x-auto rounded-lg bg-muted/50 border border-border/50 p-4 text-sm leading-relaxed"${langAttr}>` +
          `<code class="font-mono text-muted-foreground">${escaped}</code>` +
          `</pre></div>`
        )
        inCodeBlock = false
        codeLang = ""
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (!trimmed) {
      if (inList) {
        result.push("</ul>")
        inList = false
      }
      continue
    }

    if (trimmed.startsWith("## ")) {
      if (inList) { result.push("</ul>"); inList = false }
      const text = inlineFormat(trimmed.slice(3))
      result.push(`<h2 class="text-xl font-semibold mt-8 mb-3 first:mt-0">${text}</h2>`)
    } else if (trimmed.startsWith("### ")) {
      if (inList) { result.push("</ul>"); inList = false }
      const text = inlineFormat(trimmed.slice(4))
      result.push(`<h3 class="text-lg font-semibold mt-6 mb-2">${text}</h3>`)
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        result.push('<ul class="list-disc pl-5 space-y-1 text-muted-foreground">')
        inList = true
      }
      const text = inlineFormat(trimmed.slice(2))
      result.push(`<li>${text}</li>`)
    } else {
      if (inList) { result.push("</ul>"); inList = false }
      const text = inlineFormat(trimmed)
      result.push(`<p class="leading-relaxed text-muted-foreground mt-2">${text}</p>`)
    }
  }

  if (inList) result.push("</ul>")

  return result.join("\n")
}

/** bold, inline code 등 인라인 마크다운을 HTML로 변환한다. */
function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">$1</code>')
}
