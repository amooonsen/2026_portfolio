"use client"

import { useEffect, useState } from "react"

/**
 * Intersection Observer를 사용하여 현재 뷰포트에 보이는 섹션 ID를 반환한다.
 * FloatingNav의 활성 상태 표시에 사용된다.
 * @param sectionIds - 감지할 섹션의 ID 배열
 * @returns 현재 활성화된 섹션 ID 또는 null
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionIdsKey = sectionIds.join(",")

  useEffect(() => {
    const ids = sectionIdsKey.split(",")

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0 }
    )

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionIdsKey])

  return activeSection
}
