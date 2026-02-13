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
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { PersonSchema, WebsiteSchema } from "@/components/seo/json-ld"
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://cho-kyeongmoon.dev"
  ),
  title: {
    default: "조경문 | Frontend Developer",
    template: "%s | 조경문",
  },
  description:
    "4년 경력 프론트엔드 개발자 조경문의 포트폴리오입니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다.",
  keywords: [
    "프론트엔드 개발자",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "웹 개발",
    "조경문",
    "포트폴리오",
  ],
  authors: [{ name: "조경문", url: "https://cho-kyeongmoon.dev" }],
  creator: "조경문",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "조경문 | Frontend Developer",
    description:
      "4년 경력 프론트엔드 개발자 조경문의 포트폴리오입니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다.",
    siteName: "조경문 | Frontend Developer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "조경문 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "조경문 | Frontend Developer",
    description:
      "4년 경력 프론트엔드 개발자 조경문의 포트폴리오입니다. React, Next.js, TypeScript를 주력으로 모던 웹 애플리케이션을 구축합니다.",
    images: ["/og-image.png"],
    creator: "@cho_kyeongmoon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <WebsiteSchema />
      </head>
      <body className={`${pretendard.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SmoothScroll />
          <SkipNav />
          <ScrollProgress />
          <Header items={navItems} />

          <main id="main-content" tabIndex={-1} className="min-h-screen pt-16 outline-none">
            {children}
          </main>

          <Footer socials={socials} />
          <FloatingNav items={navItems} />
          <ScrollToTop />
          <RouteAnnouncer />
        </ThemeProvider>
      </body>
    </html>
  )
}
