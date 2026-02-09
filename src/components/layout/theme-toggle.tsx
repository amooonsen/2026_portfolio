"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 다크/라이트 모드 전환 토글 버튼.
 * localStorage에 테마를 저장하고 시스템 prefers-color-scheme을 기본값으로 존중한다.
 * html 요소의 dark 클래스를 토글하여 테마를 전환한다.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    if (stored) {
      setTheme(stored)
    } else if (
      !document.documentElement.classList.contains("dark")
    ) {
      setTheme("light")
    }
  }, [])

  /** 현재 테마를 반전시키고 localStorage 및 DOM에 반영한다. */
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark"
            ? "scale-0 rotate-90"
            : "scale-100 rotate-0"
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark"
            ? "scale-100 rotate-0"
            : "scale-0 -rotate-90"
        )}
      />
    </button>
  )
}
