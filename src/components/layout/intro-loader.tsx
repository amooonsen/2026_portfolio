"use client";

import {useEffect, useState, useCallback, useRef} from "react";
import {cn} from "@/lib/utils";
import {gsap} from "@/lib/gsap";
import {useGsap} from "@/hooks/use-gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {hasSessionItem, setSessionItem} from "@/lib/session-storage";
import {animateCharsStagger, animateProgress} from "@/lib/gsap-utils";

const INTRO_CACHE_KEY = "portfolio-intro-seen";
const PROGRESS_SIMULATION_DURATION = 2500;
const MAX_SIMULATED_PROGRESS = 80;
const DISMISS_DELAY = 400;

interface IntroLoaderProps {
  isSceneReady: boolean;
  children: React.ReactNode;
}

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
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterGroupRef = useRef<HTMLDivElement>(null);
  const progressGroupRef = useRef<HTMLDivElement>(null);
  const counterObjRef = useRef({value: 0});

  useEffect(() => {
    setIsMounted(true);
    if (!hasSessionItem(INTRO_CACHE_KEY)) {
      setShouldShow(true);
    }
  }, []);

  /**
   * 인트로 입장 애니메이션 시퀀스.
   * 1. 배경 페이드인
   * 2. 타이틀 문자 스태거 (3D 회전)
   * 3. 서브타이틀 슬라이드업
   * 4. 카운터 숫자 스케일 등장
   * 5. 프로그레스 바 스케일 등장
   */
  useGsap(() => {
    if (!shouldShow || reducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({defaults: {ease: "power3.out"}});

    // 1. 배경 페이드인
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 0.6,
    });

    // 2. 타이틀 문자 스태거
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

    // 4. 카운터 숫자 스케일 등장
    if (counterGroupRef.current) {
      tl.from(
        counterGroupRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.7,
          ease: "back.out(1.5)",
        },
        "-=0.3",
      );
    }

    // 5. 프로그레스 바 스케일 등장
    if (progressGroupRef.current) {
      tl.from(
        progressGroupRef.current,
        {
          opacity: 0,
          scaleX: 0.3,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }
  }, [shouldShow, reducedMotion]);

  /**
   * 하이브리드 프로그레스 시뮬레이션.
   * - 1단계: 시뮬레이션 (0-80%)
   * - 2단계: 씬 로드 완료 후 100%까지 가속
   */
  useEffect(() => {
    if (!shouldShow) return;

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (!isSceneReady) {
        const simulated = Math.min(
          (elapsed / PROGRESS_SIMULATION_DURATION) * MAX_SIMULATED_PROGRESS,
          MAX_SIMULATED_PROGRESS,
        );
        setProgress(simulated);
      } else {
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
   * 프로그레스 바 너비 애니메이션.
   */
  useEffect(() => {
    if (!progressBarRef.current || !shouldShow) return;
    animateProgress(progressBarRef.current, progress);
  }, [progress, shouldShow]);

  /**
   * 카운터 숫자 GSAP 보간 애니메이션.
   * 숫자가 부드럽게 카운트업되는 효과.
   */
  useEffect(() => {
    if (!counterRef.current || !shouldShow) return;

    gsap.to(counterObjRef.current, {
      value: Math.round(progress),
      duration: 0.5,
      ease: "power1.out",
      overwrite: true,
      snap: {value: 1},
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObjRef.current.value));
        }
      },
    });
  }, [progress, shouldShow]);

  /**
   * 인트로 종료 시퀀스.
   */
  const dismiss = useCallback(() => {
    if (!containerRef.current || reducedMotion) {
      setSessionItem(INTRO_CACHE_KEY, "1");
      setIsDismissed(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setSessionItem(INTRO_CACHE_KEY, "1");
        setIsDismissed(true);
      },
    });

    // 카운터 + 프로그레스 바 완료 펄스
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

  useEffect(() => {
    if (progress >= 100 && shouldShow && !isDismissed) {
      const timer = setTimeout(dismiss, DISMISS_DELAY);
      return () => clearTimeout(timer);
    }
  }, [progress, shouldShow, isDismissed, dismiss]);

  const showOverlay = !isMounted || (shouldShow && !isDismissed);
  const contentVisible = isMounted && (!shouldShow || isDismissed);

  return (
    <>
      {/* 인트로 오버레이 */}
      <div
        ref={containerRef}
        className={cn(
          "fixed inset-0 z-[9999] bg-[#030014]",
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

            {/* 타이틀 — 상단 영역 */}
            <div className="absolute inset-x-0 top-[28%] z-10 flex flex-col items-center gap-4">
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

            {/* 카운터 + 프로그레스 바 — 화면 정중앙 */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <div ref={counterGroupRef} className="flex items-baseline gap-1">
                <span
                  ref={counterRef}
                  className="text-7xl font-bold text-white tabular-nums tracking-tighter md:text-8xl"
                >
                  0
                </span>
                <span className="text-xl font-light text-white/40 md:text-2xl">%</span>
              </div>

              <div ref={progressGroupRef} className="mt-8 w-64 md:w-80">
                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    ref={progressBarRef}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    style={{width: "0%"}}
                  />
                </div>
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
