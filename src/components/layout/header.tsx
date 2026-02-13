"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { MobileNav } from "./mobile-nav"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NavItem {
  label: string
  href: string
  external?: boolean
}

interface HeaderProps {
  items: NavItem[]
  className?: string
}

/**
 * 고정 헤더 컴포넌트.
 * 데스크톱: 스크롤 다운 시 숨기고, 스크롤 업 시 glassmorphism 배경과 함께 표시한다.
 * 모바일: 항상 고정되어 표시된다.
 * 현재 라우트에 따라 네비게이션 링크 활성 상태를 표시한다.
 * @param props.items - 네비게이션 링크 목록
 * @param props.className - 추가 CSS 클래스
 */
export function Header({ items, className }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // 초기 로딩 시 레이아웃 시프트로 인한 false hide 방지용 grace period
  const isReadyRef = useRef(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      isReadyRef.current = true
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  /** 스크롤 방향을 감지하여 헤더 표시 여부와 배경 스타일을 결정한다. 모바일에서는 항상 표시. */
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY

    if (currentY < 50) {
      setIsVisible(true)
      setIsScrolled(false)
    } else {
      // 초기화 완료 전에는 항상 표시 (레이아웃 시프트 false hide 방지)
      // 모바일에서는 항상 visible, 데스크톱에서만 스크롤 방향에 따라 숨김/표시
      setIsVisible(!isReadyRef.current || !isDesktop || currentY < lastScrollY.current)
      setIsScrolled(true)
    }

    lastScrollY.current = currentY
  }, [isDesktop])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent",
          className
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Portfolio
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {items.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-lg"
                    >
                      {item.label}
                      <ExternalLink className="size-3" />
                    </a>
                  )
                }

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="메뉴 열기"
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-nav"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        items={items}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  )
}
