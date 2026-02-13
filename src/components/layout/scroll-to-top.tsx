"use client";

import {useRef, useCallback, useEffect, useState} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {useScrollThreshold} from "@/hooks/use-scroll-threshold";
import {getLenisInstance} from "@/lib/lenis-store";
import {useGsapContext} from "@/hooks/use-gsap";
import {createBlobOrbitAnimation} from "@/lib/gsap-utils";

const SCROLL_THRESHOLD = 400;
const FOOTER_OFFSET = 40;

const HOVER_BLOB_POSITIONS = [
  {x: 8, y: -10, scale: 1.25},
  {x: -9, y: 8, scale: 1.22},
  {x: -7, y: -8, scale: 1.18},
] as const;

export function ScrollToTop() {
  const visible = useScrollThreshold(SCROLL_THRESHOLD);
  const btnRef = useRef<HTMLButtonElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const blobTweensRef = useRef<gsap.core.Tween[]>([]);
  const reducedMotion = useReducedMotion();
  const isManualDismissRef = useRef(false);
  const [bottomOffset, setBottomOffset] = useState(32); // 기본 bottom-8 (32px)

  /**
   * 푸터 위치 감지 — 버튼이 푸터 40px 위에서 멈추도록 bottom 값 조정.
   */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    let rafId: number | null = null;

    function updatePosition() {
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        // 푸터가 뷰포트에 보임 — 버튼을 푸터 위로 올림
        const newBottom = viewportHeight - footerRect.top + FOOTER_OFFSET;
        setBottomOffset(Math.max(32, newBottom));
      } else {
        setBottomOffset(32);
      }
    }

    function handleScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updatePosition();
          rafId = null;
        });
      }
    }

    updatePosition();
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  /**
   * 스크롤 임계값에 따른 버튼 표시/숨김 애니메이션.
   * useGsapContext 대신 직접 gsap.to를 사용하여 ctx.revert()로 인한
   * 애니메이션 즉시 초기화 문제를 방지한다.
   */
  useEffect(() => {
    if (!btnRef.current) return;

    if (visible) {
      isManualDismissRef.current = false;
      gsap.set(btnRef.current, {pointerEvents: "auto"});
      gsap.to(btnRef.current, {
        scale: 1,
        opacity: 1,
        duration: reducedMotion ? 0 : 0.5,
        ease: "back.out(1.7)",
        overwrite: true,
      });
    } else {
      if (isManualDismissRef.current) return;
      gsap.to(btnRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: reducedMotion ? 0 : 0.4,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          if (btnRef.current) {
            gsap.set(btnRef.current, {pointerEvents: "none"});
          }
        },
      });
    }
  }, [visible, reducedMotion]);

  /**
   * 블롭 궤도 애니메이션.
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

      blobTweensRef.current = tweens;
    },
    [reducedMotion],
  );

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    blobTweensRef.current.forEach((tween) => tween.pause());

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

    const mainCircle = blobsRef.current.querySelector("[data-main]");
    if (mainCircle) {
      gsap.to(mainCircle, {
        scale: 1.08,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -3,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !blobsRef.current) return;

    blobTweensRef.current.forEach((tween) => tween.resume());

    const blobs = blobsRef.current.querySelectorAll("[data-blob]");
    blobs.forEach((blob) => {
      gsap.to(blob, {
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: false,
      });
    });

    const mainCircle = blobsRef.current.querySelector("[data-main]");
    if (mainCircle) {
      gsap.to(mainCircle, {
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: false,
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [reducedMotion]);

  /**
   * 클릭 핸들러.
   * 버튼을 자연스럽게 페이드아웃한 후 스크롤 시작.
   */
  function handleClick() {
    isManualDismissRef.current = true;

    if (!reducedMotion && btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          if (btnRef.current) {
            gsap.set(btnRef.current, {pointerEvents: "none"});
          }
        },
      });
    }

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, {duration: 1.2});
    } else {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }

  return (
    <>
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
        className="fixed right-8 z-50 h-14 w-14 cursor-pointer rounded-full opacity-0 scale-[0.4] pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
        style={{
          bottom: `${bottomOffset}px`,
          transition: "bottom 0.3s ease-out",
          filter: "url(#gooey)",
        }}
      >
        <div ref={blobsRef} className="relative h-full w-full">
          <div data-main className="absolute inset-0 rounded-full bg-indigo-500" />
          <div
            data-blob
            className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-purple-500"
          />
          <div
            data-blob
            className="absolute -bottom-1.5 -left-1.5 h-[18px] w-[18px] rounded-full bg-pink-500"
          />
          <div
            data-blob
            className="absolute -top-1 left-0 h-3.5 w-3.5 rounded-full bg-indigo-400"
          />
        </div>

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
