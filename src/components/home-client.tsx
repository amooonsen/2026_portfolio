"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import { IntroLoader } from "@/components/layout/intro-loader"

const CosmicScene = dynamic(
  () =>
    import("@/components/three/cosmic-scene").then((mod) => mod.CosmicScene),
  { ssr: false }
)

interface HomeClientProps {
  children: React.ReactNode
}

/**
 * 메인 페이지 클라이언트 컴포넌트.
 * 3D 씬 로딩 상태와 인트로 로더를 관리한다.
 */
export function HomeClient({ children }: HomeClientProps) {
  const [isSceneReady, setIsSceneReady] = useState(false)

  const handleSceneCreated = useCallback(() => {
    setIsSceneReady(true)
  }, [])

  return (
    <IntroLoader isSceneReady={isSceneReady}>
      {/* 3D 우주 배경 — fixed, 전체 화면 뒤 */}
      <CosmicScene onCreated={handleSceneCreated} />

      {/* 콘텐츠 — 배경 위에 표시 */}
      <div className="relative z-10">{children}</div>
    </IntroLoader>
  )
}
