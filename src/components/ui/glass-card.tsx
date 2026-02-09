import { cn } from "@/lib/utils"

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: "div" | "article" | "li"
  padding?: keyof typeof paddingMap
}

/**
 * Glassmorphism 스타일 카드 컴포넌트.
 * 반투명 배경, backdrop-blur, 미세한 보더로 유리 질감을 구현한다.
 * @param props.hover - hover 시 밝기/보더 전환 효과 활성화 여부
 * @param props.as - 렌더링할 HTML 요소 태그
 * @param props.padding - 내부 패딩 크기 (sm/md/lg)
 */
export function GlassCard({
  children,
  className,
  hover = false,
  as: Component = "div",
  padding = "md",
}: GlassCardProps) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        paddingMap[padding],
        hover && [
          "transition-all duration-300",
          "hover:bg-white/10 hover:border-white/20",
          "hover:shadow-lg hover:shadow-white/5",
        ],
        className
      )}
    >
      {children}
    </Component>
  )
}
