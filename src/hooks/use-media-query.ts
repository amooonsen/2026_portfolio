"use client"

import { useEffect, useState } from "react"

/**
 * 범용 미디어 쿼리 매칭 상태를 반환하는 훅.
 * SSR hydration mismatch 방지를 위해 초기값 false로 시작하고 mount 후 업데이트한다.
 * @param query - 감지할 미디어 쿼리 문자열 (예: "(min-width: 768px)")
 * @returns 미디어 쿼리 매칭 여부
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    /** 미디어 쿼리 변경 시 매칭 상태를 업데이트한다. */
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [query])

  return matches
}
