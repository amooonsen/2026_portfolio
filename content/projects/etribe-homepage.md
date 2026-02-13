---
title: "이트라이브 홈페이지 리뉴얼"
description: "Lerp 기반 스무스 스크롤 엔진 자체 설계, 커스텀 커서 인터랙션, GPU 가속 60fps 렌더링 최적화를 구현한 프리미엄 웹 경험."
tags: ["JavaScript", "GSAP", "Lottie.js", "SCSS"]
year: 2022
links:
  live: "https://www.etribe.co.kr/"
---

## 프로젝트 개요

이트라이브(자사) 홈페이지 리뉴얼 및 메타버스 홈페이지 구축 프로젝트에서 프론트엔드 개발 및 퍼블리싱을 매니저로서 담당했습니다.

## 주요 성과

- **Lerp 알고리즘 기반 스무스 스크롤 엔진 자체 설계 및 구현**, 네이티브 스크롤 대비 프리미엄 UX 제공 (현: Lenis로 대체)
- **파라미터 기반 설정 시스템 구축**으로 가속도, 거리 등을 코드 수정 없이 조정 가능하도록 개발, 유지보수성 대폭 향상
- **커스텀 커서 인터랙션 도입**, 마우스 이동, 호버, 클릭 상태별 동적 애니메이션 구현
- **GPU 가속 및 RequestAnimationFrame 활용**으로 60fps 렌더링 최적화, 성능 저하 최소화
- **크로스 브라우저 이슈 해결** (Safari 버벅임, 터치 제스처 충돌 등) 및 접근성 고려 (prefers-reduced-motion 대응)

## 기술적 도전

Lerp 알고리즘을 활용하여 스무스 스크롤 엔진을 처음부터 설계하고, 파라미터 기반 설정 시스템으로 유지보수성을 확보하는 것이 핵심 과제였습니다. Safari의 스크롤 관련 버그와 터치 제스처 충돌 문제를 해결하는 데 상당한 노력이 필요했습니다.

스무스 스크롤 엔진을 직접 구현할 때 가장 큰 도전은 네이티브 스크롤 동작을 완전히 대체하면서도, 접근성과 브라우저 기본 기능(앵커 링크, 뒤로 가기 시 스크롤 복원 등)을 깨뜨리지 않는 것이었습니다. `overflow: hidden`으로 네이티브 스크롤을 비활성화하고 `translate3d`로 콘텐츠를 이동시키는 방식에서, 키보드 탭 네비게이션 시 포커스 요소가 뷰포트 밖에 있는 문제가 발생했습니다. 포커스 이벤트를 감지하여 해당 요소의 위치로 스크롤을 보정하는 로직을 추가로 구현했습니다.

Safari에서는 `wheel` 이벤트의 `deltaY` 값이 다른 브라우저와 다르게 가속도가 적용되어 전달되었고, iOS에서는 터치 관성 스크롤(momentum scrolling)과 커스텀 스크롤이 충돌했습니다. 브라우저별 `deltaY` 값을 정규화하는 로직을 작성하고, iOS에서는 `touch` 이벤트를 별도로 처리하여 해결했습니다.

## 기술적 의사결정 및 근거

### 스크롤 엔진: 자체 구현 vs Locomotive Scroll vs CSS scroll-behavior

**Lerp 기반 스크롤 엔진 자체 설계 채택.** 에이전시 자사 홈페이지는 기술력을 보여주는 쇼케이스 역할을 하기 때문에, 스크롤 경험이 곧 브랜드 인상이었습니다. Locomotive Scroll은 2022년 당시 가장 인기 있던 라이브러리였지만, 디자이너가 원하는 미세한 감속 곡선을 표현하기 제한적이었고 라이브러리 업데이트 주기에 종속되는 리스크가 있었습니다. CSS `scroll-behavior: smooth`는 감속 곡선이나 parallax 효과를 세밀하게 제어할 수 없어 프리미엄 스크롤 경험에 미달했습니다. 자체 구현으로 파라미터 기반 설정 시스템을 두어 디자이너와 긴밀하게 협업하며 감속 곡선의 미세한 차이까지 조정할 수 있었습니다.

### 렌더링 방식: requestAnimationFrame vs CSS Transition

**requestAnimationFrame + Lerp 채택.** 스크롤 위치에 연동되는 요소(parallax 배경, 커스텀 커서, 콘텐츠 fade-in)가 다수 존재했기 때문에, 매 프레임 정확한 스크롤 위치 값을 다른 애니메이션에 전달할 수 있는 방식이 필수였습니다. CSS Transition + JavaScript 트리거 방식은 프레임별 제어가 불가능하여 스크롤 중간 값을 parallax에 활용하기 어렵고, `transitionend` 이벤트 기반이라 빠른 스크롤 입력 시 충돌 문제가 있었습니다.

### 파라미터 기반 설정 시스템 도입

에이전시 특성상 디자이너의 수정 요청이 빈번한 환경에서, 스크롤 감속 계수, 속도, 임계값 등을 로직 내에 하드코딩하면 매번 코드 전체를 이해하고 수정해야 하는 유지보수 부담이 발생합니다. 이를 해결하기 위해 설정 객체로 분리하는 파라미터 기반 구조를 설계했습니다. 실제로 프로젝트 기간 동안 디자이너로부터 스크롤 감속 느낌을 미세 조정해달라는 요청이 수십 차례 있었는데, 파라미터 기반 구조 덕분에 매번 수 초 내에 대응할 수 있었고 이후 다른 프로젝트에 재사용할 때도 설정만 변경하여 적용 가능했습니다.

```javascript
// Lerp 기반 스무스 스크롤 엔진 핵심 구현
class SmoothScroll {
  constructor(options = {}) {
    // 파라미터 기반 설정 시스템 - 디자이너 요청 시 값만 변경
    this.config = {
      ease: options.ease || 0.075,        // 감속 계수 (0에 가까울수록 부드러움)
      threshold: options.threshold || 0.5, // 목표 도달 임계값 (px)
      touchMultiplier: options.touchMultiplier || 2, // 터치 스크롤 배율
      wheelMultiplier: options.wheelMultiplier || 1, // 휠 스크롤 배율
    };

    this.targetY = 0;   // 목표 스크롤 위치 (사용자 입력에 의해 갱신)
    this.currentY = 0;  // 현재 보간 중인 위치 (매 프레임 Lerp로 갱신)
    this.isRunning = false;
    this.listeners = []; // 스크롤 위치 변경 리스너 (parallax 등)

    this.init();
  }

  init() {
    // 네이티브 스크롤 비활성화
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    // 콘텐츠 래퍼에 will-change 적용 (GPU 레이어 프로모션)
    this.content = document.querySelector('[data-scroll-container]');
    this.content.style.willChange = 'transform';

    this.bindEvents();
    this.startLoop();
  }

  // Lerp (Linear Interpolation): 현재 값에서 목표 값으로 일정 비율만큼 이동
  // current + (target - current) * ease
  lerp(current, target, ease) {
    return current + (target - current) * ease;
  }

  onWheel(e) {
    e.preventDefault();
    // 브라우저별 deltaY 정규화
    const delta = this.normalizeDelta(e.deltaY) * this.config.wheelMultiplier;
    this.targetY = Math.max(0, Math.min(this.targetY + delta, this.maxScroll));
  }

  // Safari의 가속 deltaY를 정규화
  normalizeDelta(deltaY) {
    return Math.sign(deltaY) * Math.min(Math.abs(deltaY), 150);
  }

  // 매 프레임 실행: Lerp로 현재 위치를 목표 위치에 점진적으로 수렴
  update() {
    this.currentY = this.lerp(this.currentY, this.targetY, this.config.ease);

    // 임계값 이내면 목표 도달로 판단 (부동소수점 오차 방지)
    if (Math.abs(this.currentY - this.targetY) < this.config.threshold) {
      this.currentY = this.targetY;
    }

    // GPU 가속 transform으로 콘텐츠 이동
    this.content.style.transform = `translate3d(0, ${-this.currentY}px, 0)`;

    // 등록된 리스너에 현재 스크롤 값 전달 (parallax, fade-in 등)
    this.listeners.forEach(fn => fn(this.currentY));

    this.raf = requestAnimationFrame(() => this.update());
  }

  // 접근성: prefers-reduced-motion 대응
  checkReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.destroy();
      document.body.style.overflow = '';
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.content.style.willChange = '';
    this.content.style.transform = '';
    document.body.style.overflow = '';
  }
}

// 사용 예시: 파라미터만 변경하여 스크롤 느낌 조정
const scroll = new SmoothScroll({
  ease: 0.06,           // 더 부드러운 감속
  threshold: 0.3,
  touchMultiplier: 2.5, // 모바일에서 더 큰 스크롤 폭
});

// 스크롤 위치를 구독하여 parallax 효과 적용
scroll.listeners.push((scrollY) => {
  const parallaxEl = document.querySelector('.hero-bg');
  parallaxEl.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
});
```

## 담당 기간

2022.08 - 2022.10 | 프론트엔드 개발 및 퍼블리싱 매니저
