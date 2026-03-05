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
    period: "지금 바로",
    goal: "작동하는 것 하나를 보여준다. 설득은 데모로 한다.",
    colorText: "text-indigo-500 dark:text-indigo-400",
    colorBorder: "border-indigo-500/20 dark:border-indigo-400/30",
    colorBg: "bg-indigo-500/5 dark:bg-indigo-400/5",
    items: [
      {
        num: "01",
        title: "AI 코드리뷰 파이프라인",
        desc: "PR 생성 → GitHub Actions → Claude API → PR 코멘트 자동 등록",
        detail: "SI QA 비용이 큰 구간을 AI가 1차 필터. PR당 리뷰 시간 Before/After로 수치 증명.",
      },
      {
        num: "02",
        title: "팀 프롬프트 라이브러리",
        desc: "형식: 상황 | 프롬프트 | 결과 | 검증자",
        detail: "Notion/GitHub Wiki에 공유 공간 개설. 첫 달 목표: 각자 3개씩 → 팀 전체 15개 이상.",
      },
      {
        num: "03",
        title: "Claude Code 페어 온보딩",
        desc: "팀원 1명씩 셋업 + 30분 페어 세션",
        detail: "현재 진행 중인 SI 업무 하나에 실제 적용 후 '써봤더니 이랬다' Notion 기록.",
      },
    ],
  },
  {
    phase: "Phase 1",
    label: "내재화",
    period: "1 – 3개월",
    goal: "개인 도구 사용 → 팀 워크플로우로 전환",
    colorText: "text-violet-500 dark:text-violet-400",
    colorBorder: "border-violet-500/20 dark:border-violet-400/30",
    colorBg: "bg-violet-500/5 dark:bg-violet-400/5",
    items: [
      {
        num: "04",
        title: "SI 산출물 AI 초안화",
        desc: "화면 설계서 · 테스트케이스 · API 명세 · 회의록",
        detail: "수정이 창작보다 빠르다. 초안 완성도 70% 이상이면 성공.",
      },
      {
        num: "05",
        title: "월 1회 AX 데모데이",
        desc: "발표 10분 + Q&A 5분, 팀원 순번제",
        detail: "'이번 달에 AI로 해본 것' — 뭘 했고, 어떻게 됐고, 다음엔 뭘 할 것인가.",
      },
      {
        num: "06",
        title: "AI 활용 수준 자가진단",
        desc: "Level 0 (미사용) → Level 4 (AI 없이 현재 속도 불가)",
        detail: "팀 기준선 설정 → 3개월 후 재측정. 남이 아닌 3개월 전의 나와 비교.",
      },
    ],
  },
  {
    phase: "Phase 2",
    label: "확장",
    period: "3 – 6개월",
    goal: "팀 안에서 증명한 것을 조직 밖으로 전파",
    colorText: "text-emerald-500 dark:text-emerald-400",
    colorBorder: "border-emerald-500/20 dark:border-emerald-400/30",
    colorBg: "bg-emerald-500/5 dark:bg-emerald-400/5",
    items: [
      {
        num: "07",
        title: "사내 AX 가이드 발행",
        desc: "'AI 써보고 싶은데 어디서 시작하지?'에 답하는 문서",
        detail: "추천 도구 + 실제 사례 + 주의사항(환각·보안·저작권). PDF 1장 Quick Start.",
      },
      {
        num: "08",
        title: "클라이언트 AI 기능 제안",
        desc: "기존 SI 프로젝트에 AI 연동 옵션 1개 추가 제안",
        detail: "챗봇 FAQ 자동화, 공문서 요약, Semantic Search 등. 제안서 통과 1건이 목표.",
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
