import { cn } from "@/lib/utils"

const colSpanMap = {
  1: "",
  2: "md:col-span-2",
  3: "md:col-span-2 lg:col-span-3",
} as const

const rowSpanMap = {
  1: "",
  2: "md:row-span-2",
} as const

interface BentoGridItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: keyof typeof colSpanMap
  rowSpan?: keyof typeof rowSpanMap
}

/**
 * BentoGrid 내부 아이템 컴포넌트.
 * colSpan과 rowSpan으로 그리드 내 크기를 조절한다.
 * @param props.colSpan - 열 span (1, 2 또는 3)
 * @param props.rowSpan - 행 span (1 또는 2, md 이상에서만 적용)
 */
export function BentoGridItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <div className={cn(colSpanMap[colSpan], rowSpanMap[rowSpan], className)}>
      {children}
    </div>
  )
}
