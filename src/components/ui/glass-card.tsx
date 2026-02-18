import { cn } from "@/lib/utils"

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const

interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
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
  ...rest
}: GlassCardProps) {
  return (
    <Component
      {...rest}
      className={cn(
        "rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl",
        paddingMap[padding],
        hover && [
          "transition-[background-color,border-color,box-shadow] duration-300",
          "hover:bg-glass-hover-bg hover:border-glass-hover-border",
          "hover:shadow-lg hover:shadow-glass-shadow",
        ],
        rest.tabIndex !== undefined && "focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none",
        className
      )}
    >
      {children}
    </Component>
  )
}
