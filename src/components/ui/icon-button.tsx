import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const

const variantMap = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost:
    "hover:bg-accent hover:text-accent-foreground",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
} as const

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  size?: keyof typeof sizeMap
  variant?: keyof typeof variantMap
  href?: string
}

/**
 * 아이콘 전용 버튼 컴포넌트.
 * aria-label을 필수로 받아 접근성을 보장한다.
 * href 지정 시 링크로 렌더링된다.
 * @param props.icon - 표시할 아이콘 ReactNode
 * @param props.label - 접근성용 aria-label (필수)
 * @param props.size - 버튼 크기 (sm/md/lg)
 * @param props.variant - 스타일 변형 (default/ghost/outline)
 * @param props.href - 링크 URL (지정 시 <a> 태그로 렌더링)
 */
export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  href,
  className,
  ...props
}: IconButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo",
    sizeMap[size],
    variantMap[variant],
    className
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={`${label} (새 창에서 열림)`}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={classes}
      {...props}
    >
      {icon}
    </button>
  )
}
