---
title: "LG CNS 채용 솔루션 고도화"
description: "LG CNS 대상 채용 솔루션 프론트엔드 고도화. 레거시 인증 시스템 React 마이그레이션, Core Web Vitals 최적화, 400+ 폼 필드 렌더링 최적화를 수행했습니다."
tags: ["Next.js", "TypeScript", "React Hook Form", "Zod", "Zustand"]
year: 2025
featured: true
period: "2025.08 — 2026.02"
---

## 프로젝트 개요

LG CNS 대상 채용 솔루션의 프론트엔드를 고도화하는 프로젝트로, 매니저로서 개발을 리드했습니다. 레거시 인증 시스템의 모던 마이그레이션부터 대규모 폼 시스템 최적화까지 전반적인 프론트엔드 품질 향상을 담당했습니다.

## 주요 성과

- **레거시 인증 시스템 React 마이그레이션**: PASS 인증 및 Nice 본인인증 모듈을 React로 전환하여 유지보수성 향상
- **Google Core Web Vitals 최적화 달성**: 랜딩 페이지 LCP 평균 2000ms 이하 유지, 입력 필드 INP 150ms 이하 달성
- **대규모 폼 필드 최적화**: 400여 개 채용 관련 폼 필드 렌더링 최적화로 기존 솔루션 대비 리렌더링 횟수 대폭 절감
- **고객사 맞춤 채용 플로우 구현**: 사용자 화면을 고객사별 채용 프로세스에 맞춰 수정 및 코드 구조 리팩토링
- **React Hook Form + Zod 조합**으로 폼 검증 로직 체계화 및 타입 안전성 확보

## 기술적 도전

400개가 넘는 채용 관련 폼 필드를 한 화면에서 효율적으로 관리하면서 Core Web Vitals를 준수하는 것이 핵심 과제였습니다. React Hook Form의 비제어 컴포넌트 패턴과 Zod 스키마 기반 검증을 결합하여 리렌더링을 최소화하고, 타입 안전한 폼 시스템을 구축했습니다.

특히 채용 솔루션 특성상 고객사마다 폼 필드 구성이 다르고, 조건부 필드(특정 답변에 따라 추가 필드가 노출되는 구조)가 많아 단순한 폼 라이브러리 적용만으로는 해결할 수 없었습니다. 필드 간 의존 관계를 Zod의 `refine`과 `superRefine`으로 선언적으로 정의하고, `useWatch`를 통해 특정 필드만 구독하여 조건부 렌더링의 리렌더 범위를 최소화했습니다.

레거시 인증 시스템(PASS, Nice 본인인증)은 jQuery 기반의 팝업 방식으로 동작하고 있었으며, React의 생명주기와 충돌하는 문제가 빈번했습니다. 전역 콜백 함수에 의존하는 기존 구조를 Promise 기반으로 래핑하고, React의 상태 관리와 자연스럽게 연동되도록 커스텀 훅으로 추상화하여 해결했습니다.

## 기술적 의사결정 및 근거

### 폼 라이브러리: React Hook Form + Zod vs Formik + Yup

**React Hook Form + Zod 채택.** 400개 이상의 폼 필드를 가진 채용 솔루션에서 비제어(uncontrolled) 컴포넌트 방식의 React Hook Form은 선택이 아닌 필수였습니다. Formik의 제어(controlled) 방식은 프로토타입 테스트에서 필드 50개부터 INP 300ms 이상의 지연이 발생한 반면, React Hook Form은 400개 필드에서도 INP 150ms 이하를 유지했습니다. Zod의 TypeScript-first 설계로 스키마에서 타입을 자동 추론(`z.infer<typeof schema>`)할 수 있어 Yup 대비 타입 안전성도 우수했습니다.

```typescript
// React Hook Form + Zod: 비제어 방식으로 400+ 필드 최적화
const schema = z.object({
  personalInfo: z.object({ name: z.string().min(1), phone: z.string().regex(/.../) }),
  education: z.array(z.object({ school: z.string(), major: z.string() })),
  // ... 400+ 필드가 중첩 객체로 구성
}).superRefine((data, ctx) => { /* 필드 간 교차 검증 */ });

// useWatch로 조건부 필드만 구독 → 리렌더 범위 격리
const employmentType = useWatch({ control, name: 'employmentType' });
```

### 상태 관리: Zustand vs Redux Toolkit vs Recoil

**Zustand 채택.** 폼 상태는 React Hook Form이 전담하고, 인증 토큰, 사용자 정보, 채용 단계 등의 글로벌 상태만 Zustand로 관리하는 구조를 선택했습니다. Redux Toolkit은 미들웨어, 시간 여행 디버깅 등 강력한 생태계가 있지만 이 프로젝트 규모에서는 과도했고, Recoil은 React Hook Form과 역할이 중복되었습니다. 결정적으로, 레거시 PASS 인증 콜백이 React 트리 외부에서 실행되기 때문에 Zustand의 `getState()`/`setState()`로 React 외부에서 상태를 직접 조작할 수 있는 점이 필수 요건이었습니다.

### 레거시 인증 마이그레이션: 점진적 전환 전략

채용 솔루션은 지원 기간이 정해져 있어 서비스 중단이 절대 허용되지 않는 환경이었습니다. jQuery 기반의 PASS/Nice 인증 모듈을 React로 전환할 때, 일괄 전환 방식은 인증 실패 시 채용 접수 자체가 불가능해지는 치명적 리스크가 있었습니다.

이에 따라 점진적 전환 전략을 채택했습니다. 먼저 기존 jQuery 인증 모듈의 전역 콜백 구조를 Promise로 래핑하는 어댑터 레이어를 구축하고, 이를 React 커스텀 훅(`usePassAuth`, `useNiceAuth`)으로 추상화하여 점진적으로 교체했습니다. 전환 기간 동안 레거시와 신규 모듈이 공존하면서 기존 인증 플로우가 정상 동작했고, 전환 완료 후 어댑터 레이어를 제거하여 최종 정리를 수행했습니다.

## 담당 기간

2025.08 - 2026.02 | 프론트엔드 개발 매니저
