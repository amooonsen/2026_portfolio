import { cn } from "@/lib/utils"

const columnsMap = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const

interface BentoGridProps {
  children: React.ReactNode
  className?: string
  columns?: keyof typeof columnsMap
}

export function BentoGrid({
  children,
  className,
  columns = 3,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]",
        columnsMap[columns],
        className
      )}
    >
      {children}
    </div>
  )
}

const colSpanMap = {
  1: "",
  2: "md:col-span-2",
} as const

const rowSpanMap = {
  1: "",
  2: "row-span-2",
} as const

interface BentoGridItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: keyof typeof colSpanMap
  rowSpan?: keyof typeof rowSpanMap
}

export function BentoGridItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(colSpanMap[colSpan], rowSpanMap[rowSpan], className)}
    >
      {children}
    </div>
  )
}
