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

/**
 * 페이지 섹션 컴포넌트.
 * 반응형 수직 패딩을 적용하며, id 지정 시 앵커 네비게이션을 지원한다.
 * container 옵션으로 내부에 Container 래핑을 선택할 수 있다.
 * @param props.spacing - 수직 패딩 크기 (sm/md/lg/xl)
 * @param props.container - true면 내부에 Container로 래핑
 * @param props.containerSize - Container 최대 너비
 * @param props.id - 앵커 네비게이션용 ID (scroll-mt-20 자동 적용)
 */
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
