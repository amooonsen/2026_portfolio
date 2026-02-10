"use client";

import {useEffect, useRef, type DependencyList, type MutableRefObject} from "react";
import {gsap} from "@/lib/gsap";

/**
 * Core GSAP context effect implementation shared by both hooks.
 * Handles context creation, callback execution, and automatic cleanup.
 *
 * @internal
 */
function createGsapEffect(
  callback: (context: gsap.Context) => void,
  scope: MutableRefObject<HTMLElement | null> | null,
  dependencies: DependencyList,
  contextRef: MutableRefObject<gsap.Context | null>
): () => void {
  // Early return if scope is required but not available
  if (scope && !scope.current) {
    return () => {};
  }

  // Create GSAP context with optional scope
  const ctx = scope ? gsap.context(callback, scope) : gsap.context(callback);
  contextRef.current = ctx;

  // Cleanup function: revert all tweens and clear ref
  return () => {
    ctx.revert();
    contextRef.current = null;
  };
}

/**
 * GSAP context hook with automatic cleanup on unmount.
 * Creates a GSAP context that automatically reverts all animations when the component unmounts
 * or dependencies change.
 *
 * **Best for**: Global animations or animations that don't need scoping to a specific element.
 *
 * @param callback - Function that defines GSAP animations within the context
 * @param dependencies - Dependency array (same rules as useEffect)
 * @returns Ref to the GSAP context for manual control if needed
 *
 * @example
 * ```typescript
 * function Component() {
 *   const [isActive, setIsActive] = useState(false);
 *
 *   useGsap(() => {
 *     gsap.to(".box", {
 *       x: isActive ? 100 : 0,
 *       duration: 0.5
 *     });
 *   }, [isActive]);
 *
 *   return <div className="box">Animated Box</div>;
 * }
 * ```
 *
 * @see {@link useGsapContext} for scoped animations within a specific container
 */
export function useGsap(
  callback: (context: gsap.Context) => void,
  dependencies: DependencyList = []
): MutableRefObject<gsap.Context | null> {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return createGsapEffect(callback, null, dependencies, contextRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}

/**
 * GSAP context hook scoped to a specific DOM element.
 * All selector queries within the callback are scoped to the provided element,
 * preventing selector conflicts and improving animation isolation.
 *
 * **Best for**: Component-scoped animations where selectors should be isolated to a container.
 *
 * @param scope - Ref to the container element that scopes all selectors
 * @param callback - Function that defines GSAP animations within the scoped context
 * @param dependencies - Dependency array (same rules as useEffect)
 * @returns Ref to the GSAP context for manual control if needed
 *
 * @example
 * ```typescript
 * function Component() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   useGsapContext(containerRef, () => {
 *     // ".box" selector is scoped to containerRef
 *     gsap.to(".box", { x: 100 });
 *
 *     // Prevents conflicts if ".box" exists elsewhere
 *   }, []);
 *
 *   return (
 *     <div ref={containerRef}>
 *       <div className="box">Scoped Animation</div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Multiple scoped animations in the same component
 * function Dashboard() {
 *   const sidebarRef = useRef(null);
 *   const contentRef = useRef(null);
 *
 *   useGsapContext(sidebarRef, () => {
 *     gsap.from(".item", { x: -100, stagger: 0.1 });
 *   }, []);
 *
 *   useGsapContext(contentRef, () => {
 *     gsap.from(".item", { y: 50, stagger: 0.05 });
 *   }, []);
 *
 *   return (
 *     <>
 *       <aside ref={sidebarRef}>
 *         <div className="item">Item 1</div>
 *       </aside>
 *       <main ref={contentRef}>
 *         <div className="item">Item 2</div>
 *       </main>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link useGsap} for global animations without scoping
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  scope: MutableRefObject<T | null>,
  callback: (context: gsap.Context) => void,
  dependencies: DependencyList = []
): MutableRefObject<gsap.Context | null> {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return createGsapEffect(callback, scope, dependencies, contextRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
