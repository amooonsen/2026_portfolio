"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

/**
 * 프로젝트 상세 페이지 이미지 갤러리.
 * 스크롤 시 각 이미지가 서로 다른 속도로 이동하는 패럴랙스 효과를 적용한다.
 * @param props.images - 이미지 URL 배열
 * @param props.title - 프로젝트 제목 (alt 텍스트용)
 */
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const items = containerRef.current.querySelectorAll("[data-parallax-img]")

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const speed = i % 2 === 0 ? -40 : -60

        gsap.to(item, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="mt-12 space-y-8">
      {images.map((src, i) => (
        <div
          key={src}
          data-parallax-img
          className={cn(
            "overflow-hidden rounded-2xl",
            i === 0 ? "aspect-video" : "aspect-[16/10]"
          )}
        >
          <img
            src={src}
            alt={`${title} 스크린샷 ${i + 1}`}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  )
}
