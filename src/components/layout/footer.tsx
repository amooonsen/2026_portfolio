import {Container} from "@/components/ui/container";
import {IconButton} from "@/components/ui/icon-button";
import {cn} from "@/lib/utils";

interface FooterLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterProps {
  socials?: FooterLink[];
  className?: string;
}

/**
 * 페이지 하단 Footer 컴포넌트.
 * 좌측 소셜 링크, 우측 이메일·저작권 정보를 포함한다.
 */
export function Footer({socials = [], className}: FooterProps) {
  return (
    <footer className={cn("relative z-10", className)}>
      <Container>
        <div className="border-t border-border py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            {/* 소셜 링크 */}
            {socials.length > 0 && (
              <nav aria-label="소셜 미디어" className="flex gap-2">
                {socials.map((social) => (
                  <IconButton
                    key={social.platform}
                    icon={social.icon}
                    label={social.platform}
                    href={social.url}
                    variant="ghost"
                  />
                ))}
              </nav>
            )}

            {/* 이메일 + 저작권 */}
            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:items-end">
              <p>&copy; {new Date().getFullYear()} Kyungmun Cho. All rights reserved.</p>
              <p className="text-xs">Built with Next.js &middot; Deployed on Vercel</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
