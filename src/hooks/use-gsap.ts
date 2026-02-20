"use client";

import {useEffect, useRef, type DependencyList, type MutableRefObject} from "react";
import {gsap} from "@/lib/gsap";

/**
 * useGsap / useGsapContext 두 훅이 공통으로 사용하는 핵심 구현체.
 * GSAP 컨텍스트 생성, 콜백 실행, 자동 정리(cleanup)를 담당한다.
 *
 * @internal
 */
function createGsapEffect(
  callback: (context: gsap.Context) => void,
  scope: MutableRefObject<HTMLElement | null> | null,
  dependencies: DependencyList,
  contextRef: MutableRefObject<gsap.Context | null>,
): () => void {
  // scope가 지정되었지만 아직 DOM에 마운트되지 않은 경우 early return
  if (scope && !scope.current) {
    return () => {};
  }

  // scope 유무에 따라 GSAP 컨텍스트 생성
  // scope를 지정하면 해당 요소 내부로 셀렉터 범위가 제한된다
  const ctx = scope ? gsap.context(callback, scope) : gsap.context(callback);
  contextRef.current = ctx;

  // 클린업: 등록된 모든 트윈/플러그인을 되돌리고(revert) ref를 초기화
  return () => {
    ctx.revert();
    contextRef.current = null;
  };
}

/**
 * 전역 범위의 GSAP 애니메이션을 위한 훅.
 * 컴포넌트가 언마운트되거나 의존성이 변경될 때 모든 애니메이션을 자동으로 되돌린다(revert).
 *
 * **적합한 경우**: 특정 DOM 요소에 스코프를 한정할 필요 없는 전역 애니메이션.
 *
 * @param callback - GSAP 애니메이션을 정의하는 함수
 * @param dependencies - 의존성 배열 (useEffect와 동일한 규칙)
 * @returns 필요 시 직접 제어할 수 있도록 GSAP 컨텍스트 ref를 반환
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
 * @see {@link useGsapContext} 특정 컨테이너에 스코프를 한정한 애니메이션
 */
export function useGsap(
  callback: (context: gsap.Context) => void,
  dependencies: DependencyList = [],
): MutableRefObject<gsap.Context | null> {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return createGsapEffect(callback, null, dependencies, contextRef);
    // 의존성 배열은 외부에서 전달받으므로 eslint 규칙 예외 처리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}

/**
 * 특정 DOM 요소에 스코프를 한정한 GSAP 애니메이션 훅.
 * 콜백 내부의 모든 셀렉터 쿼리가 지정된 컨테이너 요소 안으로 제한되므로
 * 전역 셀렉터 충돌을 방지하고 애니메이션 격리가 보장된다.
 *
 * **적합한 경우**: 셀렉터를 특정 컨테이너 내부로 격리해야 하는 컴포넌트 단위 애니메이션.
 *
 * @param scope - 셀렉터 범위를 제한할 컨테이너 요소의 ref
 * @param callback - GSAP 애니메이션을 정의하는 함수 (셀렉터가 scope 내부로 제한됨)
 * @param dependencies - 의존성 배열 (useEffect와 동일한 규칙)
 * @returns 필요 시 직접 제어할 수 있도록 GSAP 컨텍스트 ref를 반환
 *
 * @example
 * ```typescript
 * function Component() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   useGsapContext(containerRef, () => {
 *     // ".box" 셀렉터는 containerRef 내부로 범위가 제한된다
 *     gsap.to(".box", { x: 100 });
 *
 *     // 다른 곳에 ".box"가 존재해도 충돌이 발생하지 않는다
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
 * // 동일한 컴포넌트 내에서 여러 스코프 애니메이션 사용
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
 *         <div className="item">사이드바 아이템</div>
 *       </aside>
 *       <main ref={contentRef}>
 *         <div className="item">콘텐츠 아이템</div>
 *       </main>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link useGsap} 스코프 없는 전역 애니메이션
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  scope: MutableRefObject<T | null>,
  callback: (context: gsap.Context) => void,
  dependencies: DependencyList = [],
): MutableRefObject<gsap.Context | null> {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return createGsapEffect(callback, scope, dependencies, contextRef);
    // 의존성 배열은 외부에서 전달받으므로 eslint 규칙 예외 처리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
