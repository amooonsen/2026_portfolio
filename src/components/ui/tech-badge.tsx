import { cn } from "@/lib/utils"

const variantMap = {
  default: "bg-muted text-muted-foreground",
  outline: "border border-border text-muted-foreground",
  ghost: "text-muted-foreground hover:bg-muted",
} as const

const sizeMap = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
} as const

interface TechBadgeProps {
  name: string
  icon?: React.ReactNode
  className?: string
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
}

/**
 * 기술 스택 표시용 뱃지 컴포넌트.
 * 아이콘과 텍스트를 함께 표시하며, variant로 스타일을 변경할 수 있다.
 * @param props.name - 기술 이름
 * @param props.icon - 아이콘 (Lucide icon 또는 커스텀 SVG)
 * @param props.variant - 스타일 변형 (default/outline/ghost)
 * @param props.size - 크기 (sm/md)
 */
export function TechBadge({
  name,
  icon,
  className,
  variant = "default",
  size = "md",
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {name}
    </span>
  )
}
