import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "w-full",
} as const

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "main" | "article"
  size?: keyof typeof sizeMap
}

export function Container({
  children,
  className,
  as: Component = "div",
  size = "lg",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}
    >
      {children}
    </Component>
  )
}
