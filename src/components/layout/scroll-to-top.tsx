"use client";

import {useRef, useCallback} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {useScrollThreshold} from "@/hooks/use-scroll-threshold";
import {getLenisInstance} from "@/lib/lenis-store";
import {useGsapContext} from "@/hooks/use-gsap";
import {createBlobOrbitAnimation} from "@/lib/gsap-utils";

/**
 * 버튼을 표시할 스크롤 위치 임계값 (픽셀 단위).
 * 사용자가 이 지점을 넘어 스크롤하면 버튼이 나타남.
 */
const SCROLL_THRESHOLD = 400;

/**
 * 각 블롭 요소의 호버 애니메이션 위치.
 * 최적의 구이 필터 병합 효과를 위해 메인 서클 가장자리 근처에 배치됨.
 */
const HOVER_BLOB_POSITIONS = [
  {x: 8, y: -10, scale: 1.25}, // 우상단
  {x: -9, y: 8, scale: 1.22}, // 좌하단
  {x: -7, y: -8, scale: 1.18}, // 좌상단
] as const;

/**
 * Gooey effect scroll-to-top button.
 *
 * Features:
 * - Appears after scrolling past SCROLL_THRESHOLD
 * - SVG gooey filter creates liquid morphing effect
 * - Organic blob orbit animations for ambient motion
 * - Smooth hover interactions with blob spreading
 * - Click compression animation with elastic feedback
 * - Lenis-compatible smooth scroll to top
 *
 * The gooey effect works by:
 * 1. SVG feGaussianBlur blurs all blob elements
 * 2. feColorMatrix increases alpha contrast
 * 3. Nearby blobs "merge" visually, creating a liquid appearance
 *
 * @example
 * ```typescript
 * <ScrollToTop />
 * ```
 */
export function ScrollToTop() {
  const visible = useScrollThreshold(SCROLL_THRESHOLD);
  const btnRef = useRef<HTMLButtonElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const blobTweensRef = useRef<gsap.core.Tween[]>([]);
  const reducedMotion = useReducedMotion();

  /**
   * 스크롤 임계값에 따른 버튼 표시/숨김 애니메이션.
   * 경쾌한 등장을 위해 탄성 이징 사용.
   */
  useGsapContext(
    btnRef,
    () => {
      if (!btnRef.current) return;

      if (visible) {
        gsap.set(btnRef.current, {pointerEvents: "auto"});
        gsap.to(btnRef.current, {
          scale: 1,
          opacity: 1,
          duration: reducedMotion ? 0 : 0.5,
          ease: "back.out(1.7)",
          overwrite: true,
        });
      } else {
        gsap.to(btnRef.current, {
          scale: 0.4,
          opacity: 0,
          duration: reducedMotion ? 0 : 0.3,
          ease: "power3.in",
          overwrite: true,
          onComplete: () => {
            if (btnRef.current) {
              gsap.set(btnRef.current, {pointerEvents: "none"});
            }
          },
        });
      }
    },
    [visible, reducedMotion]
  );

  /**
   * 블롭 요소의 유기적 궤도 애니메이션.
   * 각 블롭은 자연스러운 떠다니는 효과를 위해 고유한 키프레임 경로를 따름.
   * 호버 중 일시정지/재개 제어를 위해 트윈을 ref에 저장.
   */
  useGsapContext(
    blobsRef,
    () => {
      if (reducedMotion) return;

      const blobs = blobsRef.current?.querySelectorAll("[data-blob]");
      if (!blobs) return;

      const tweens: gsap.core.Tween[] = [];

      blobs.forEach((blob, i) => {
        const tween = createBlobOrbitAnimation(blob, i, {
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.9,
        });
        tweens.push(tween);
      });

      // 메인 서클 미묘한 호흡 애니메이션
      const mainCircle = blobsRef.current?.querySelector("[data-main]");
      if (mainCircle) {
        gsap.to(mainCircle, {
          scale: 1.02,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 호버 인터랙션 제어를 위해 트윈 저장
      blobTweensRef.current = tweens;
    },
    [reducedMotion]
  );

  /**
   * 호버 진입 핸들러.
   * 궤도 애니메이션을 일시정지하고 구이 병합 효과를 위해 블롭을 바깥으로 펼침.
   */
  const handleMouseEnter = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    // 트윈 충돌 방지를 위해 궤도 애니메이션 일시정지
    blobTweensRef.current.forEach((tween) => tween.pause());

    // 블롭을 메인 서클 가장자리 근처의 절대 위치로 펼침
    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    blobs.forEach((blob, i) => {
      const pos = HOVER_BLOB_POSITIONS[i] || HOVER_BLOB_POSITIONS[0];
      gsap.to(blob, {
        x: pos.x,
        y: pos.y,
        scale: pos.scale,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
    });

    // 메인 서클 확대
    const mainCircle = blobsRef.current.querySelector("[data-main]");
    if (mainCircle) {
      gsap.to(mainCircle, {
        scale: 1.08,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }

    // 화살표를 살짝 위로 올림
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -3,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  /**
   * 호버 이탈 핸들러.
   * 궤도 애니메이션을 재개하고 블롭을 자연 상태로 되돌림.
   */
  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    // 궤도 애니메이션 재개
    blobTweensRef.current.forEach((tween) => tween.resume());

    // 블롭을 궤도 제어로 복귀 (overwrite:false로 궤도가 제어권 인수)
    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    blobs.forEach((blob) => {
      gsap.to(blob, {
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: false,
      });
    });

    // 메인 서클을 기본 크기로 복귀
    const mainCircle = blobsRef.current.querySelector("[data-main]");
    if (mainCircle) {
      gsap.to(mainCircle, {
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: false,
      });
    }

    // 화살표를 기본 위치로 복귀
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  /**
   * 최상단 스크롤 액션을 위한 클릭 핸들러.
   * 부드러운 스크롤을 위해 Lenis를 사용하고, 없으면 네이티브로 폴백.
   * 촉각 피드백을 위한 압축 애니메이션 재생.
   */
  function handleClick() {
    // 최상단으로 부드러운 스크롤
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, {duration: 1.2});
    } else {
      window.scrollTo({top: 0, behavior: "smooth"});
    }

    if (reducedMotion) return;

    // 버튼 압축 피드백
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        {scale: 0.92},
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          overwrite: "auto",
        }
      );
    }

    // 블롭 압축 → 팽창 (구이 찌그러짐 효과)
    if (blobsRef.current) {
      const blobs = blobsRef.current.querySelectorAll("[data-blob]");
      blobs.forEach((blob, i) => {
        gsap
          .timeline()
          .to(blob, {
            x: 0,
            y: 0,
            scale: 0.4,
            duration: 0.15,
            ease: "power2.in",
          })
          .to(blob, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            delay: i * 0.03,
          });
      });

      // 메인 서클 압축 → 팽창
      const mainCircle = blobsRef.current.querySelector("[data-main]");
      if (mainCircle) {
        gsap
          .timeline()
          .to(mainCircle, {
            scale: 0.88,
            duration: 0.15,
            ease: "power2.in",
          })
          .to(mainCircle, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
      }
    }

    // 화살표 점프 애니메이션
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        {y: 0},
        {
          keyframes: [
            {y: -6, duration: 0.2, ease: "power2.out"},
            {y: 0, duration: 0.45, ease: "power2.in"},
          ],
        }
      );
    }
  }

  return (
    <>
      {/* SVG 구이 필터 정의 */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <button
        ref={btnRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="맨 위로 스크롤"
        tabIndex={visible ? 0 : -1}
        className="fixed bottom-8 right-8 z-50 h-14 w-14 cursor-pointer rounded-full opacity-0 scale-[0.4] pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
        style={{filter: "url(#gooey)"}}
      >
        {/* 구이 블롭 컨테이너 */}
        <div ref={blobsRef} className="relative h-full w-full">
          {/* 메인 서클 */}
          <div data-main className="absolute inset-0 rounded-full bg-indigo-500" />

          {/* 블롭 1 — 우상단: 보라 */}
          <div
            data-blob
            className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-purple-500"
          />

          {/* 블롭 2 — 좌하단: 핑크 */}
          <div
            data-blob
            className="absolute -bottom-1.5 -left-1.5 h-[18px] w-[18px] rounded-full bg-pink-500"
          />

          {/* 블롭 3 — 좌상단: 밝은 인디고 */}
          <div
            data-blob
            className="absolute -top-1 left-0 h-3.5 w-3.5 rounded-full bg-indigo-400"
          />
        </div>

        {/* 화살표 아이콘 */}
        <svg
          ref={arrowRef}
          className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}
