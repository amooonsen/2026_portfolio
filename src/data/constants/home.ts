/** 메인 페이지 팀 철학 데이터 */
export interface Philosophy {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export const philosophies: Philosophy[] = [
  {
    number: "01",
    title: "선험(先驗) — 먼저 해본 사람이 말한다",
    description:
      "AI 도구, 자동화 워크플로우, 새로운 패러다임. 조직이 '검토해봐'라고 하기 전에 우리는 이미 써보고 있어야 한다. 경험 없는 의견은 의견이 아니다.",
    details: [
      "도구는 써봐야 안다 — 아티클은 정보, 실적용이 경험",
      "먼저 실험하고, 결과로 말한다",
      "AI를 기획·디자인·개발 전 영역에 선적용",
    ],
  },
  {
    number: "02",
    title: "실행 우선 (Execution First)",
    description:
      "완벽한 계획보다 불완전한 실행이 낫다. MVP를 만들어 보여주고, 작동하는 것으로 대화한다. '이런 게 가능합니다'가 아닌 '이게 작동합니다'로 말한다.",
    details: [
      "작게 시작하고, 빠르게 검증하고, 담대하게 확장",
      "작동하는 데모가 백 마디 말보다 강하다",
      "설득은 PT가 아닌 결과물로 한다",
    ],
  },
  {
    number: "03",
    title: "조용한 영향력 (Silent Influence)",
    description:
      "우리의 목표는 주목이 아니다. 함께 일한 팀이 '이 방식으로 하면 더 빠르네'라고 느끼게 만드는 것. 소음 없이 기준을 바꾸는 것이 진짜 영향력이다.",
    details: [
      "변화는 선언이 아닌 경험으로 전파된다",
      "프로세스에 녹아드는 방식으로 영향을 준다",
      "조직의 일하는 기준을 조용히 높인다",
    ],
  },
  {
    number: "04",
    title: "AI는 대체재가 아닌 증폭기",
    description:
      "AI가 나를 대신하는 것이 두렵다면, AI를 쓰는 사람에게 자리를 빼앗길 것이다. 우리는 AI와 함께 이전에는 불가능했던 것을 만드는 팀이다.",
    details: [
      "f(problem) = value — AI로 가속된 실제 결과물",
      "기획·디자인·개발·자동화 전 영역에서 AI를 증폭기로",
      "도구는 수단, 목적은 더 큰 가치의 창출",
    ],
  },
  {
    number: "05",
    title: "AI는 파트너 — 판단은 내가 한다",
    description:
      "AI는 강력한 파트너이지만 주객이 전도되어서는 안 된다. AI의 출력은 참고 자료다. 그 답이 맞는지 틀린지를 판단하는 것은 여전히 우리의 몫이다.",
    details: [
      "AI 출력을 검증하고 최적화하는 것이 핵심 역량",
      "사실 확인을 넘어 신념까지 AI에 맡기지 않는다",
      "AI를 잘 쓰는 동시에, 없이도 사고할 수 있는 팀",
    ],
  },
  {
    number: "06",
    title: "문서화는 자산이다",
    description:
      "경험은 공유되어야 자산이 된다. 시도한 것, 실패한 것, 성공한 것 — 모두 기록한다. 팀의 지식은 개인의 머릿속이 아닌 공유된 공간에 있어야 한다.",
    details: [
      "실패 기록이 팀의 가장 값진 성장 자산",
      "반복 실수를 막는 가장 확실한 방법은 기록",
      "지식 공유로 팀 전체의 수준이 올라간다",
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
    title: "입사",
    description: "이트라이브 입사 후 퍼블리셔로써 첫 커리어를 시작했습니다!",
  },
  {
    year: "2022",
    title: "전문적인 UI 스크립터로",
    description: "",
  },
  {
    year: "2024",
    title: "프론트엔드 개발을 하다",
    description: "",
  },
  {
    year: "2025",
    title: "AI 솔루션 리드 — 전환점",
    description:
      "AI CARAMEL. 실제 운영 고객사에 도입 후 유저 피드백 수집 후 고도화를 했습니다. 이제는 제품화 준비 중!",
  },
  {
    year: "2026",
    title: "AX Force — 이제는 새로운 팀에서",
    description:
      "기존 SI 업무를 넘어 AI 선적용 실험 조직 AX Force에 합류했습니다. 함께 만들어가길 바랍니다 :)",
  },
];
