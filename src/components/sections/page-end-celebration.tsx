"use client";

import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {createPortal} from "react-dom";
import Link from "next/link";
import dynamic from "next/dynamic";
import {ArrowRight} from "lucide-react";
import {ScrollTrigger} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {GradientText} from "@/components/ui/gradient-text";
import {cn} from "@/lib/utils";

const CelebrationScene = dynamic(
  () => import("@/components/three/celebration-scene").then((mod) => mod.CelebrationScene),
  {ssr: false},
);

const emptySubscribe = () => () => {};

/**
 * 페이지 최하단 축하 애니메이션 컴포넌트.
 * 스크롤이 트리거 영역에 도달하면 3D 컨페티 파티클과 감사 메시지를 표시한다.
 * 감사 메시지는 한번 표시되면 유지된다 (언마운트되지 않음).
 * CelebrationScene은 body에 portal 렌더링하여 부모 stacking context(z-10)를 벗어난다.
 */
export function PageEndCelebration() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [showMessage, setShowMessage] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [sceneFading, setSceneFading] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const celebratedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync state with external reducedMotion preference
      setShowMessage(true);
      setShowCta(true);
      return;
    }

    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (celebratedRef.current) return;
        celebratedRef.current = true;
        setShowMessage(true);
        setCelebrating(true);
        setShowScene(true);
        setTimeout(() => setShowCta(true), 1200);
        setTimeout(() => setCelebrating(false), 6000);
        setTimeout(() => setSceneFading(true), 7000);
        setTimeout(() => setShowScene(false), 10000);
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <>
      <div ref={triggerRef} className="mx-auto w-full max-w-3xl px-6 py-28">
        {/* f(problem) = value + 선언문 */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            showMessage ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <p className="font-mono text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-accent-highlight">f</span>
            <span className="text-foreground/40">(problem)</span>
            <span className="mx-3 text-foreground/30">=</span>
            <span className="text-accent-highlight">value</span>
          </p>

          <div className="mt-8 space-y-2 text-lg text-foreground/60">
            <p>말하기 전에 해보고</p>
            <p>제안하기 전에 증명하고</p>
            <p>혼자 하지 않고 함께 간다</p>
          </div>

          <GradientText
            as="p"
            gradient="primary"
            className="mt-6 text-sm font-semibold tracking-[0.25em]"
          >
            — AX FORCE
          </GradientText>
        </div>

        {/* 지금 시작하는 것들 + CTA */}
        <div
          className={cn(
            "mt-14 transition-all duration-1000 ease-out",
            showCta ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
          )}
        >
          <p className="mb-4 text-center font-mono text-xs text-muted-foreground">
            Phase 0 — 지금 시작하는 것
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {num: "01", label: "AI 코드리뷰 파이프라인"},
              {num: "02", label: "팀 프롬프트 라이브러리"},
              {num: "03", label: "월 1회 AX 데모데이"},
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-xl border border-glass-border bg-glass-bg px-5 py-4 text-center"
              >
                <span className="font-mono text-xs text-accent-highlight">{item.num}</span>
                <p className="mt-1.5 text-sm font-medium text-foreground/75">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              target="_blank"
              href="https://www.notion.so/etribe/IA-0f0f05b74d654eadbb0da07e1c653281?source=copy_link"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent-indigo-muted bg-accent-indigo-subtle px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/60 hover:shadow-lg hover:shadow-accent-indigo-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-indigo/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">여정에 함께하기 🕺</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* 3D 씬 — body portal로 부모 stacking context 탈출 */}
      {showScene &&
        !reducedMotion &&
        isMounted &&
        createPortal(
          <div
            style={{
              opacity: sceneFading ? 0 : 1,
              transition: "opacity 0.5s ease-out",
            }}
          >
            <CelebrationScene active={celebrating} />
          </div>,
          document.body,
        )}
    </>
  );
}
