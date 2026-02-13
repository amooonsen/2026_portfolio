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

/**
 * Configuration for progress bar animations.
 */
export interface ProgressAnimationOptions {
  /** Animation duration (seconds) */
  duration?: number;
  /** GSAP easing function */
  ease?: string;
  /** Callback fired when animation completes */
  onComplete?: () => void;
}

/**
 * Animates a progress bar element's width to represent a percentage.
 * Uses GSAP for smooth, hardware-accelerated transitions.
 *
 * @param element - The progress bar element to animate
 * @param progress - Target progress value (0-100)
 * @param options - Animation configuration options
 * @returns GSAP tween instance for further control
 *
 * @example
 * ```typescript
 * const progressBar = document.querySelector(".progress-bar");
 * animateProgress(progressBar, 75, {
 *   duration: 0.3,
 *   ease: "power2.out"
 * });
 * ```
 */
export function animateProgress(
  element: HTMLElement,
  progress: number,
  options: ProgressAnimationOptions = {}
): gsap.core.Tween {
  const {duration = 0.3, ease = "power2.out", onComplete} = options;

  return gsap.to(element, {
    width: `${progress}%`,
    duration,
    ease,
    onComplete,
  });
}

/**
 * Common animation constants used across the application.
 */
export const ANIMATION_CONSTANTS = {
  /** Standard easing functions */
  EASING: {
    DEFAULT: "power3.out",
    BOUNCE: "elastic.out(1, 0.5)",
    SMOOTH: "power2.inOut",
    BACK: "back.out(1.7)",
  },

  /** Common animation durations (seconds) */
  DURATION: {
    FAST: 0.3,
    DEFAULT: 0.5,
    SLOW: 0.7,
    VERY_SLOW: 1.0,
  },

  /** Stagger delays for sequential animations */
  STAGGER: {
    TIGHT: 0.03,
    DEFAULT: 0.05,
    LOOSE: 0.1,
  },
} as const;
