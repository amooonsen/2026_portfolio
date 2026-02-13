"use client";

import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Link from "next/link";
import dynamic from "next/dynamic";
import {PartyPopper, ArrowRight} from "lucide-react";
import {ScrollTrigger} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {GradientText} from "@/components/ui/gradient-text";
import {hasSessionItem, setSessionItem} from "@/lib/session-storage";
import {cn} from "@/lib/utils";

const CelebrationScene = dynamic(
  () => import("@/components/three/celebration-scene").then((mod) => mod.CelebrationScene),
  {ssr: false},
);

const CELEBRATION_CACHE_KEY = "celebration-played";

/**
 * 페이지 최하단 축하 애니메이션 컴포넌트.
 * 스크롤이 트리거 영역에 도달하면 3D 컨페티 파티클과 감사 메시지를 표시한다.
 * 감사 메시지는 한번 표시되면 유지된다 (언마운트되지 않음).
 * 세션당 최초 1회만 파티클 재생 — 재방문 시 메시지만 표시.
 * CelebrationScene은 body에 portal 렌더링하여 부모 stacking context(z-10)를 벗어난다.
 */
export function PageEndCelebration() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [sceneFading, setSceneFading] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const celebratedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!triggerRef.current || reducedMotion) {
      if (reducedMotion) {
        setShowMessage(true);
        setShowCta(true);
      }
      return;
    }

    const alreadyPlayed = hasSessionItem(CELEBRATION_CACHE_KEY);

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (celebratedRef.current) return;
        celebratedRef.current = true;
        setShowMessage(true);

        // 세션 내 최초 1회만 파티클 재생
        if (!alreadyPlayed) {
          setSessionItem(CELEBRATION_CACHE_KEY, "1");
          setCelebrating(true);
          setShowScene(true);
          // CTA 등장
          setTimeout(() => setShowCta(true), 1200);
          // 8초 후 자동 페이드아웃 + 언마운트
          setTimeout(() => setCelebrating(false), 6000);
          setTimeout(() => setSceneFading(true), 7000);
          setTimeout(() => setShowScene(false), 8000);
        } else {
          // 이미 재생된 세션: 메시지 + CTA만 표시
          setShowCta(true);
        }
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <>
      <div ref={triggerRef} className="flex flex-col items-center gap-4 py-20">
        {/* 감사 메시지 — 한번 표시되면 유지 */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            showMessage ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <PartyPopper className="mx-auto h-10 w-10 text-accent-highlight" strokeWidth={1.5} />
          <GradientText as="p" gradient="primary" className="mt-2 text-xl font-bold">
            여기까지 봐주셔서 감사합니다!
          </GradientText>
          <p className="mt-1 text-sm text-muted-foreground">
            함께 성장할 기회를 기다리고 있습니다.
          </p>
        </div>

        {/* Contact CTA */}
        <div
          className={cn(
            "relative mt-6 transition-all duration-1000 ease-out",
            showCta ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
          )}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent-indigo-muted bg-accent-indigo-subtle px-8 py-4 text-lg font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/60 hover:bg-accent-indigo-subtle hover:shadow-lg hover:shadow-accent-indigo-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-indigo/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">연락하기</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
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
