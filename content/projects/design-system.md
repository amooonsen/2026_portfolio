---
title: "디자인 시스템"
description: "일관된 UI를 위한 사내 컴포넌트 라이브러리. Storybook 문서화와 자동 시각적 회귀 테스트를 포함합니다."
tags: ["React", "TypeScript", "Storybook", "Tailwind CSS"]
year: 2023
images:
  - "https://picsum.photos/seed/design-sys-1/1200/800"
  - "https://picsum.photos/seed/design-sys-2/1200/800"
  - "https://picsum.photos/seed/design-sys-3/1200/800"
links:
  github: "#"
---

## 프로젝트 배경

여러 제품 팀이 각자 다른 UI 컴포넌트를 만들면서 일관성이 떨어지고, 중복 작업이 발생하는 문제를 해결하기 위해 사내 디자인 시스템을 구축했습니다.

## 주요 작업

- **컴포넌트 라이브러리**: Atomic Design 원칙에 따른 30+ 컴포넌트 설계 및 구현
- **Storybook 문서화**: 인터랙티브 문서와 사용 예시를 포함한 컴포넌트 카탈로그
- **시각적 회귀 테스트**: Chromatic을 활용한 자동 시각적 변경 감지
- **디자인 토큰**: 색상, 타이포그래피, 간격 등의 토큰 시스템 구축

## 기술적 도전

Tailwind CSS의 유틸리티 기반 접근과 컴포넌트 라이브러리의 추상화 사이에서 적절한 균형을 찾는 것이 핵심 과제였습니다. CVA(Class Variance Authority)를 도입하여 타입 안전한 variant 시스템을 구축했습니다.

## 성과

- 개발 생산성 **35% 향상**
- UI 버그 리포트 60% 감소
- 3개 제품 팀에서 공통 사용
