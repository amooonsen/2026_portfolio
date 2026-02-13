"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface FloatingNavItem {
  label: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

interface FloatingNavProps {
  items: FloatingNavItem[]
  className?: string
}

/**
 * 화면 하단 중앙에 떠있는 플로팅 네비게이션.
 * 스크롤 다운 시 표시, 스크롤 업(헤더 노출) 시 숨김.
 * scale + blur 애니메이션으로 중앙에서 수축/확장된다.
 * 모바일에서는 표시되지 않는다 (데스크톱 전용).
 */
export function FloatingNav({ items, className }: FloatingNavProps) {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (currentY < 50) {
        // 최상단: 헤더가 보이므로 FloatingNav 숨김
        setIsVisible(false)
      } else if (Math.abs(delta) > 5) {
        // 스크롤 다운 → 표시, 스크롤 업 → 숨김
        // 최소 delta 임계값으로 Lenis 스무스 스크롤 및 sticky 구간에서 미세 방향 변동 방지
        setIsVisible(delta > 0)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return

    if (reducedMotion) {
      navRef.current.style.visibility = isVisible ? "visible" : "hidden"
      navRef.current.style.opacity = isVisible ? "1" : "0"
      return
    }

    if (isVisible) {
      gsap.set(navRef.current, { visibility: "visible" })
      gsap.to(navRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.35,
        ease: "back.out(1.5)",
      })
    } else {
      gsap.to(navRef.current, {
        scale: 0,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (navRef.current) {
            navRef.current.style.visibility = "hidden"
          }
        },
      })
    }
  }, [isVisible, reducedMotion])

  return (
    <nav
      ref={navRef}
      aria-label="플로팅 네비게이션"
      style={{ visibility: "hidden", opacity: 0, scale: 0 }}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-background/80 backdrop-blur-xl",
        "border border-glass-border rounded-full",
        "px-1.5 py-1.5 shadow-[0_4px_24px_var(--glass-shadow)] sm:px-2",
        "origin-center",
        "hidden md:block",
        className
      )}
    >
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {items.map((item) => {
          if (item.external) {
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 sm:gap-2 sm:px-3 sm:text-sm"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              </li>
            )
          }

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-2 rounded-full text-xs font-medium transition-colors duration-200 sm:gap-2 sm:px-3 sm:text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon && (
                  <span className="shrink-0">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
