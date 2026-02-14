"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGsapContext } from "@/hooks/use-gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Skill {
  name: string
  level: number
}

interface SkillBarsProps {
  skills: Skill[]
}

/**
 * 스킬 프로피시언시 바 컴포넌트.
 * ScrollTrigger로 뷰포트 진입 시 바가 왼쪽에서 오른쪽으로 채워지는 애니메이션을 실행한다.
 * @param props.skills - 스킬 배열 (name, level 0-100)
 */
export function SkillBars({ skills }: SkillBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(containerRef, () => {
    if (!containerRef.current || reducedMotion) return

    const bars = containerRef.current.querySelectorAll("[data-skill-bar]")
    const labels = containerRef.current.querySelectorAll("[data-skill-label]")

    // 바 스케일 애니메이션
    bars.forEach((bar) => {
      gsap.from(bar, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      })
    })

    // 라벨 페이드인
    labels.forEach((label, i) => {
      gsap.from(label, {
        opacity: 0,
        x: -10,
        duration: 0.5,
        delay: i * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: label,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      })
    })
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="space-y-6">
      {skills.map((skill) => (
        <div key={skill.name} tabIndex={0} className="focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none focus-visible:rounded-lg">
          <div data-skill-label className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <span className="text-sm tabular-nums text-muted-foreground">
              {skill.level}%
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-glass-bg"
            role="progressbar"
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} 숙련도 ${skill.level}%`}
          >
            <div
              data-skill-bar
              className="h-full rounded-full bg-gradient-to-r from-gradient-accent-from via-gradient-accent-via to-gradient-accent-to"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export type { Skill }
