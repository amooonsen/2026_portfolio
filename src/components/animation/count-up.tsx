"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  separator?: string
}

/**
 * 천 단위 구분자를 적용하여 숫자를 포맷팅한다.
 * @param num - 포맷팅할 숫자
 * @param separator - 천 단위 구분자
 * @returns 포맷팅된 문자열
 */
function formatNumber(num: number, separator: string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * 숫자가 카운트업되는 애니메이션 컴포넌트.
 * ScrollTrigger로 뷰포트 진입 시 start에서 end까지 숫자가 증가한다.
 * @param props.end - 목표 숫자
 * @param props.start - 시작 숫자 (기본: 0)
 * @param props.duration - 애니메이션 지속 시간 (초)
 * @param props.suffix - 숫자 뒤에 붙는 텍스트 (예: "+", "%")
 * @param props.prefix - 숫자 앞에 붙는 텍스트 (예: "$")
 * @param props.separator - 천 단위 구분자 (기본: ",")
 */
export function CountUp({
  end,
  start = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
  separator = ",",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return

    if (reducedMotion) {
      ref.current.textContent = `${prefix}${formatNumber(end, separator)}${suffix}`
      return
    }

    const obj = { val: start }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = `${prefix}${formatNumber(Math.round(obj.val), separator)}${suffix}`
          }
        },
      })
    })

    return () => ctx.revert()
  }, [reducedMotion, start, end, duration, prefix, suffix, separator])

  return (
    <span ref={ref} className={className}>
      {`${prefix}${formatNumber(start, separator)}${suffix}`}
    </span>
  )
}
