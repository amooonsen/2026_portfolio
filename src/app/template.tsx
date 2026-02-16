"use client";

import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {gsap, ScrollTrigger} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {useMediaQuery} from "@/hooks/use-media-query";
import {getLenisInstance} from "@/lib/lenis-store";

/**
 * 뒤로/앞으로 네비게이션 감지를 위한 모듈 레벨 플래그.
 * popstate 이벤트 시 true로 설정되어 template 마운트 시 스크롤 리셋을 건너뛴다.
 */
let isTraversal = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isTraversal = true;
  });
}

const PROJECT_DETAIL_RE = /^\/projects\/[^/]+$/;

/** 프로젝트 상세 페이지인지 판별한다 (스크롤 리셋 + 전환 애니메이션에서 공유) */
function isProjectDetail(pathname: string): boolean {
  return PROJECT_DETAIL_RE.test(pathname);
}

/**
 * 페이지 트랜지션 템플릿.
 * 라우트 전환 시 아래에서 위로 블러와 함께 등장하는 애니메이션을 적용한다.
 * 프로젝트 상세 진입 시 화면이 빨려들어가는 짧은 모션을 적용한다.
 * 모바일에서는 간소화된 페이드인 애니메이션을 사용한다.
 */
export default function Template({children}: {children: React.ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();

  // 라우트 전환 시 스크롤 위치 제어
  useEffect(() => {
    const wasTraversal = isTraversal;
    isTraversal = false;

    if (wasTraversal && !isProjectDetail(pathname)) {
      return;
    }

    const scrollToTop = () => {
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, {immediate: true});
      } else {
        window.scrollTo(0, 0);
      }
    };

    scrollToTop();

    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, {opacity: 1, y: 0, filter: "none", scale: 1});
      ref.current.style.willChange = "auto";
      ScrollTrigger.refresh();
      return;
    }

    // 모바일: 간소화된 페이드인
    if (isMobile) {
      gsap.fromTo(
        ref.current,
        {opacity: 0},
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (ref.current) {
              ref.current.style.willChange = "auto";
            }
            ScrollTrigger.refresh();
          },
        },
      );
      return;
    }

    // 프로젝트 상세: 화면이 빨려들어가는 모션 (scale up + blur dissolve)
    if (isProjectDetail(pathname)) {
      gsap.fromTo(
        ref.current,
        {opacity: 0, scale: 0.92, filter: "blur(8px)"},
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (ref.current) {
              ref.current.style.filter = "none";
              ref.current.style.transform = "none";
              ref.current.style.willChange = "auto";
            }
            ScrollTrigger.refresh();
          },
        },
      );
      return;
    }

    // 기본: 블러 + 슬라이드 애니메이션
    gsap.fromTo(
      ref.current,
      {opacity: 0, y: 30, filter: "blur(6px)"},
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          if (ref.current) {
            ref.current.style.filter = "none";
            ref.current.style.transform = "none";
            ref.current.style.willChange = "auto";
          }
          ScrollTrigger.refresh();
        },
      },
    );
  }, [reducedMotion, isMobile, pathname]);

  return (
    <div
      ref={ref}
      className="min-h-dvh"
      style={{
        opacity: 0,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
