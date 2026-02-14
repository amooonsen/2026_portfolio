import {gsap} from "./gsap";

/**
 * Configuration for character stagger animations.
 */
export interface CharStaggerOptions {
  /** Delay between each character animation (seconds) */
  stagger?: number;
  /** Animation duration for each character (seconds) */
  duration?: number;
  /** Starting Y offset for characters (pixels) */
  y?: number;
  /** Starting rotation on X axis (degrees) */
  rotateX?: number;
  /** GSAP easing function */
  ease?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
}

/**
 * Animates text content character-by-character with staggered entrance.
 * Wraps each character in a span for individual animation control.
 *
 * **Important**: This function modifies the element's innerHTML, destroying any existing child elements.
 *
 * @param element - The HTML element containing text to animate
 * @param options - Animation configuration options
 * @returns GSAP timeline instance for further control
 *
 * @example
 * ```typescript
 * const titleElement = document.querySelector("h1");
 * const tl = animateCharsStagger(titleElement, {
 *   stagger: 0.03,
 *   duration: 0.6,
 *   y: 40,
 *   rotateX: -90,
 *   ease: "back.out(1.5)"
 * });
 * ```
 */
export function animateCharsStagger(
  element: HTMLElement,
  options: CharStaggerOptions = {}
): gsap.core.Timeline {
  const {
    stagger = 0.03,
    duration = 0.6,
    y = 40,
    rotateX = -90,
    ease = "back.out(1.5)",
    delay = 0,
  } = options;

  const text = element.textContent || "";
  const chars = text.split("");

  // Wrap each character in a span for individual animation
  element.innerHTML = chars
    .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");

  // Animate from invisible with transform
  return gsap.timeline().from(element.children, {
    opacity: 0,
    y,
    rotateX,
    stagger,
    duration,
    ease,
    delay,
  });
}
