---
title: "대시보드 플랫폼"
description: "실시간 데이터 시각화와 팀 협업을 위한 통합 대시보드. WebSocket 기반 실시간 업데이트와 드래그 앤 드롭 위젯 커스터마이징을 구현했습니다."
tags: ["Next.js", "TypeScript", "D3.js", "WebSocket"]
year: 2025
featured: true
images:
  - "https://picsum.photos/seed/dashboard-1/1200/800"
  - "https://picsum.photos/seed/dashboard-2/1200/800"
  - "https://picsum.photos/seed/dashboard-3/1200/800"
links:
  github: "#"
  live: "#"
---

## 프로젝트 배경

팀 내 여러 데이터 소스의 지표를 한눈에 모니터링하고, 실시간으로 협업할 수 있는 대시보드 플랫폼을 개발했습니다.

## 주요 작업

- **실시간 데이터 시각화**: D3.js를 활용한 커스텀 차트 컴포넌트 (라인, 바, 파이, 히트맵)
- **WebSocket 실시간 업데이트**: 서버에서 푸시되는 데이터를 실시간으로 차트에 반영
- **드래그 앤 드롭**: React DnD를 활용한 위젯 배치 커스터마이징
- **팀 협업**: 대시보드 공유, 실시간 커서 표시, 코멘트 기능

## 기술적 도전

수천 개의 데이터 포인트를 실시간으로 렌더링하면서 60fps를 유지하기 위해, Canvas 기반 렌더링과 데이터 다운샘플링 전략을 적용했습니다. WebSocket 연결 관리와 재연결 로직도 핵심 과제였습니다.

## 성과

- 데이터 확인 시간 **50% 단축**
- 팀 의사결정 속도 향상
- 사내 5개 팀에서 일일 활성 사용
