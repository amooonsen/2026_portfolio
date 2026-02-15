# 2026 포트폴리오 — 앞으로 할 작업 목록

> 기준일: 2026년 2월 15일
> 브랜치: `dev` (활성 개발)
> 현재 상태: 핵심 기능 구현 완료, 배포 준비 단계

---

## ~~1. Notion API 연동 마무리~~ ✅ 완료

코드 구현 완료 + 노션 설정 완료. DB에 Integration 연결 필요.

- [x] Integration 생성 + 토큰 발급
- [x] 데이터베이스 속성 설계
- [x] 샘플 프로젝트 1개 등록
- [ ] DB에 Integration 연결 (노션 페이지 → `...` → "연결" → `portfolio-api`)
- [ ] 나머지 프로젝트 데이터 마이그레이션 (11개)
- [ ] Notion fetch 정상 동작 검증
- [ ] 안정화 후 `gray-matter` 제거 + `content/projects/` 삭제

---

## ~~2. 배포~~ ✅ 완료

---

## ~~3. SEO 마무리~~ ✅ 완료

---

## ~~4. CI/CD 파이프라인~~ ✅ 완료

- [x] `.github/workflows/ci.yml` 생성 (PR/push 시 build + lint)
- [ ] `main` 브랜치 보호 규칙 설정 (force push 금지, PR 필수)

---

## 5. 콘텐츠 보완 (중간)

### 5-1. 프로젝트 콘텐츠
- [ ] 각 프로젝트 썸네일 이미지 제작/촬영
- [ ] 프로젝트 갤러리 이미지 추가
- [x] ~~`sample-project.md` 제거~~
- [ ] 프로젝트 설명 텍스트 다듬기

### 5-2. 블로그 연동
- [ ] 외부 블로그 URL 확정 (Tistory, Velog 등)
- [ ] `navItems`에 블로그 링크 활성화 (현재 주석 처리)
- [ ] Footer 소셜 링크에 블로그 추가

### 5-3. 프로필 이미지
- [ ] 실제 프로필 사진 교체 (현재 placeholder 가능성)
- [ ] 이미지 최적화 (WebP/AVIF)

---

## ~~6. 코드 품질 개선~~ ✅ 완료

- [x] React Compiler 경고 전체 수정 (22 errors → 0)
  - `useSyncExternalStore` 전환 (theme-toggle, use-media-query, use-reduced-motion, page-end-celebration)
  - 결정적 값으로 Math.random 대체 (contact-success)
  - Three.js/GSAP 불가피 패턴에 eslint-disable 적용 (cosmic-scene, celebration-scene)
  - 미사용 import 정리 (footer, experience-journey)
  - HTML entity 치환 (page.tsx)
- [x] `npm run lint` → 0 에러, 0 경고
- [ ] Prettier 설정 파일 추가 (`.prettierrc`)
- [ ] `husky` + `lint-staged` 설치 (pre-commit hook)

---

## 7. 성능 최적화 (낮음)

### 7-1. 이미지 최적화
- [ ] 프로젝트 썸네일 CDN 이미지 사용 검토
- [ ] `next/image` 적용 범위 확인 (모든 이미지에 sizes 속성)

### 7-2. 번들 사이즈
- [ ] `@next/bundle-analyzer` 추가하여 번들 분석
- [ ] Three.js tree-shaking 최적화 확인

### 7-3. 웹 바이탈
- [ ] Lighthouse CI 점수 측정 (LCP, FID, CLS)
- [ ] Core Web Vitals 목표 설정 및 최적화

---

## ~~8. 보안 점검~~ ✅ 완료

- [x] `.env.development` → placeholder 값만 유지
- [x] 실제 자격 증명 `.env.local`로 이동
- [ ] Contact 폼 rate limiting 검토 (Server Action 수준)
- [ ] CSP(Content Security Policy) 헤더 추가 검토
- [ ] `npm audit` 취약점 확인 및 수정

---

## 9. 접근성 보강 (낮음)

- [ ] 전체 페이지 키보드 내비게이션 테스트
- [ ] 스크린 리더 테스트 (VoiceOver)
- [ ] 색상 대비 WCAG AA 전수 검사
- [ ] `prefers-reduced-motion` 시 모든 애니메이션 비활성화 확인
- [ ] Three.js 캔버스에 대체 텍스트/설명 추가

---

## 10. 추후 기능 (보류)

### 10-1. Career 탭 활성화
- 현재 `showCareerTab = false`로 숨김 처리
- 경력 데이터가 충분히 쌓이면 활성화
- 관련 코드 절대 삭제 금지 (CLAUDE.md 지침)

### 10-2. /about 독립 페이지
- 현재 소개 콘텐츠는 메인 페이지에 통합
- 콘텐츠가 풍부해지면 독립 `/about` 라우트 분리 검토
- CLAUDE.md 라우트 구조에는 명시되어 있으나 현재 미구현

### 10-3. 다국어 지원
- 현재 한국어 + 영어 혼용
- next-intl 등으로 완전 다국어 전환 검토

### 10-4. 다크/라이트 모드 미세 조정
- 라이트 모드에서 Three.js 씬 색상 최적화
- 라이트 모드 전용 그라디언트 개선

---

## 우선순위 요약

| 우선순위 | 작업 | 상태 |
|----------|------|------|
| ~~높음~~ | ~~Notion API 연동~~ | ✅ (DB 연결 + 마이그레이션 남음) |
| ~~높음~~ | ~~Vercel 배포 + 도메인~~ | ✅ |
| ~~높음~~ | ~~SEO 마무리~~ | ✅ |
| ~~중간~~ | ~~CI/CD 파이프라인~~ | ✅ |
| ~~중간~~ | ~~ESLint + 코드 품질~~ | ✅ (Prettier/husky 남음) |
| ~~낮음~~ | ~~보안 점검~~ | ✅ (rate limit/CSP 남음) |
| **중간** | 프로젝트 콘텐츠 보완 | 진행 필요 |
| **중간** | 블로그 연동 | URL 미확정 |
| **낮음** | 번들 분석 + 성능 최적화 | 미착수 |
| **낮음** | 접근성 전수 테스트 | 미착수 |
| **보류** | Career 탭 활성화 | 경력 확보 후 |
| **보류** | /about 독립 페이지 | 콘텐츠 확보 후 |
