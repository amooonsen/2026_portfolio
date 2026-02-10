"use client";

import {useEffect, useRef, useState, useCallback} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {getLenisInstance} from "@/lib/lenis-store";

/**
 * 구이(Gooey) 이펙트 스크롤 탑 버튼.
 * 스크롤 임계치(400px)를 넘으면 등장하며, SVG gooey filter로 끈적한 모프 애니메이션을 적용한다.
 * 클릭 시 최상단으로 부드럽게 스크롤한다.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const blobTweensRef = useRef<gsap.core.Tween[]>([]);
  const reducedMotion = useReducedMotion();

  // 스크롤 위치 감시 → 400px 이상이면 버튼 표시
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 등장/퇴장 애니메이션
  useEffect(() => {
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
  }, [visible, reducedMotion]);

  // 구이 blob 유기적 반복 애니메이션
  useEffect(() => {
    if (!blobsRef.current || reducedMotion) return;

    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    const tweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        // 각 블롭마다 고유한 궤적으로 유기적 운동
        const tween = gsap.to(blob, {
          keyframes: [
            {x: 4 + i * 3, y: -(6 + i * 2), scale: 1.15, duration: 1.8},
            {x: -(5 + i * 2), y: 3 + i * 2, scale: 0.85, duration: 2.0},
            {x: 6 - i * 2, y: 5 - i * 3, scale: 1.1, duration: 1.6},
            {x: 0, y: 0, scale: 1, duration: 1.8},
          ],
          repeat: -1,
          ease: "none",
          delay: i * 0.6,
        });
        tweens.push(tween);
      });

      // 메인 서클 미세한 맥동
      const mainCircle = blobsRef.current!.querySelector("[data-main]");
      if (mainCircle) {
        gsap.to(mainCircle, {
          scale: 1.03,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, blobsRef);

    blobTweensRef.current = tweens;

    return () => {
      blobTweensRef.current = [];
      ctx.revert();
    };
  }, [reducedMotion]);

  // 호버 인터랙션
  const handleMouseEnter = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    // 블롭 확장 + 가속
    blobTweensRef.current.forEach((tween) => tween.timeScale(2));

    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        scale: 1.4 + i * 0.1,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: false,
      });
    });

    // 화살표 위로 살짝 이동
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    // 원래 속도 복귀
    blobTweensRef.current.forEach((tween) => tween.timeScale(1));

    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    blobs.forEach((blob) => {
      gsap.to(blob, {
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
        overwrite: false,
      });
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  function handleClick() {
    // Lenis 인스턴스를 통해 스크롤 (내부 상태 동기화 보장)
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, {duration: 1.2});
    } else {
      window.scrollTo({top: 0, behavior: "smooth"});
    }

    // 클릭 피드백 애니메이션
    if (btnRef.current && !reducedMotion) {
      gsap.fromTo(
        btnRef.current,
        {scale: 0.85},
        {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        },
      );
    }

    // 화살표 점프 애니메이션
    if (arrowRef.current && !reducedMotion) {
      gsap.fromTo(
        arrowRef.current,
        {y: 0},
        {
          keyframes: [
            {y: -6, duration: 0.15, ease: "power2.out"},
            {y: 0, duration: 0.35, ease: "bounce.out"},
          ],
        },
      );
    }
  }

  return (
    <>
      {/* SVG Gooey Filter */}
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
        {/* 구이 블롭들 */}
        <div ref={blobsRef} className="relative h-full w-full">
          {/* 메인 원형 */}
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
