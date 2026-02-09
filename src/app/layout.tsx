import type { Metadata } from "next"
import localFont from "next/font/local"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

import { SkipNav } from "@/components/layout/skip-nav"
import { Header } from "@/components/layout/header"
import { FloatingNav } from "@/components/layout/floating-nav"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { Footer } from "@/components/layout/footer"
import { RouteAnnouncer } from "@/components/layout/route-announcer"
import { navItems } from "@/data/portfolio-data"
import { socials } from "@/data/socials"

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Frontend Developer",
    template: "%s | Portfolio",
  },
  description: "프론트엔드 개발자 포트폴리오 — 2026",
  openGraph: {
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * 루트 레이아웃 컴포넌트.
 * Pretendard 폰트, 다크 모드 초기화, 공용 네비게이션 및 Footer를 포함한다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark">
      <head />
      <body className={`${pretendard.variable} ${geistMono.variable} font-sans antialiased`}>
        <SmoothScroll />
        <SkipNav />
        <ScrollProgress />
        <Header items={navItems} />

        <main id="main-content" tabIndex={-1} className="min-h-screen pt-16 outline-none">
          {children}
        </main>

        <Footer socials={socials} />
        <FloatingNav items={navItems} />
        <RouteAnnouncer />
      </body>
    </html>
  )
}
