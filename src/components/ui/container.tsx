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

/**
 * 반응형 max-width 컨테이너 컴포넌트.
 * 콘텐츠를 중앙 정렬하고 반응형 수평 패딩을 적용한다.
 * @param props.size - 컨테이너 최대 너비 (sm: 768px, md: 1024px, lg: 1280px, xl: 1440px, full: 100%)
 * @param props.as - 렌더링할 HTML 요소 태그
 * @param props.className - 추가 CSS 클래스
 */
export function Container({
  children,
  className,
  as: Component = "div",
  size = "lg",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Component>
  )
}
