"use client"

import { useCallback, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  items: Array<{ label: string; href: string; external?: boolean }>
  isOpen: boolean
  onClose: () => void
}

/**
 * 모바일 전체 화면 네비게이션 오버레이.
 * ESC 키 또는 링크 클릭 시 닫히며, 열려 있을 때 body 스크롤을 잠근다.
 * 외부 링크는 새 탭으로 연다.
 * @param props.items - 네비게이션 링크 목록
 * @param props.isOpen - 오버레이 표시 여부
 * @param props.onClose - 오버레이를 닫는 콜백
 */
export function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
  /** ESC 키 입력 시 오버레이를 닫는다. */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="모바일 네비게이션"
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        "bg-background/95 backdrop-blur-xl",
        "transition-opacity duration-300",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
          aria-label="메뉴 닫기"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center gap-8 mt-16">
        {items.map((item, index) => {
          const sharedClassName = cn(
            "text-3xl font-semibold text-foreground hover:text-primary transition-all duration-300",
            isOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          )
          const style = { transitionDelay: isOpen ? `${index * 75}ms` : "0ms" }

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={cn(sharedClassName, "flex items-center gap-2")}
                style={style}
              >
                {item.label}
                <ExternalLink className="size-5" />
              </a>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={sharedClassName}
              style={style}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
