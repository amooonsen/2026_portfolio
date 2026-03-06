import {Section} from "@/components/ui/section";
import {GradientText} from "@/components/ui/gradient-text";
import {FadeIn} from "@/components/animation/fade-in";
import {StaggerChildren} from "@/components/animation/stagger-children";
import {GlassCard} from "@/components/ui/glass-card";
import {cn} from "@/lib/utils";

interface ActionItem {
  num: string;
  title: string;
  desc: string;
  detail?: string;
}

interface Phase {
  phase: string;
  label: string;
  period: string;
  goal: string;
  colorText: string;
  colorBorder: string;
  colorBg: string;
  items: ActionItem[];
}

const phases: Phase[] = [
  {
    phase: "Phase 0",
    label: "Quick Win",
    period: "이미 하고 있다",
    goal: "선언보다 먼저 움직였다. 지금 작동 중인 것들이 우리의 설득이다.",
    colorText: "text-indigo-500 dark:text-indigo-400",
    colorBorder: "border-indigo-500/20 dark:border-indigo-400/30",
    colorBg: "bg-indigo-500/5 dark:bg-indigo-400/5",
    items: [
      {
        num: "01",
        title: "AI CARAMEL",
        desc: "운영 데이터를 자동으로 분석 → 의사결정과 실행 속도를 증가 → 운영 효율과 품질 증가",
        detail: "제안 장표로 실전 활용 중. '이미 써봤다'가 우리의 가장 강한 설득 도구.",
      },
      {
        num: "02",
        title: "제안서 자동화 (ing)",
        desc: "요구사항 입력 → AI 초안 생성 → 팀 검토 → 완성본 출력",
        detail: "반복되는 제안서 작성 시간을 절반으로. 창작보다 수정이 빠르다.",
      },
      {
        num: "03",
        title: "GEO 고도화",
        desc: "SEO → GEO: AI 검색 엔진이 브랜드를 인식하는 콘텐츠 구조 설계",
        detail: "ChatGPT·Perplexity·Claude가 브랜드를 언급하게 만드는 것이 다음 SEO다.",
      },
    ],
  },
  {
    phase: "Phase 1",
    label: "전 영역 내재화",
    period: "1 – 3개월",
    goal: "기획·디자인·개발·출시 전 단계에 AI가 흐른다",
    colorText: "text-violet-500 dark:text-violet-400",
    colorBorder: "border-violet-500/20 dark:border-violet-400/30",
    colorBg: "bg-violet-500/5 dark:bg-violet-400/5",
    items: [
      {
        num: "04",
        title: "기획·제안 AI 파이프라인",
        desc: "수주 전 제안서 → 요구사항 분석 → WBS 초안 → 유사 프로젝트 레퍼런스 검색",
        detail:
          "Phase 0 제안서 자동화와 연결. SLLM RAG로 과거 프로젝트에서 유사 케이스를 5초 안에 찾는다.",
      },
      {
        num: "05",
        title: "SI 핵심 산출물 AI 초안화",
        desc: "화면설계서 · 테스트케이스 · API 명세 · 회의록 → AI가 70% 완성도로 초안 생성",
        detail: "수정이 창작보다 빠르다. 처음부터 만드는 시간 → 검토하고 정교화하는 시간으로.",
      },
      {
        num: "06",
        title: "납품·검수 AI 자동화",
        desc: "QA 시나리오 자동 생성 → 납품 산출물 체크리스트 → 검수 리포트 초안",
        detail:
          "납품 직전이 가장 피로도가 높다. AI가 반복 검수 항목을 처리하면 팀은 품질 판단에만 집중.",
      },
    ],
  },
  {
    phase: "Phase 2",
    label: "확장",
    period: "3개월 - 이후",
    goal: "사내 SLLM을 기반으로 — 조직 내 AI 인프라를 만들고, 클라이언트 가치로 전환한다",
    colorText: "text-emerald-500 dark:text-emerald-400",
    colorBorder: "border-emerald-500/20 dark:border-emerald-400/30",
    colorBg: "bg-emerald-500/5 dark:bg-emerald-400/5",
    items: [
      {
        num: "07",
        title: "SLLM 사내 RAG 시스템",
        desc: "사내 SLLM + 문서·프로젝트 히스토리 연결 → 자연어로 사내 지식 검색",
        detail:
          "외부 API 없이 보안 유지. '이 프로젝트 전에 비슷한 거 했었나?' 를 AI가 5초 안에 답한다.",
      },
      {
        num: "08",
        title: "SLLM 클라이언트 온프레미스 패키지",
        desc: "보안 민감 클라이언트에게 외부 데이터 유출 없는 AI 솔루션 제안",
        detail: "AI CARAMEL 검증 사례 + SLLM 온프레미스 = 금융·공공·의료 클라이언트 대응 가능.",
      },
      {
        num: "09",
        title: "AX 실험 로그 공개",
        desc: "수치 기반 사례를 사내 채널에 월 1회 공유",
        detail: "'이렇게 했더니 30% 빨라졌다' — AX = 실제로 해본 팀이라는 인식 정착.",
      },
    ],
  },
];

const principles = [
  "실제 업무에 적용하지 않은 것은 배운 것이 아니다",
  "작게 시작하고, 빠르게 검증하고, 담대하게 확장한다",
  "도구는 수단이고, 목적은 결과다",
  "혼자 막히면 24시간 안에 물어본다",
];

/**
 * AX Capabilities 섹션.
 * 기술 스택 나열이 아닌, AX FORCE의 실행 방법론과 로드맵을 보여준다.
 */
export function AxCapabilities() {
  return (
    <Section spacing="lg" container>
      <FadeIn>
        <GradientText as="h2" gradient="primary" className="text-3xl font-bold">
          AX Capabilities
        </GradientText>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-foreground/80">
            <span className="text-accent-highlight">선언은 실행이 없으면 죽은 단어 입니다.</span>
            <br />
            우리가 당장 시작하고 끝낼 수 있는 일 들을 찾아야 합니다.
          </p>
        </FadeIn>
      </FadeIn>

      {/* 3 Phase 로드맵 */}
      <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-3" aria-label="AX 실행 로드맵">
        {phases.map((phase) => (
          <div
            key={phase.phase}
            className={cn(
              "rounded-2xl border p-6 backdrop-blur-xl",
              "bg-glass-bg",
              phase.colorBorder,
            )}
          >
            {/* 페이즈 헤더 */}
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <span className={cn("font-mono text-xs font-semibold", phase.colorText)}>
                  {phase.phase}
                </span>
                <span className="text-xs text-muted-foreground">{phase.period}</span>
              </div>
              <h3 className={cn("mt-1 text-lg font-bold", phase.colorText)}>{phase.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{phase.goal}</p>
            </div>

            {/* 액션 아이템 */}
            <ul className="space-y-4">
              {phase.items.map((item) => (
                <li key={item.num} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 font-mono text-xs font-semibold",
                      phase.colorText,
                    )}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground/80">{item.desc}</p>
                    {item.detail && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </StaggerChildren>

      {/* 철칙 */}
      <FadeIn delay={0.3}>
        <div className="mt-10 border-t border-glass-border pt-8">
          <p className="font-mono text-xs font-semibold text-muted-foreground">
            철칙 (Operating Principles)
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo/60"
                  aria-hidden="true"
                />
                <p className="text-sm text-foreground/70">{principle}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Section>
  );
}
