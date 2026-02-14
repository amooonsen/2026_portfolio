"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
  isOpen: boolean;
  onEscape?: () => void;
}

/**
 * 포커스 트랩 훅.
 * isOpen이 true일 때 container 내 focusable 요소로만 Tab 순환을 제한한다.
 * - 열릴 때 첫 번째 focusable 요소로 포커스 이동
 * - 닫힐 때 트리거 요소로 포커스 복원
 * - ESC 키 시 onEscape 콜백 호출
 */
export function useFocusTrap<T extends HTMLElement>(options: UseFocusTrapOptions) {
  const { isOpen, onEscape } = options;
  const containerRef = useRef<T>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 열릴 때 현재 포커스된 요소(트리거)를 기억
    triggerRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // 첫 번째 focusable 요소로 포커스 이동
    requestAnimationFrame(() => {
      const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      focusables[0]?.focus();
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = container!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // 닫힐 때 트리거 요소로 포커스 복원
      triggerRef.current?.focus();
      triggerRef.current = null;
    };
  }, [isOpen, onEscape]);

  return containerRef;
}
