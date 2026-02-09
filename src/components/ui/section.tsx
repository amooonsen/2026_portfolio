import { cn } from "@/lib/utils"
import { Container } from "./container"

const spacingMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32 lg:py-40",
  xl: "py-32 md:py-40 lg:py-48",
} as const

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  spacing?: keyof typeof spacingMap
  container?: boolean
  containerSize?: ContainerSize
}

export function Section({
  children,
  className,
  id,
  spacing = "lg",
  container = false,
  containerSize,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(spacingMap[spacing], id && "scroll-mt-20", className)}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  )
}
