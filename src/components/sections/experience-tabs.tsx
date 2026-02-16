"use client";

import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {ExperienceTimeline} from "@/components/sections/experience-timeline";
import {ExperienceJourney} from "@/components/sections/experience-journey";
import type {JourneyItem} from "@/data/constants/home";

interface ExperienceTabsProps {
  journeyItems: JourneyItem[];
}

/**
 * 경력 페이지 탭 컴포넌트.
 * Career(회사 경력)와 Journey(개발 여정) 탭으로 나누어 표시한다.
 *
 * ⚠️ [절대 삭제 금지] Career 탭과 ExperienceTimeline 관련 코드를 삭제하지 마세요.
 * 현재 Career 탭은 히든 처리되어 있으나, 추후 경력이 쌓이면 다시 활성화합니다.
 */
export function ExperienceTabs({journeyItems}: ExperienceTabsProps) {
  // Career 탭 활성화 플래그 — true로 변경하면 Career 탭이 다시 표시됩니다
  const showCareerTab = false;

  return (
    <Tabs defaultValue="journey" className="mt-8">
      {showCareerTab && (
        <TabsList variant="line" className="w-full justify-start border-b border-border">
          <TabsTrigger value="career" className="text-base cursor-pointer">
            Career
          </TabsTrigger>
          <TabsTrigger value="journey" className="text-base cursor-pointer">
            Journey
          </TabsTrigger>
        </TabsList>
      )}

      {/* ⚠️ [절대 삭제 금지] Career 컨텐츠 — showCareerTab이 false면 렌더링되지 않음 */}
      {showCareerTab && (
        <TabsContent value="career">
          <ExperienceTimeline />
        </TabsContent>
      )}

      <TabsContent value="journey">
        <div className="px-1 pt-8">
          <ExperienceJourney items={journeyItems} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
