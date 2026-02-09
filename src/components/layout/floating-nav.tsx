"use client"

import { useMemo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useActiveSection } from "@/hooks/use-active-section"

interface FloatingNavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface FloatingNavProps {
  items: FloatingNavItem[]
  className?: string
}

/**
 * 화면 하단 중앙에 떠있는 플로팅 네비게이션.
 * Intersection Observer로 현재 보이는 섹션을 감지하여 활성 상태를 표시한다.
 * 모바일에서는 아이콘만 표시하고, 데스크톱에서는 라벨을 함께 표시한다.
 * @param props.items - 네비게이션 항목 배열 (label, href, icon)
 * @param props.className - 추가 CSS 클래스
 */
export function FloatingNav({ items, className }: FloatingNavProps) {
  const sectionIds = useMemo(
    () => items.map((item) => item.href.replace("#", "")),
    [items]
  )
  const activeSection = useActiveSection(sectionIds)

  return (
    <nav
      aria-label="플로팅 네비게이션"
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-background/80 backdrop-blur-xl",
        "border border-border/50 rounded-full",
        "px-2 py-1.5 shadow-2xl",
        className
      )}
    >
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const sectionId = item.href.replace("#", "")
          const isActive = activeSection === sectionId

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon && (
                  <span className="shrink-0">{item.icon}</span>
                )}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
