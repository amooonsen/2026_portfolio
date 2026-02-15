"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * prefers-reduced-motion 미디어 쿼리를 감지하는 훅.
 * 사용자가 모션 감소를 선호하면 true를 반환한다.
 * 모든 애니메이션 컴포넌트에서 필수로 사용해야 한다.
 * @returns 모션 감소 선호 여부
 */
export function useReducedMotion(): boolean {
  const subscribe = (callback: () => void) => {
    const mq = window.matchMedia(QUERY)
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }
  const getSnapshot = () => window.matchMedia(QUERY).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
