"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * prefers-reduced-motion 미디어 쿼리를 감지하는 훅.
 * 사용자가 모션 감소를 선호하면 true를 반환한다.
 * 모든 애니메이션 컴포넌트에서 필수로 사용해야 한다.
 * @returns 모션 감소 선호 여부
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    setReducedMotion(mediaQuery.matches)

    /** 미디어 쿼리 변경 시 상태를 업데이트한다. */
    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return reducedMotion
}
