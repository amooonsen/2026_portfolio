"use client";

import {useEffect, useRef, useState} from "react";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {cn} from "@/lib/utils";

interface PixelTransitionProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  disableHover?: boolean;
}

/**
 * 픽셀 트랜지션 이미지 컴포넌트.
 * 마운트 시 픽셀화 → 선명 트랜지션, 호버 시 선명 → 픽셀화 → 선명 트랜지션을 구현한다.
 * Canvas로 이미지를 축소 렌더링 후 확대하여 픽셀화 효과를 만든다.
 */
export function PixelTransition({src, alt, width, height, className, disableHover}: PixelTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  // 이미지 로드
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setLoaded(true);
    };
  }, [src]);

  // 마운트 시 픽셀 → 선명 트랜지션
  useEffect(() => {
    if (!loaded || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;

    if (reducedMotion) {
      ctx.drawImage(img, 0, 0, width, height);
      return;
    }

    animatePixelate(ctx, img, width, height, 40, 1, 600);
  }, [loaded, width, height, reducedMotion]);

  function drawPixelated(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    pixelSize: number,
  ) {
    ctx.imageSmoothingEnabled = false;
    const sw = Math.max(1, Math.ceil(w / pixelSize));
    const sh = Math.max(1, Math.ceil(h / pixelSize));
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, sw, sh);
    ctx.drawImage(ctx.canvas, 0, 0, sw, sh, 0, 0, w, h);
  }

  function animatePixelate(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    fromPixel: number,
    toPixel: number,
    duration: number,
  ) {
    cancelAnimationFrame(animFrameRef.current);
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentPixel = fromPixel + (toPixel - fromPixel) * eased;

      if (currentPixel <= 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
      } else {
        drawPixelated(ctx, img, w, h, currentPixel);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }

  function handleMouseEnter() {
    if (!canvasRef.current || !imageRef.current || reducedMotion) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    animatePixelate(ctx, imageRef.current, width, height, 1, 30, 250);
  }

  function handleMouseLeave() {
    if (!canvasRef.current || !imageRef.current || reducedMotion) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    animatePixelate(ctx, imageRef.current, width, height, 30, 1, 400);
  }

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseEnter={disableHover ? undefined : handleMouseEnter}
      onMouseLeave={disableHover ? undefined : handleMouseLeave}
      role="img"
      aria-label={alt}
      className={cn(
        "rounded-2xl",
        !disableHover && "cursor-pointer",
        !loaded && "bg-glass-bg animate-pulse",
        className,
      )}
    />
  );
}
