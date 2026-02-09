import { cn } from "@/lib/utils"

interface SkipNavProps {
  contentId?: string
  label?: string
}

/**
 * 키보드 사용자를 위한 "콘텐츠로 건너뛰기" 접근성 링크.
 * 평소에는 시각적으로 숨겨지고, focus 시 화면 좌상단에 표시된다.
 * @param props.contentId - 건너뛸 대상 요소의 ID (기본: "main-content")
 * @param props.label - 링크 텍스트 (기본: "콘텐츠로 건너뛰기")
 */
export function SkipNav({
  contentId = "main-content",
  label = "콘텐츠로 건너뛰기",
}: SkipNavProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-[9999]",
        "focus:bg-background focus:text-foreground",
        "focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-ring"
      )}
    >
      {label}
    </a>
  )
}
