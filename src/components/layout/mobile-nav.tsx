"use client";

import Link from "next/link";
import {ExternalLink, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {useFocusTrap} from "@/hooks/use-focus-trap";

interface MobileNavProps {
  items: Array<{label: string; href: string; external?: boolean}>;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 모바일 전체 화면 네비게이션 오버레이.
 * ESC 키 또는 링크 클릭 시 닫히며, 열려 있을 때 body 스크롤을 잠근다.
 * 포커스 트랩으로 오버레이 내부에서만 Tab 순환한다.
 * 외부 링크는 새 탭으로 연다.
 */
export function MobileNav({items, isOpen, onClose}: MobileNavProps) {
  const containerRef = useFocusTrap<HTMLDivElement>({isOpen, onEscape: onClose});

  return (
    <div
      ref={containerRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="모바일 네비게이션"
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        "bg-background/95 backdrop-blur-xl",
        "transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center h-11 w-11 rounded-lg hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none"
          aria-label="메뉴 닫기"
          tabIndex={isOpen ? 0 : -1}
        >
          <X className="size-6" />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center gap-8 mt-16">
        {items.map((item, index) => {
          const sharedClassName = cn(
            "text-3xl font-semibold text-foreground hover:text-primary transition-all duration-300",
            "focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:outline-none focus-visible:rounded-lg",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          );
          const style = {transitionDelay: isOpen ? `${index * 75}ms` : "0ms"};

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={cn(sharedClassName, "flex items-center gap-2")}
                style={style}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
                <ExternalLink className="size-5" />
                <span className="sr-only">(새 창에서 열림)</span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={sharedClassName}
              style={style}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
