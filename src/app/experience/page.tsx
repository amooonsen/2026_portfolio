import type { Metadata } from "next"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { experiences } from "@/data/portfolio-data"

export const metadata: Metadata = {
  title: "경력",
  description:
    "조경문의 4년 프론트엔드 개발 경력입니다. 삼성, 롯데, LG CNS 등 대형 고객사 프로젝트 경험을 확인하세요.",
}

/**
 * 경력 페이지.
 * 타임라인 형태로 경력 정보를 표시한다.
 */
export default function ExperiencePage() {
  return <ExperienceTimeline items={experiences} />
}
