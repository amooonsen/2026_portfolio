"use client";

import {useEffect, useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import profileSrc from "@/assets/profile.jpg";

/**
 * Experience 페이지 프로필 사진.
 * Canvas 기반 픽셀 → 선명 등장 애니메이션 + 플로팅 효과.
 * 호버 인터랙션과 shadow 없이 깔끔하게 표시한다.
 */
export function ExperienceProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // 이미지 로드 + 픽셀 등장 애니메이션
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = profileSrc.src;
    img.onload = () => {
      const c = canvas.getContext("2d")!;
      if (!c) return;

      if (reducedMotion) {
        c.drawImage(img, 0, 0, 240, 240);
        return;
      }

      // 픽셀화 → 선명 트랜지션
      const start = performance.now();
      const duration = 600;
      const fromPixel = 40;
      const size = 240;

      function step(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const pixel = fromPixel + (1 - fromPixel) * eased;

        if (pixel <= 1) {
          c.imageSmoothingEnabled = true;
          c.clearRect(0, 0, size, size);
          c.drawImage(img, 0, 0, size, size);
        } else {
          c.imageSmoothingEnabled = false;
          const sw = Math.max(1, Math.ceil(size / pixel));
          const sh = Math.max(1, Math.ceil(size / pixel));
          c.clearRect(0, 0, size, size);
          c.drawImage(img, 0, 0, sw, sh);
          c.drawImage(canvas, 0, 0, sw, sh, 0, 0, size, size);
        }

        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="relative">
      <div className="overflow-hidden rounded-2xl border border-glass-border">
        <canvas
          ref={canvasRef}
          width={240}
          height={240}
          role="img"
          aria-label="조경문 프로필 사진"
          className="rounded-2xl"
        />
      </div>
      <div
        ref={glowRef}
        className="absolute -inset-2 -z-10 rounded-2xl from-gradient-accent-from via-gradient-accent-via to-gradient-accent-to opacity-20 blur-xl"
        aria-hidden="true"
      />
    </div>
  );
}
