---
title: "삼정회계법인 KPMG 홈페이지"
description: "React 기반 SPA 아키텍처로 구축한 기업 홈페이지. 멀티 스텝 폼, 무한 스크롤, 스크롤 인터랙션 등을 구현했습니다."
tags: ["React", "React Query", "Zustand", "React Hook Form", "Zod", "I18N"]
year: 2024
period: "2024.05 — 2024.07"
links:
  live: "https://kpmgmnacenter.com"
---

## 프로젝트 개요

삼정회계법인 KPMG 홈페이지를 React 기반 SPA로 구축하는 프로젝트에서 프론트엔드 개발 및 퍼블리싱을 매니저로서 담당했습니다.

## 주요 성과

- **React 기반 SPA 아키텍처 구축**: React Query, Zustand를 활용한 효율적인 상태 관리 및 서버 데이터 동기화
- **멀티 스텝 폼 설계 및 구현**: React Hook Form + Zod 활용 인증 프로세스 개발, 유효성 검사 및 사용자 경험 최적화
- **무한 스크롤 게시판 구현**: Intersection Observer API 활용, 페이지네이션 대비 사용자 편의성 향상
- **스크롤 인터랙션 및 마이크로 인터랙션 개발**
- **React Query를 활용한 캐싱 전략 수립**으로 불필요한 API 재호출 방지 및 성능 최적화
- **I18N을 사용한 다국어 처리** (ko, en)

## 기술적 도전

멀티 스텝 폼에서 인증 프로세스를 구현하면서 각 단계 간 상태 유지와 유효성 검사를 React Hook Form + Zod 조합으로 체계화하는 것이 핵심 과제였습니다.

멀티 스텝 폼의 가장 큰 도전은 각 단계의 독립적인 유효성 검사와 전체 폼의 통합 상태 관리를 양립시키는 것이었습니다. 사용자가 이전 단계로 돌아갔을 때 입력했던 데이터가 유지되어야 하고, 최종 제출 시에는 모든 단계의 데이터를 통합하여 검증해야 했습니다. 단계별로 Zod 스키마를 분리하되 최종 제출 시 전체 스키마로 병합하는 구조를 설계했습니다.

무한 스크롤 구현에서는 빠른 스크롤 시 불필요한 API 호출이 중복 발생하는 문제와, 뒤로 가기로 목록에 돌아왔을 때 이전 스크롤 위치를 복원해야 하는 과제가 있었습니다. React Query의 `useInfiniteQuery`로 페이지 단위 캐싱을 적용하고, Zustand에 마지막 스크롤 위치를 저장하여 복원하는 방식으로 해결했습니다.

## 기술적 의사결정 및 근거

### 아키텍처: React SPA vs Next.js SSR

**React SPA(Vite + React Router) 채택.** KPMG 홈페이지는 인증된 사용자만 접근하는 콘텐츠가 대부분이라 SEO가 중요하지 않았고, 고객사의 기존 인프라가 정적 파일 서빙에 맞춰져 있었습니다. Next.js SSR은 SEO와 초기 로딩에서 유리하지만, SSR 서버 운영 비용과 복잡성이 추가되는 대비 실질적 이점이 적었습니다. SPA는 CDN만으로 배포 가능하여 인프라 비용을 절감하면서도, 클라이언트 사이드 라우팅으로 앱과 유사한 빠른 네비게이션 UX를 제공할 수 있었습니다.

### 무한 스크롤: Intersection Observer vs Scroll Event

**Intersection Observer API 채택.** 전통적인 Scroll Event + Throttle 방식은 매 스크롤 이벤트마다 `scrollHeight`, `scrollTop`, `clientHeight`를 계산해야 하고, throttle을 적용하더라도 메인 스레드 부담이 있습니다. Intersection Observer는 비동기 관찰 방식으로 이 성능 문제를 근본적으로 해결하며, `rootMargin`으로 트리거 지점을 조절하여 사전 로딩도 가능합니다. 특히 게시판 목록에서 스크롤 인터랙션(애니메이션)과 무한 스크롤이 동시에 동작해야 했기 때문에, 두 기능이 스크롤 이벤트를 경쟁하지 않는 구조가 중요했습니다.

### 멀티 스텝 폼: 단계별 스키마 분리 설계

멀티 스텝 폼에서 각 단계의 독립적인 유효성 검사와 전체 폼의 통합 상태 관리를 양립시키는 것이 핵심 과제였습니다. 단일 React Hook Form 인스턴스로 모든 단계를 관리하면 단계 전환 시 상태가 자연스럽게 유지되지만, 현재 단계와 무관한 필드의 에러가 노출될 수 있고 스키마가 비대해지는 유지보수 문제가 발생합니다.

이를 해결하기 위해 단계별로 독립적인 Zod 스키마를 분리하되, 최종 제출 시 `z.merge`로 통합 검증하는 구조를 설계했습니다. 단계 전환 시에는 Zustand(persist 미들웨어)에 중간 데이터를 저장하여 브라우저 새로고침에도 데이터가 유지됩니다. 이 구조 덕분에 단계 추가/삭제/순서 변경이 용이하고, 에러 메시지도 현재 단계에 한정되어 사용자에게 명확한 피드백을 줄 수 있었습니다.

```typescript
// 멀티 스텝 폼: 단계별 Zod 스키마 분리 + Zustand 중간 저장
const step1Schema = z.object({ email: z.string().email(), verificationCode: z.string().length(6) });
const step2Schema = z.object({ company: z.string().min(1), department: z.string().min(1) });
const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Zustand persist로 새로고침에도 중간 데이터 유지
const useFormStore = create(persist((set) => ({
  currentStep: 0, formData: {},
  updateFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
}), { name: 'kpmg-form' }));
```

## 담당 기간

2024.05 - 2024.07 | 프론트엔드 개발 및 퍼블리싱 매니저
