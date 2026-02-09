import type { Metadata } from "next"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { experiences } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "경력",
}

/**
 * 경력 페이지.
 * 타임라인 형태로 경력 정보를 표시한다.
 */
export default function ExperiencePage() {
  return <ExperienceTimeline items={experiences} />
}
