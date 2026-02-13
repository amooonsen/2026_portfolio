import {
  User,
  Briefcase,
  Calendar,
  BookOpen,
  Mail,
  type LucideIcon,
} from "lucide-react"

export interface OverviewItem {
  href: string
  title: string
  description: string
  external?: boolean
  icon: LucideIcon
  color: string
}

/**
 * 메인 페이지 개요 카드 데이터
 */
export const overviewItems: OverviewItem[] = [
  {
    href: "/about",
    title: "소개",
    description: "프론트엔드 개발자로서의 여정과 기술 스택을 소개합니다.",
    icon: User,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/projects",
    title: "프로젝트",
    description: "직접 기획하고 개발한 프로젝트들을 확인해 보세요.",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/experience",
    title: "경력",
    description: "성장하며 쌓아온 실무 경험을 타임라인으로 정리했습니다.",
    icon: Calendar,
    color: "from-orange-500 to-red-500",
  },
  {
    href: "https://blog.example.com",
    title: "블로그",
    description: "개발 경험과 기술적 인사이트를 공유합니다.",
    external: true,
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
  },
  {
    href: "/contact",
    title: "연락처",
    description: "새로운 프로젝트나 협업에 관심이 있으시다면 연락해 주세요.",
    icon: Mail,
    color: "from-indigo-500 to-violet-500",
  },
]
