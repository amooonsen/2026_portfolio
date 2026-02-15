"use client"

import { useSyncExternalStore } from "react"

/**
 * 범용 미디어 쿼리 매칭 상태를 반환하는 훅.
 * useSyncExternalStore를 사용하여 SSR hydration mismatch를 방지한다.
 * @param query - 감지할 미디어 쿼리 문자열 (예: "(min-width: 768px)")
 * @returns 미디어 쿼리 매칭 여부
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
