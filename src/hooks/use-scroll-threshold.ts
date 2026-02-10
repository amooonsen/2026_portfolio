"use client";

import {useEffect, useState} from "react";

/**
 * Detects when scroll position crosses a threshold with RAF-throttled updates.
 * Automatically cleans up event listeners on unmount.
 *
 * @param threshold - The vertical scroll position (in pixels) to detect
 * @param options - Optional configuration
 * @param options.axis - Scroll axis to track ("y" or "x"), defaults to "y"
 * @returns true if scroll position is greater than threshold, false otherwise
 *
 * @example
 * ```typescript
 * function ScrollButton() {
 *   const showButton = useScrollThreshold(400);
 *
 *   return (
 *     <button style={{ opacity: showButton ? 1 : 0 }}>
 *       Scroll to Top
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Horizontal scroll detection
 * const scrolledRight = useScrollThreshold(200, { axis: "x" });
 * ```
 */
export function useScrollThreshold(
  threshold: number,
  options: {axis?: "x" | "y"} = {}
): boolean {
  const {axis = "y"} = options;
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let latestScrollPos = axis === "y" ? window.scrollY : window.scrollX;

    /**
     * RAF-throttled scroll handler to prevent excessive state updates.
     * Only checks scroll position once per animation frame.
     */
    function handleScroll() {
      latestScrollPos = axis === "y" ? window.scrollY : window.scrollX;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const isOver = latestScrollPos > threshold;
          setIsOverThreshold(isOver);
          rafId = null;
        });
      }
    }

    // Initial check
    handleScroll();

    // Passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [threshold, axis]);

  return isOverThreshold;
}
