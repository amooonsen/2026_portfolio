import {Fragment} from "react";
import {Section} from "@/components/ui/section";
import {ExperienceTabs} from "@/components/sections/experience-tabs";
import {ExperienceProfile} from "@/components/sections/experience-profile";
import {PageHeader, PageHeaderHighlight} from "@/components/sections/page-header";
import {journeyItems} from "@/data/constants/home";
import {createMetadata} from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Experience",
  description:
    "조경문의 4년 프론트엔드 개발 경력입니다. 삼성, 롯데, LG CNS 등 대형 고객사 프로젝트 경험을 확인하세요.",
  path: "/experience",
});

/**
 * Experience 페이지.
 * Career(회사 경력)와 Journey(개발 여정)를 탭으로 나누어 표시한다.
 */
export default function ExperiencePage() {
  return (
    <Section spacing="lg" container>
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
        <div className="shrink-0">
          <ExperienceProfile />
        </div>

        <PageHeader
          title="Experience"
          description={[
            <Fragment key="line-1">
              4년간{" "}
              <PageHeaderHighlight>삼성, 롯데, LG CNS</PageHeaderHighlight> 등 대형 SI
              프로젝트에서 프론트엔드 개발을 맡아왔습니다.
            </Fragment>,
            <Fragment key="line-2">
              2024년부터{" "}
              <PageHeaderHighlight>AI 기반 솔루션 개발을 리드</PageHeaderHighlight>하며
              기획·개발·자동화를 아우르는 역할로 확장했습니다.
            </Fragment>,
            <Fragment key="line-3">
              이 경험들이{" "}
              <PageHeaderHighlight>AX Force</PageHeaderHighlight>에서 실험하고 증명하는
              토대가 됩니다.
            </Fragment>,
          ]}
        />
      </div>

      <ExperienceTabs journeyItems={journeyItems} />
    </Section>
  );
}
