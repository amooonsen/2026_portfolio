"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * 라우트 변경 시 스크린 리더에 알리고 main 콘텐츠로 포커스를 이동하는 접근성 컴포넌트.
 */
export function RouteAnnouncer() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const main = document.getElementById("main-content")
    if (main) {
      main.focus({ preventScroll: true })
    }
  }, [pathname])

  return null
}
