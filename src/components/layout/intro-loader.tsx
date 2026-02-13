"use client";

import {useEffect, useState, useRef} from "react";
import {createPortal} from "react-dom";
import {cn} from "@/lib/utils";
import {gsap} from "@/lib/gsap";
import {useGsap} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {hasSessionItem, setSessionItem} from "@/lib/session-storage";
import {animateCharsStagger} from "@/lib/gsap-utils";
import {getLenisInstance} from "@/lib/lenis-store";

const INTRO_CACHE_KEY = "portfolio-intro-seen";
/** 첫 방문 인트로 최소 표시 시간 (ms) */
const MIN_DISPLAY_DURATION = 1200;
/** 100% 도달 후 종료 시퀀스까지 대기 시간 (ms) */
const DISMISS_DELAY = 300;

interface IntroLoaderProps {
  isSceneReady: boolean;
  onComplete?: () => void;
  children: React.ReactNode;
}

/**
 * 리소스 인식 로딩 오버레이.
 *
 * **첫 방문**: 풀 브랜디드 인트로(타이틀 + 프로그레스)를 즉시 표시.
 * **재방문**: 유예 시간(GRACE_PERIOD) 동안 리소스 로딩을 대기.
 *   - 유예 내 완료 → 로더 없이 콘텐츠 즉시 노출 (부드러운 페이드인).
 *   - 유예 초과 → 미니멀 프로그레스 바를 표시하고 완료 시 페이드아웃.
 *
 * 콘텐츠는 항상 DOM에 렌더링되어(opacity: 0) 리소스가 병렬 로드된다.
 * 오버레이를 body에 portal로 렌더링하여 template.tsx의 transform scope를 벗어난다.
 */
export function IntroLoader({isSceneReady, onComplete, children}: IntroLoaderProps) {
  type Mode = "intro" | "loading" | "complete";

  const isFirstVisitRef = useRef(false);
  const [mode, setMode] = useState<Mode>("loading");
  const [isMounted, setIsMounted] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // ── Refs: 풀 인트로 오버레이 ──
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterGroupRef = useRef<HTMLDivElement>(null);
  const progressGroupRef = useRef<HTMLDivElement>(null);

  // ── Refs: 미니멀 로딩 오버레이 ──
  const loadingRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);

  // ── 공통 Refs ──
  const progressObjRef = useRef({value: 0});
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const mountTimeRef = useRef(0);
  const dismissedRef = useRef(false);

  /** 프로그레스 UI 동시 갱신 (카운터 텍스트 + 인트로 바 + 미니멀 바) */
  function updateProgressUI() {
    const val = Math.round(progressObjRef.current.value);
    if (counterRef.current) counterRef.current.textContent = String(val);
    const pct = `${progressObjRef.current.value}%`;
    if (progressBarRef.current) progressBarRef.current.style.width = pct;
    if (loadingBarRef.current) loadingBarRef.current.style.width = pct;
  }

  /** Lenis 동기화 스크롤 리셋 */
  function resetScroll() {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, {immediate: true});
    } else {
      window.scrollTo(0, 0);
    }
  }

  // ─── 초기화: 모드 결정 + body overflow 잠금 ───
  useEffect(() => {
    setIsMounted(true);
    mountTimeRef.current = Date.now();
    isFirstVisitRef.current = !hasSessionItem(INTRO_CACHE_KEY);

    if (isFirstVisitRef.current) {
      setMode("intro");
    } else {
      // 재방문: 항상 미니멀 로더 표시
      setMode("loading");
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // grace 모드는 더 이상 사용하지 않음 — 재방문 시 항상 loading 모드로 진입

  // ─── 종료 시퀀스 ───
  function dismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    if (isFirstVisitRef.current) {
      setSessionItem(INTRO_CACHE_KEY, "1");
    }

    document.body.style.overflow = "";
    resetScroll();
    // 프레임 이후 한번 더 리셋하여 Lenis + 브라우저 동기화 보장
    requestAnimationFrame(() => resetScroll());

    const isIntro = mode === "intro";
    const container = isIntro ? introRef.current : loadingRef.current;

    if (!container || reducedMotion) {
      setIsContentVisible(true);
      setMode("complete");
      onCompleteRef.current?.();
      return;
    }

    if (isIntro) {
      // 풀 인트로: 카운터 펄스 → 오버레이 페이드아웃
      const tl = gsap.timeline({
        onComplete: () => setMode("complete"),
      });

      if (counterGroupRef.current) {
        tl.to(counterGroupRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        }).to(counterGroupRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }

      tl.to(
        container,
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power3.inOut",
          onStart: () => {
            setIsContentVisible(true);
            onCompleteRef.current?.();
          },
        },
        "-=0.2",
      );
    } else {
      // 미니멀 로더: 빠른 페이드아웃
      gsap.to(container, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
          setIsContentVisible(true);
          onCompleteRef.current?.();
        },
        onComplete: () => setMode("complete"),
      });
    }
  }

  // ─── 풀 인트로 입장 애니메이션 시퀀스 ───
  useGsap(() => {
    if (mode !== "intro" || reducedMotion || !introRef.current) return;

    const tl = gsap.timeline({defaults: {ease: "power3.out"}});

    tl.from(introRef.current, {opacity: 0, duration: 0.6});

    if (titleRef.current) {
      animateCharsStagger(titleRef.current, {
        stagger: 0.03,
        duration: 0.6,
        y: 40,
        rotateX: -90,
        ease: "back.out(1.5)",
        delay: -0.3,
      });
    }

    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {opacity: 0, y: 20, duration: 0.5}, "-=0.4");
    }

    if (counterGroupRef.current) {
      tl.from(
        counterGroupRef.current,
        {opacity: 0, scale: 0.5, duration: 0.7, ease: "back.out(1.5)"},
        "-=0.3",
      );
    }

    if (progressGroupRef.current) {
      tl.from(
        progressGroupRef.current,
        {opacity: 0, scaleX: 0.3, duration: 0.6, ease: "power3.out"},
        "-=0.4",
      );
    }
  }, [mode, reducedMotion]);

  // ─── 미니멀 로더 입장 페이드인 ───
  useGsap(() => {
    if (mode !== "loading" || !loadingRef.current) return;
    gsap.from(loadingRef.current, {opacity: 0, duration: 0.3, ease: "power2.out"});
  }, [mode]);

  // ─── 프로그레스 Phase 1: 느린 진행 (0 → 80) ───
  useEffect(() => {
    if (mode !== "intro" && mode !== "loading") return;

    progressObjRef.current.value = 0;
    progressTweenRef.current = gsap.to(progressObjRef.current, {
      value: 80,
      duration: mode === "intro" ? 4 : 2,
      ease: "power1.out",
      onUpdate: updateProgressUI,
    });

    return () => {
      progressTweenRef.current?.kill();
    };
  }, [mode]);

  // ─── 프로그레스 Phase 2: 리소스 준비 → 100% + 종료 시퀀스 ───
  useEffect(() => {
    if (!isSceneReady || (mode !== "intro" && mode !== "loading") || dismissedRef.current) return;

    // Phase 1 느린 트윈 중지
    progressTweenRef.current?.kill();

    let dismissTimer: ReturnType<typeof setTimeout>;

    progressTweenRef.current = gsap.to(progressObjRef.current, {
      value: 100,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: updateProgressUI,
      onComplete: () => {
        if (mode === "intro") {
          // 입장 애니메이션이 끝날 때까지 최소 표시 시간 보장
          const elapsed = Date.now() - mountTimeRef.current;
          const remaining = Math.max(0, MIN_DISPLAY_DURATION - elapsed);
          dismissTimer = setTimeout(dismiss, remaining + DISMISS_DELAY);
        } else {
          // 미니멀 로더: 빠르게 종료
          dismissTimer = setTimeout(dismiss, 100);
        }
      },
    });

    return () => {
      progressTweenRef.current?.kill();
      clearTimeout(dismissTimer);
    };
  }, [isSceneReady, mode]);

  const showIntroOverlay = isMounted && mode === "intro";
  const showLoadingOverlay = isMounted && mode === "loading";

  return (
    <>
      {/* ── 풀 브랜디드 인트로 오버레이 (첫 방문) ── */}
      {showIntroOverlay &&
        createPortal(
          <div
            ref={introRef}
            className="fixed inset-0 z-[9999] h-screen bg-scene-bg"
            aria-hidden={!showIntroOverlay}
          >
            {/* 앰비언트 그라디언트 오브 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-violet-600/25 blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse [animation-delay:1s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-pink-600/15 blur-[90px] animate-pulse [animation-delay:0.5s]" />
            </div>

            {/* 타이틀 — 상단 영역 */}
            <div className="absolute inset-x-0 top-[28%] z-10 flex flex-col items-center gap-4">
              <h1
                ref={titleRef}
                className="text-5xl font-bold tracking-tight text-foreground md:text-6xl [perspective:1000px]"
                style={{transformStyle: "preserve-3d"}}
              >
                Portfolio
              </h1>
              <p
                ref={subtitleRef}
                className="text-sm text-muted-foreground tracking-[0.3em] uppercase font-light"
              >
                Frontend Developer
              </p>
            </div>

            {/* 카운터 + 프로그레스 바 — 화면 정중앙 */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <div ref={counterGroupRef} className="flex items-baseline gap-1">
                <span
                  ref={counterRef}
                  className="text-7xl font-bold text-foreground tabular-nums tracking-tighter md:text-8xl"
                >
                  0
                </span>
                <span className="text-xl font-light text-muted-foreground md:text-2xl">%</span>
              </div>

              <div ref={progressGroupRef} className="mt-8 w-64 md:w-80">
                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-glass-bg">
                  <div
                    ref={progressBarRef}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    style={{width: "0%"}}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* ── 미니멀 로딩 오버레이 (재방문 + 느린 리소스) ── */}
      {showLoadingOverlay &&
        createPortal(
          <div
            ref={loadingRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-scene-bg"
            aria-hidden={!showLoadingOverlay}
          >
            {/* 앰비언트 그라디언트 (단순화) */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-violet-600/15 blur-[100px]" />
              <div className="absolute bottom-1/3 right-1/3 h-[250px] w-[250px] rounded-full bg-indigo-600/10 blur-[80px]" />
            </div>

            {/* 미니멀 프로그레스 바 */}
            <div className="relative z-10 w-48 md:w-56">
              <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-glass-bg">
                <div
                  ref={loadingBarRef}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  style={{width: "0%"}}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* ── 메인 콘텐츠 — 항상 DOM에 렌더링 (리소스 병렬 로드) ── */}
      <div
        className={cn(
          "transition-opacity duration-300",
          isContentVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {children}
      </div>
    </>
  );
}
