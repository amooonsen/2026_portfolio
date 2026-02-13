---
title: "Interactive Dashboard Platform"
description: "실시간 데이터 시각화 대시보드 플랫폼. React, D3.js, WebSocket 기반의 고성능 차트 시스템을 설계하고, 커스텀 위젯 빌더와 드래그 앤 드롭 레이아웃 엔진을 구현했습니다."
tags: ["React", "TypeScript", "D3.js", "WebSocket", "TanStack Query", "Zustand"]
year: 2025
featured: true
period: "2025.03 — 2025.12"
thumbnail: "/images/projects/dashboard-thumb.webp"
images:
  - "/images/projects/dashboard-overview.webp"
  - "/images/projects/dashboard-chart.webp"
  - "/images/projects/dashboard-mobile.webp"
links:
  github: "https://github.com/example/dashboard"
  live: "https://dashboard.example.com"
---

## 프로젝트 개요

대규모 SaaS 환경에서 실시간 데이터를 시각화하는 대시보드 플랫폼을 설계·구축했습니다. 수천 개의 데이터 포인트를 지연 없이 렌더링하는 차트 시스템과, 사용자가 자유롭게 구성할 수 있는 위젯 레이아웃 엔진이 핵심입니다.

![대시보드 메인 화면](/images/projects/dashboard-overview.webp "대시보드 메인 화면 — 실시간 차트와 위젯 레이아웃")

## 주요 성과

- **실시간 WebSocket 데이터 스트리밍**: 초당 1,000건 이상의 이벤트를 지연 없이 처리
- **커스텀 차트 엔진**: D3.js 기반 SVG/Canvas 하이브리드 렌더링으로 10,000+ 데이터 포인트 처리
- **드래그 앤 드롭 위젯 빌더**: 사용자가 대시보드 레이아웃을 자유롭게 구성
- **TanStack Query 캐싱 전략**: API 호출 60% 절감, 체감 속도 2배 향상
- **다크/라이트 테마**: CSS 변수 기반 동적 테마 전환

## 기술적 도전

### WebSocket 메시지 처리 최적화

초당 1,000건 이상의 메시지를 처리하면서도 UI가 버벅이지 않도록 하는 것이 가장 큰 도전이었습니다. 메시지를 배치로 모아 `requestAnimationFrame` 주기에 맞춰 한 번에 반영하는 구조를 설계했습니다.

```typescript
// WebSocket 메시지 배치 처리: rAF 주기에 맞춰 한 번에 반영
class WebSocketBatcher<T> {
  push(item: T) {
    this.buffer.push(item);
    if (!this.rafId) this.rafId = requestAnimationFrame(() => this.flush());
  }
}
```

![차트 렌더링 성능 비교](/images/projects/dashboard-chart.webp "배치 처리 전후 프레임 드롭 비교")

### D3.js 하이브리드 렌더링 전략

데이터 규모에 따라 렌더링 방식을 동적으로 전환하는 하이브리드 엔진을 구현했습니다. 소규모 데이터는 SVG로 인터랙션을 풍부하게, 대규모 데이터는 Canvas로 성능을 확보합니다.

```tsx
// D3.js 하이브리드: 데이터 규모에 따라 SVG/Canvas 동적 전환
function ChartRenderer({ data, width, height }: ChartRendererProps) {
  return data.length > 5000
    ? <CanvasChart data={data} width={width} height={height} />
    : <SVGChart data={data} width={width} height={height} interactive />;
}
```

### 상태 관리 아키텍처

Zustand를 활용한 슬라이스 패턴으로 대시보드 상태를 모듈별로 분리하고, TanStack Query와의 통합으로 서버 상태와 클라이언트 상태를 명확히 구분했습니다.

```typescript
// Zustand 슬라이스 패턴: 위젯 레이아웃 상태 분리
const useLayoutSlice: StateCreator<LayoutSlice> = (set) => ({
  widgets: [],
  addWidget: (w) => set((s) => ({ widgets: [...s.widgets, w] })),
  updatePosition: (id, pos) => set((s) => ({ widgets: s.widgets.map(w => w.id === id ? { ...w, position: pos } : w) })),
});
```

## 기술적 의사결정 및 근거

### 차트 라이브러리: D3.js vs Chart.js vs Recharts

**D3.js 채택.** Chart.js와 Recharts는 빠른 프로토타이핑에 적합하지만, 커스텀 인터랙션(줌, 브러시, 크로스헤어)과 SVG/Canvas 하이브리드 렌더링을 구현하기에는 추상화 수준이 너무 높았습니다. D3.js는 저수준 제어가 가능하면서도 스케일, 축, 트랜지션 등 핵심 유틸리티를 제공하여, 커스텀 요구사항이 많은 대시보드 프로젝트에 최적이었습니다.

| 기준 | D3.js | Chart.js | Recharts |
|------|-------|----------|----------|
| 커스텀 인터랙션 | 완전 제어 | 제한적 | 보통 |
| 대규모 데이터 | Canvas 전환 가능 | 성능 저하 | 성능 저하 |
| 학습 곡선 | 높음 | 낮음 | 보통 |
| React 통합 | 수동 | 플러그인 | 네이티브 |

### 실시간 통신: WebSocket vs SSE vs Polling

**WebSocket 채택.** 대시보드는 서버 → 클라이언트 단방향 스트리밍뿐만 아니라, 사용자 액션(필터 변경, 시간 범위 조정)을 서버에 즉시 전달해야 했습니다. SSE는 단방향만 지원하고, Polling은 지연 시간이 요구사항(< 100ms)을 충족하지 못했습니다.

```bash
# WebSocket 스트리밍 테스트
wscat -c ws://localhost:3001/dashboard/stream
> {"type": "subscribe", "channels": ["cpu", "memory"]}
< {"channel": "cpu", "value": 72.4, "ts": 1706745600000}
```

![모바일 반응형 대시보드](/images/projects/dashboard-mobile.webp "모바일에서도 핵심 지표를 한눈에 확인")

## 담당 기간

2025.03 - 2025.12 | 프론트엔드 리드
