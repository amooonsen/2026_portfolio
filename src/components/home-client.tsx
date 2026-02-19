"use client";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {IntroLoader} from "@/components/layout/intro-loader";
import {IntroProvider} from "@/lib/intro-context";
import {setAstronautReadyListener, clearAstronautReadyListener} from "@/lib/astronaut-ready";

const CosmicScene = dynamic(
  () => import("@/components/three/cosmic-scene").then((mod) => mod.CosmicScene),
  {ssr: false},
);

interface HomeClientProps {
  children: React.ReactNode;
}

/**
 * 메인 페이지 클라이언트 컴포넌트.
 * CosmicScene과 SpaceAstronaut 두 3D 씬의 로딩 상태를 통합하여 인트로 로더를 제어한다.
 * IntroContext를 통해 히어로 애니메이션 시작 시점을 자식에게 전달한다.
 */
export function HomeClient({children}: HomeClientProps) {
  const [isCosmicReady, setIsCosmicReady] = useState(false);
  const [isAstronautReady, setIsAstronautReady] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  function handleCosmicCreated() {
    setIsCosmicReady(true);
  }

  function handleIntroComplete() {
    setIsIntroComplete(true);
  }

  // 로봇 캐릭터의 Canvas 준비 콜백 등록 + 모바일 대비 폴백 타임아웃
  useEffect(() => {
    setAstronautReadyListener(() => setIsAstronautReady(true));

    // 모바일(로봇 미렌더링) 또는 느린 로딩 시 3초 폴백
    const fallback = setTimeout(() => setIsAstronautReady(true), 3000);

    return () => {
      clearAstronautReadyListener();
      clearTimeout(fallback);
    };
  }, []);

  // 두 씬 모두 준비되면 인트로 Phase 2 진행
  const isSceneReady = isCosmicReady && isAstronautReady;

  return (
    <IntroProvider value={isIntroComplete}>
      <IntroLoader isSceneReady={isSceneReady} onComplete={handleIntroComplete}>
        {/* 3D 우주 배경 — fixed, 전체 화면 뒤. 인트로 완료 후 페이드인으로 노출 */}
        <CosmicScene onCreated={handleCosmicCreated} visible={isIntroComplete} />

        {/* 콘텐츠 — 배경 위에 표시 */}
        <div className="relative z-10 sm:overflow-x-hidden xl:overflow-x-visible">{children}</div>
      </IntroLoader>
    </IntroProvider>
  );
}
