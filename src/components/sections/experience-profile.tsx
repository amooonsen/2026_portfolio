"use client";

import {useEffect, useRef} from "react";
import {gsap} from "@/lib/gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import profileSrc from "@/assets/hemging.png";

/**
 * Experience 페이지 프로필 사진.
 * Canvas 기반 픽셀 → 선명 등장 애니메이션.
 * 오프스크린 버퍼를 사용해 self-draw 아티팩트를 방지한다.
 * 컨테이너 fade-in은 첫 픽셀 프레임이 그려진 뒤 시작한다.
 */
export function ExperienceProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = profileSrc.src;
    img.onload = () => {
      const c = canvas.getContext("2d")!;
      if (!c) return;

      const size = 240;

      if (reducedMotion) {
        c.drawImage(img, 0, 0, size, size);
        gsap.set(container, {opacity: 1});
        return;
      }

      // 오프스크린 버퍼 — self-draw 아티팩트 방지
      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const oc = offscreen.getContext("2d")!;

      const duration = 600;
      const fromPixel = 40;
      let started = false;
      const start = performance.now();

      function step(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const pixel = fromPixel + (1 - fromPixel) * eased;

        c.clearRect(0, 0, size, size);

        if (pixel <= 1) {
          c.imageSmoothingEnabled = true;
          c.drawImage(img, 0, 0, size, size);
        } else {
          const sw = Math.max(1, Math.ceil(size / pixel));
          const sh = Math.max(1, Math.ceil(size / pixel));

          // 오프스크린에 축소 그리기 → 메인 캔버스에 확대 복사
          oc.clearRect(0, 0, size, size);
          oc.imageSmoothingEnabled = true;
          oc.drawImage(img, 0, 0, sw, sh);

          c.imageSmoothingEnabled = false;
          c.drawImage(offscreen, 0, 0, sw, sh, 0, 0, size, size);
        }

        // 첫 프레임이 그려진 뒤 컨테이너를 페이드인
        if (!started) {
          started = true;
          gsap.to(container, {opacity: 1, duration: 0.3, ease: "power2.out"});
        }

        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="relative" style={{opacity: 0}}>
      <div className="overflow-hidden rounded-2xl border border-glass-border">
        <canvas
          ref={canvasRef}
          width={240}
          height={240}
          role="img"
          aria-label="조경문 프로필 사진"
          className="block rounded-2xl"
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
