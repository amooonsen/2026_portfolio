import { cn } from "@/lib/utils"

interface SkipNavProps {
  contentId?: string
  label?: string
}

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
