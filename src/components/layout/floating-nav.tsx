"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
 * 현재 라우트 경로에 따라 활성 상태를 표시한다.
 * 모바일에서는 아이콘만 표시하고, 데스크톱에서는 라벨을 함께 표시한다.
 * @param props.items - 네비게이션 항목 배열 (label, href, icon)
 * @param props.className - 추가 CSS 클래스
 */
export function FloatingNav({ items, className }: FloatingNavProps) {
  const pathname = usePathname()

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
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

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
