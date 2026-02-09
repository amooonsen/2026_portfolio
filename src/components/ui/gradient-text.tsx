import { cn } from "@/lib/utils"

const gradientMap = {
  primary:
    "from-foreground via-foreground/80 to-muted-foreground",
  accent:
    "from-indigo-400 via-purple-400 to-pink-400",
  rainbow:
    "from-red-400 via-yellow-400 to-blue-400",
  custom: "",
} as const

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p"
  gradient?: keyof typeof gradientMap
  animate?: boolean
}

/**
 * 그라디언트 텍스트 컴포넌트.
 * 텍스트에 CSS 그라디언트를 적용하며, animate 옵션으로 시프트 효과를 줄 수 있다.
 * @param props.as - 렌더링할 HTML 태그 (기본: span)
 * @param props.gradient - 그라디언트 프리셋 (primary/accent/rainbow/custom)
 * @param props.animate - 그라디언트 시프트 애니메이션 활성화 여부
 */
export function GradientText({
  children,
  className,
  as: Tag = "span",
  gradient = "accent",
  animate = false,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradient !== "custom" && gradientMap[gradient],
        animate && "bg-[length:200%_auto] animate-gradient-shift",
        className
      )}
    >
      {children}
    </Tag>
  )
}
