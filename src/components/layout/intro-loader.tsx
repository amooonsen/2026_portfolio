"use client";

import {useEffect, useState, useCallback, useRef} from "react";
import {cn} from "@/lib/utils";
import {gsap} from "@/lib/gsap";
import {useGsap} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {hasSessionItem, setSessionItem} from "@/lib/session-storage";
import {animateCharsStagger, animateProgress} from "@/lib/gsap-utils";

/**
 * Session storage key for tracking whether the user has seen the intro.
 * Prevents intro from showing again within the same browser session.
 */
const INTRO_CACHE_KEY = "portfolio-intro-seen";

/**
 * Progress simulation duration in milliseconds.
 * Controls how long the fake progress runs before real scene loading takes over.
 */
const PROGRESS_SIMULATION_DURATION = 2500;

/**
 * Maximum simulated progress percentage before waiting for real scene load.
 * Keeps progress at 80% until actual scene is ready to avoid false completion.
 */
const MAX_SIMULATED_PROGRESS = 80;

/**
 * Delay in milliseconds before dismissing intro after reaching 100%.
 * Allows user to see completion state before transition.
 */
const DISMISS_DELAY = 400;

interface IntroLoaderProps {
  /** Indicates whether the 3D scene has finished loading */
  isSceneReady: boolean;
  /** Content to display after intro completes */
  children: React.ReactNode;
}

/**
 * Sophisticated intro loading screen with GSAP animations.
 *
 * Displays a loading screen with:
 * - Staggered character animation for the title
 * - Smooth progress bar tracking scene load status
 * - Ambient gradient background effects
 * - Session-based caching to skip on repeat visits
 *
 * The loader uses a hybrid progress system:
 * 1. Simulated progress (0-80%) for immediate feedback
 * 2. Real progress (80-100%) once the 3D scene loads
 *
 * @param props - Component properties
 * @param props.isSceneReady - Signal from 3D scene when loading completes
 * @param props.children - Main application content rendered after intro
 *
 * @example
 * ```typescript
 * function Page() {
 *   const [sceneReady, setSceneReady] = useState(false);
 *
 *   return (
 *     <IntroLoader isSceneReady={sceneReady}>
 *       <ThreeScene onReady={() => setSceneReady(true)} />
 *       <MainContent />
 *     </IntroLoader>
 *   );
 * }
 * ```
 */
export function IntroLoader({isSceneReady, children}: IntroLoaderProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  /**
   * Check session cache on mount to skip intro for returning users.
   * Falls back to showing intro if sessionStorage is unavailable.
   */
  useEffect(() => {
    setIsMounted(true);
    if (!hasSessionItem(INTRO_CACHE_KEY)) {
      setShouldShow(true);
    }
  }, []);

  /**
   * Orchestrate the intro entrance animation sequence using GSAP.
   * Animates in this order:
   * 1. Background fade in
   * 2. Title characters stagger (with 3D rotation)
   * 3. Subtitle slide up
   * 4. Progress bar scale in
   */
  useGsap(() => {
    if (!shouldShow || reducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({defaults: {ease: "power3.out"}});

    // 1. 배경 페이드인
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 0.6,
    });

    // 2. 3D 변환과 함께 문자 스태거 등장
    if (titleRef.current) {
      animateCharsStagger(titleRef.current, {
        stagger: 0.03,
        duration: 0.6,
        y: 40,
        rotateX: -90,
        ease: "back.out(1.5)",
        delay: -0.3, // 배경과 오버랩
      });
    }

    // 3. 서브타이틀 슬라이드업
    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.4",
      );
    }

    // 4. 프로그레스 바 컨테이너 스케일 등장
    if (progressBarRef.current?.parentElement) {
      tl.from(
        progressBarRef.current.parentElement,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.3",
      );
    }
  }, [shouldShow, reducedMotion]);

  /**
   * Hybrid progress simulation system.
   * - Phase 1: Simulate progress from 0-80% over PROGRESS_SIMULATION_DURATION
   * - Phase 2: Once scene loads, accelerate from current to 100%
   *
   * Uses RAF for smooth 60fps updates.
   */
  useEffect(() => {
    if (!shouldShow) return;

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!isSceneReady) {
        // 1단계: 시뮬레이션 진행 (80%까지 제한)
        const simulated = Math.min(
          (elapsed / PROGRESS_SIMULATION_DURATION) * MAX_SIMULATED_PROGRESS,
          MAX_SIMULATED_PROGRESS,
        );
        setProgress(simulated);
      } else {
        // 2단계: 씬 로드 완료 후 100%까지 가속
        setProgress((prev) => {
          const next = prev + (100 - prev) * 0.08;
          return next > 99 ? 100 : next;
        });
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [shouldShow, isSceneReady]);

  /**
   * Animate progress bar width using GSAP for smooth hardware-accelerated transitions.
   */
  useEffect(() => {
    if (!progressBarRef.current || !shouldShow) return;
    animateProgress(progressBarRef.current, progress);
  }, [progress, shouldShow]);

  /**
   * Dismisses the intro with an exit animation sequence.
   * Sequence:
   * 1. Progress bar vertical pulse (completion feedback)
   * 2. Entire screen fades out with slight scale
   * 3. Cache intro state and remove from DOM
   */
  const dismiss = useCallback(() => {
    if (!containerRef.current || reducedMotion) {
      setSessionItem(INTRO_CACHE_KEY, "1");
      setIsDismissed(true);
      return;
    }

    // GSAP 종료 시퀀스
    const tl = gsap.timeline({
      onComplete: () => {
        setSessionItem(INTRO_CACHE_KEY, "1");
        setIsDismissed(true);
      },
    });

    // 프로그레스 바 완료 펄스
    if (progressBarRef.current) {
      tl.to(progressBarRef.current, {
        scaleY: 1.5,
        duration: 0.2,
        ease: "power2.out",
      }).to(progressBarRef.current, {
        scaleY: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    }

    // 전체 컨테이너 페이드아웃
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.2",
    );
  }, [reducedMotion]);

  /**
   * Trigger dismissal after a delay once progress reaches 100%.
   */
  useEffect(() => {
    if (progress >= 100 && shouldShow && !isDismissed) {
      const timer = setTimeout(dismiss, DISMISS_DELAY);
      return () => clearTimeout(timer);
    }
  }, [progress, shouldShow, isDismissed, dismiss]);

  // 일관된 렌더링을 위한 가시성 상태 계산
  const showOverlay = !isMounted || (shouldShow && !isDismissed);
  const contentVisible = isMounted && (!shouldShow || isDismissed);

  return (
    <>
      {/* 인트로 오버레이 */}
      <div
        ref={containerRef}
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014]",
          showOverlay ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!showOverlay}
      >
        {shouldShow && (
          <>
            {/* 앰비언트 그라디언트 오브 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-violet-600/25 blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse [animation-delay:1s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-pink-600/15 blur-[90px] animate-pulse [animation-delay:0.5s]" />
            </div>

            {/* 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4">
                <h1
                  ref={titleRef}
                  className="text-5xl font-bold tracking-tight text-white md:text-6xl [perspective:1000px]"
                  style={{transformStyle: "preserve-3d"}}
                >
                  Portfolio
                </h1>
                <p
                  ref={subtitleRef}
                  className="text-sm text-white/60 tracking-[0.3em] uppercase font-light"
                >
                  Frontend Developer
                </p>
              </div>

              {/* 프로그레스 바 */}
              <div className="w-72 md:w-96">
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5 backdrop-blur-sm">
                  <div
                    ref={progressBarRef}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    style={{width: "0%"}}
                  />
                </div>
                <p className="mt-4 text-center text-sm text-white/50 tabular-nums tracking-wider">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className={cn(
          "transition-opacity duration-700",
          contentVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {children}
      </div>
    </>
  );
}
