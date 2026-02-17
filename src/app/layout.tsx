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
import { siteConfig } from "@/lib/metadata"

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.author.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  icons: {
    icon: [
      { url: "/icons/icon-light-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icons/icon-dark-32.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/icons/icon-light-16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icons/icon-dark-16.png", sizes: "16x16", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
