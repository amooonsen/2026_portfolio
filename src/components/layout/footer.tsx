import { Container } from "@/components/ui/container"
import { IconButton } from "@/components/ui/icon-button"

interface FooterLink {
  platform: string
  url: string
  icon: React.ReactNode
}

interface FooterProps {
  socials?: FooterLink[]
  className?: string
}

/**
 * 페이지 하단 Footer 컴포넌트.
 * 소셜 링크, 저작권 정보, 빌드 정보를 포함한다.
 * @param props.socials - 소셜 미디어 링크 배열
 */
export function Footer({ socials = [], className }: FooterProps) {
  return (
    <footer className={className}>
      <Container>
        <div className="border-t border-border py-12">
          {/* 소셜 링크 */}
          {socials.length > 0 && (
            <div className="flex justify-center gap-2">
              {socials.map((social) => (
                <IconButton
                  key={social.platform}
                  icon={social.icon}
                  label={social.platform}
                  href={social.url}
                  variant="ghost"
                />
              ))}
            </div>
          )}

          {/* 저작권 + 빌드 정보 */}
          <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <p className="text-xs">
              Built with Next.js &middot; Deployed on Vercel
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
