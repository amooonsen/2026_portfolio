"use client";

import Link from "next/link";
import {useRef} from "react";
import {ArrowRight, ExternalLink, type LucideIcon} from "lucide-react";
import gsap from "gsap";
import {useReducedMotion} from "@/hooks/use-reduced-motion";
import {GlassCard} from "@/components/ui/glass-card";
import {cn} from "@/lib/utils";

interface OverviewCardProps {
  href: string;
  title: string;
  description: string;
  external?: boolean;
  icon: LucideIcon;
  color: string;
  className?: string;
}

/**
 * 메인 페이지 개요 카드 컴포넌트.
 * 각 섹션 페이지로의 링크를 표시한다.
 * - Subtle 3D tilt (hover)
 * - 아이콘 magnetic 효과
 */
export function OverviewCard({
  href,
  title,
  description,
  external,
  icon: Icon,
  color,
  className,
}: OverviewCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget || reducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    gsap.to(contentRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });

    // 아이콘 magnetic
    gsap.to(iconRef.current, {
      x: ((x - centerX) / centerX) * 8,
      y: ((y - centerY) / centerY) * 8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;

    gsap.to(contentRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const content = (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative h-full">
      <GlassCard
        hover
        padding="lg"
        className="relative flex h-full flex-col justify-between overflow-hidden"
      >
        <div ref={contentRef} className="relative z-10">
          {/* 아이콘 */}
          <div className="mb-4">
            <div
              ref={iconRef}
              className={cn(
                "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br",
                color,
                "shadow-lg",
              )}
            >
              <Icon className="size-6 text-white dark:text-white" />
            </div>
          </div>

          {/* 텍스트 */}
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          <span>{external ? "방문하기" : "자세히 보기"}</span>
          {external ? (
            <ExternalLink className="size-4 transition-transform group-hover:-translate-y-1" />
          ) : (
            <ArrowRight className="size-4 transition-transform" />
          )}
        </div>

        {/* 배경 장식 */}
        <div
          className={cn(
            "pointer-events-none absolute -bottom-12 -right-12 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20",
            color,
          )}
        />
      </GlassCard>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group block", className)}
      >
        {content}
        <span className="sr-only">(새 창에서 열림)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn("group block", className)}>
      {content}
    </Link>
  );
}
