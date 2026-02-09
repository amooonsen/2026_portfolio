"use client"

import { useEffect, useState } from "react"

/**
 * 페이지 전체 스크롤 진행률을 0~1 사이 값으로 반환한다.
 * ScrollProgress 컴포넌트에서 사용된다.
 * @returns 스크롤 진행률 (0: 최상단, 1: 최하단)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}
