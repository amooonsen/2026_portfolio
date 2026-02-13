import {Marked, type Tokens} from "marked";
import {cn} from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/** 텍스트를 URL-safe slug로 변환한다. */
function slugify(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s가-힣-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/** bold, inline code 등 인라인 마크다운을 제거하여 plain text로 변환한다. */
function stripInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1");
}

/**
 * marked 기반 커스텀 렌더러를 생성한다.
 * heading에 id 속성과 포트폴리오 스타일 클래스를 적용한다.
 */
function createMarkedInstance(): Marked {
  const marked = new Marked();

  marked.use({
    renderer: {
      heading(token: Tokens.Heading) {
        const plain = token.text.replace(/<[^>]*>/g, "");
        const id = slugify(plain);
        // token.tokens에서 인라인 렌더링된 텍스트 사용
        const renderedText = this.parser.parseInline(token.tokens);
        if (token.depth === 2) {
          return `<h2 id="${id}" class="text-xl font-semibold mt-8 mb-3 first:mt-0 scroll-mt-24">${renderedText}</h2>`;
        }
        if (token.depth === 3) {
          return `<h3 id="${id}" class="text-lg font-semibold mt-6 mb-2 scroll-mt-24">${renderedText}</h3>`;
        }
        return `<h${token.depth}>${renderedText}</h${token.depth}>`;
      },
      paragraph(token: Tokens.Paragraph) {
        const text = this.parser.parseInline(token.tokens);
        return `<p class="leading-relaxed text-muted-foreground mt-2">${text}</p>`;
      },
      list(token: Tokens.List) {
        const body = token.items.map((item) => this.listitem(item)).join("\n");
        const tag = token.ordered ? "ol" : "ul";
        const cls = token.ordered ? "list-decimal" : "list-disc";
        return `<${tag} class="${cls} pl-5 space-y-1 text-muted-foreground">${body}</${tag}>`;
      },
      listitem(token: Tokens.ListItem) {
        const text = this.parser.parse(token.tokens);
        return `<li>${text}</li>`;
      },
      strong(token: Tokens.Strong) {
        const text = this.parser.parseInline(token.tokens);
        return `<strong class="text-foreground font-semibold">${text}</strong>`;
      },
      codespan(token: Tokens.Codespan) {
        return `<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">${token.text}</code>`;
      },
      code(token: Tokens.Code) {
        const lang = token.lang || "";
        const langLabel = lang
          ? `<span class="absolute top-2 right-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">${lang}</span>`
          : "";
        const langAttr = lang ? ` data-lang="${lang}"` : "";
        const escaped = token.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return (
          `<div class="relative mt-4 mb-4">${langLabel}` +
          `<pre class="overflow-x-auto rounded-lg bg-muted/50 border border-border/50 p-4 text-sm leading-relaxed"${langAttr}>` +
          `<code class="font-mono text-muted-foreground">${escaped}</code>` +
          `</pre></div>`
        );
      },
      link(token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        return `<a href="${token.href}" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">${text}</a>`;
      },
      blockquote(token: Tokens.Blockquote) {
        const text = this.parser.parse(token.tokens);
        return `<blockquote class="border-l-2 border-indigo-400/40 pl-4 italic text-muted-foreground">${text}</blockquote>`;
      },
      table(token: Tokens.Table) {
        const headerCells = token.header
          .map(
            (cell) =>
              `<th class="border border-border/50 bg-muted/30 px-3 py-2 text-left font-semibold text-foreground">${this.parser.parseInline(cell.tokens)}</th>`,
          )
          .join("");
        const rows = token.rows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td class="border border-border/50 px-3 py-2 text-muted-foreground">${this.parser.parseInline(cell.tokens)}</td>`).join("")}</tr>`,
          )
          .join("");
        return `<div class="mt-4 mb-4 overflow-x-auto"><table class="w-full border-collapse text-sm"><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table></div>`;
      },
      hr() {
        return `<hr class="my-8 border-border/50" />`;
      },
    },
  });

  return marked;
}

const markedInstance = createMarkedInstance();

/**
 * marked 기반 마크다운 렌더링 컴포넌트.
 * Server Component에서 안정적으로 동작한다.
 */
export function MarkdownContent({content, className}: MarkdownContentProps) {
  const html = markedInstance.parse(content) as string;

  return (
    <div
      className={cn("prose prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}

/**
 * 마크다운 콘텐츠에서 h2/h3 heading을 추출한다.
 * ToC(Table of Contents) 생성에 사용한다.
 */
export function extractHeadings(md: string): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const line of md.trim().split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) {
      const raw = trimmed.slice(4);
      const text = stripInline(raw);
      headings.push({id: slugify(text), text, level: 3});
    } else if (trimmed.startsWith("## ")) {
      const raw = trimmed.slice(3);
      const text = stripInline(raw);
      headings.push({id: slugify(text), text, level: 2});
    }
  }
  return headings;
}
