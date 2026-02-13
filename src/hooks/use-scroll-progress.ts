"use client"

import {useEffect, useState} from "react"

/**
 * 페이지 전체 스크롤 진행률을 0~1 사이 값으로 반환한다.
 * RAF 쓰로틀링으로 프레임당 최대 1회만 상태를 업데이트한다.
 * @returns 스크롤 진행률 (0: 최상단, 1: 최하단)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number | null = null

    function handleScroll() {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const scrollTop = window.scrollY
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
      })
    }

    window.addEventListener("scroll", handleScroll, {passive: true})
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}
