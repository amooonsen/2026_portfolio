---
title: "호텔롯데 법인 홈페이지 리뉴얼"
description: "Lottie.js 도입으로 애니메이션 리소스 70% 절감, GSAP ScrollTrigger 활용 가로 스크롤 및 풀페이지 애니메이션 구현."
tags: ["JavaScript", "GSAP", "Lottie.js", "SCSS"]
year: 2022
links:
  live: "https://www.hotellotte.com"
---

## 프로젝트 개요

호텔롯데 법인 홈페이지 리뉴얼 프로젝트에서 프론트엔드 개발 및 퍼블리싱을 매니저로서 담당했습니다. 고품질 인터랙션과 크로스 브라우저 호환성에 중점을 두었습니다.

## 주요 성과

- **Lottie.js 도입으로 애니메이션 리소스 용량 기존 GIF/Video 대비 70% 절감**, 고품질 마이크로 인터랙션 구현
- **GSAP ScrollTrigger 활용 가로 스크롤 및 풀페이지 애니메이션 구현** 및 크로스 브라우저(IE11, Chrome, Safari) 호환성 확보
- **임원진 프레젠테이션 및 사용자 설문조사에서 매우 긍정 평가 획득**

## 기술적 도전

호텔 브랜드의 프리미엄 이미지를 웹에서 표현하기 위해 고품질 애니메이션이 필수적이었지만, 기존 방식(GIF, 영상)으로는 페이지 용량이 수십 MB에 달해 로딩 성능에 심각한 영향을 주었습니다. 디자이너가 After Effects로 제작한 애니메이션을 Bodymovin 플러그인으로 JSON 형태로 추출하고 Lottie.js로 렌더링하는 파이프라인을 구축하여, 리소스 용량을 70% 줄이면서도 벡터 기반의 선명한 애니메이션 품질을 유지했습니다.

GSAP ScrollTrigger를 활용한 가로 스크롤 구현도 난이도가 높았습니다. 세로 스크롤을 가로 이동으로 변환하는 과정에서 스크롤 진행률과 가로 위치의 정확한 매핑이 필요했고, 가로 스크롤 영역 내부의 개별 요소들에도 별도의 ScrollTrigger를 적용하여 시차(parallax) 효과를 구현해야 했습니다. 중첩된 ScrollTrigger 인스턴스 간의 충돌을 방지하기 위해 trigger 영역과 스크롤 범위를 정밀하게 조정했습니다.

가장 어려웠던 부분은 IE11 호환성이었습니다. GSAP 자체는 IE11을 지원하지만, ScrollTrigger의 일부 기능과 Lottie.js의 SVG 렌더링이 IE11에서 예상과 다르게 동작하는 경우가 있었습니다. SVG 애니메이션의 `transform-origin` 계산 차이, `IntersectionObserver` 미지원에 따른 폴리필 적용, CSS Custom Properties 대신 SCSS 변수로의 전환 등 IE11 전용 대응 작업이 상당한 비중을 차지했습니다.

## 기술적 의사결정 및 근거

### 애니메이션 구현 방식: Lottie.js vs GIF/Video vs CSS Animation

**Lottie.js 채택.** 세 가지 기준으로 평가했습니다. 첫째 리소스 용량으로, 메인 페이지에만 8개 이상의 애니메이션이 필요했는데 GIF는 개당 2~5MB, 영상은 5~15MB인 반면 Lottie JSON은 개당 50~200KB 수준이었습니다. 둘째 품질로, 디자이너가 After Effects로 설계한 복잡한 모션 그래픽(파티클, 모핑, 패스 애니메이션)을 CSS로 재현하는 것은 현실적으로 어렵습니다. 셋째 워크플로우로, Bodymovin으로 JSON을 내보내면 그대로 사용할 수 있어 수정 사이클이 줄어듭니다. 런타임(약 50KB gzip)이 추가되고 저사양 기기에서 프레임 드랍 가능성이 있었지만, 복잡한 애니메이션을 Canvas 렌더러로 전환하고 뷰포트 밖 애니메이션을 일시정지하는 방식으로 완화했습니다.

### 가로 스크롤 구현: GSAP ScrollTrigger vs CSS scroll-snap

**GSAP ScrollTrigger 채택.** CSS `scroll-snap`은 스냅 포인트 지정에는 적합하지만, 이 프로젝트에서 필요한 것은 세로 스크롤을 가로 이동으로 변환하면서 스크롤 진행률에 따라 내부 요소들의 opacity, scale, position이 연속적으로 변하는 복합 애니메이션이었습니다. ScrollTrigger의 `pin`과 `scrub` 기능으로 이를 구현했고, IE11이 `scroll-snap`을 지원하지 않는 문제도 GSAP의 IE11 지원으로 해결했습니다. 다만 스크롤 하이재킹으로 모바일 터치 관성이 네이티브와 다르게 느껴질 수 있어, 모바일에서는 `scrub` 값을 조정하여 터치 응답성을 개선했습니다.

### IE11 대응: 점진적 향상(Progressive Enhancement) 전략

클라이언트 요구사항이 "모든 브라우저에서 동일한 콘텐츠 접근성"이었기 때문에, IE11 별도 페이지를 분리하면 유지보수 부담이 두 배가 됩니다. 대신 단일 코드베이스에서 핵심 콘텐츠와 레이아웃은 IE11에서도 정상 작동하도록 구현하되, 고급 인터랙션은 feature detection을 통해 모던 브라우저에서만 활성화하는 점진적 향상 전략을 선택했습니다.

구체적으로 Lottie 애니메이션은 IE11에서 Canvas 렌더러로 폴백하고, ScrollTrigger의 복잡한 스크롤 연동은 단순 fade-in으로 대체했습니다. SCSS 변수로 CSS Custom Properties 미지원을 우회하고, `@babel/preset-env`로 ES6+ 구문을 트랜스파일했습니다. IE11 폴백 코드가 모던 브라우저 번들에도 포함되는 오버헤드가 있었지만, 당시 빌드 환경에서 differential serving 적용이 어려워 감수했습니다.

## 담당 기간

2022.06 - 2022.08 | 프론트엔드 개발 및 퍼블리싱 매니저
