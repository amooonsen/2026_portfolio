/** 메인 페이지 개발 철학 데이터 */
export interface Philosophy {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export const philosophies: Philosophy[] = [
  {
    number: "01",
    title: "사용자 중심 설계",
    description:
      "기술보다 사용자를 먼저 생각합니다. 모든 인터페이스는 사용자가 목적을 달성하는 데 집중할 수 있도록 직관적이어야 합니다. 접근성과 사용성을 기반으로 한 설계를 추구합니다.",
    details: [
      "WCAG 2.1 AA 기준 접근성 준수",
      "사용자 여정 기반 UI 설계",
      "키보드 네비게이션, 스크린 리더 지원",
    ],
  },
  {
    number: "02",
    title: "견고한 코드",
    description:
      "읽기 쉽고 유지보수 가능한 코드를 추구합니다. TypeScript의 타입 안전성, 충분한 테스트 커버리지, 일관된 코딩 컨벤션으로 팀 전체의 생산성을 높입니다.",
    details: [
      "TypeScript strict mode 기반 타입 안전성",
      "단위·통합·E2E 테스트 자동화",
      "ESLint, Prettier로 일관된 컨벤션 유지",
    ],
  },
  {
    number: "03",
    title: "성능 최적화",
    description:
      "빠른 로딩과 부드러운 인터랙션은 좋은 사용자 경험의 기본입니다. Core Web Vitals를 기준으로 측정 가능한 성능 개선을 추구하며, 번들 사이즈와 렌더링 최적화에 집중합니다.",
    details: [
      "코드 스플리팅과 Lazy loading 전략",
      "이미지 최적화 (WebP/AVIF, 반응형)",
      "Lighthouse 기반 정량적 성능 관리",
    ],
  },
  {
    number: "04",
    title: "디자인 시스템",
    description:
      "일관된 사용자 경험의 기반은 체계적인 디자인 시스템입니다. 재사용 가능한 컴포넌트와 토큰 기반 스타일링으로 개발 속도와 디자인 일관성을 동시에 달성합니다.",
    details: [
      "Atomic Design 기반 컴포넌트 계층 설계",
      "디자인 토큰으로 색상·타이포·간격 표준화",
      "Storybook 기반 컴포넌트 문서화와 시각 테스트",
    ],
  },
  {
    number: "05",
    title: "협업과 소통",
    description:
      "좋은 코드는 혼자 만들 수 없습니다. 명확한 코드 리뷰, 기술 문서 작성, 디자이너와의 원활한 소통으로 팀의 시너지를 극대화합니다. 지식 공유를 통해 함께 성장합니다.",
    details: [
      "PR 기반 코드 리뷰 문화 정착",
      "ADR(Architecture Decision Records) 운영",
      "디자인-개발 핸드오프 프로세스 최적화",
    ],
  },
  {
    number: "06",
    title: "지속적 학습",
    description:
      "빠르게 변화하는 프론트엔드 생태계에서 새로운 기술과 패턴을 꾸준히 학습합니다. 실무에 적용 가능한 기술을 선별하여 팀에 공유하고 함께 성장합니다.",
    details: [
      "기술 블로그 운영과 사내 세미나 발표",
      "오픈소스 프로젝트 기여 및 분석",
      "새로운 프레임워크와 도구 PoC 수행",
    ],
  },
];

/** 관련 프로젝트 링크 */
export interface JourneyProject {
  slug: string;
  name: string;
}

/** 메인 페이지 개발 여정 데이터 */
export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  /** 관련 프로젝트 링크 */
  projects?: JourneyProject[];
}

export const journeyItems: JourneyItem[] = [
  {
    year: "2021",
    title: "입사 & 데이터 시각화",
    description:
      "이트라이브에 입사하여 RISE ETF 데이터 시각화 프로젝트를 담당했습니다. Amcharts로 5종 이상의 차트를 설계하고, WCAG 2.1 가이드라인을 적용하여 웹 접근성 인증 마크를 획득했습니다.",
    projects: [{slug: "rise-etf", name: "RISE ETF"}],
  },
  {
    year: "2022",
    title: "엔터프라이즈 프론트엔드",
    description:
      "메리츠화재, 호텔롯데, 삼성카드, 이트라이브 자사 홈페이지 등 대형 고객사 프로젝트를 연달아 수행했습니다. 레거시 코드 리팩토링과 비즈니스 로직 모듈화를 통해 코드 품질을 개선하고, GSAP·Lottie.js 기반 인터랙션 구현 및 Lerp 기반 스무스 스크롤 엔진을 자체 설계했습니다.",
    projects: [
      {slug: "meritz-fire", name: "메리츠화재"},
      {slug: "hotel-lotte", name: "호텔롯데"},
      {slug: "samsungcard-platform", name: "삼성카드"},
      {slug: "etribe-homepage", name: "이트라이브"},
    ],
  },
  {
    year: "2023",
    title: "웹뷰 & 크로스 플랫폼",
    description:
      "래미안 홈플랫폼 홈닉의 Vue.js 기반 웹뷰를 개발하며 네이티브 앱과의 통신 인터페이스를 구축했습니다. Chart.js로 관리비 데이터를 시각화하고, iOS/Android 크로스 플랫폼 호환성을 확보했습니다.",
    projects: [{slug: "raemian-homenic", name: "래미안 홈닉"}],
  },
  {
    year: "2024",
    title: "FE 리드 & AI 솔루션",
    description:
      "사내 스타트업 AI CARAMEL의 FE/BE를 리드하여 삼성·롯데 대상 AI 분석 통합 솔루션을 개발했습니다. Next.js 기반 대시보드 아키텍처 설계, Supabase·Fastify 백엔드 연동, n8n 자동화 파이프라인 구축까지 End-to-End로 수행했습니다.",
    projects: [
      {slug: "ai-caramel", name: "AI CARAMEL"},
      {slug: "funetf-charts", name: "FunETF"},
      {slug: "kpmg-homepage", name: "KPMG"},
    ],
  },
  {
    year: "2025",
    title: "성능 최적화 & 대규모 시스템",
    description:
      "LG CNS 채용 솔루션 고도화 프로젝트에서 Core Web Vitals 최적화(LCP 2000ms 이하, INP 150ms 이하)를 달성하고, 400+ 폼 필드 렌더링 최적화 및 레거시 인증 시스템 마이그레이션을 수행하며 대규모 엔터프라이즈 시스템에서의 프론트엔드 전문성을 심화했습니다.",
    projects: [{slug: "lgcns-recruitment", name: "LG CNS 채용 솔루션"}],
  },
];
