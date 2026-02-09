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
