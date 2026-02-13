"use client";

import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {ExperienceTimeline} from "@/components/sections/experience-timeline";
import {ExperienceJourney} from "@/components/sections/experience-journey";
import type {TimelineItem} from "@/components/sections/experience-timeline";
import type {JourneyItem} from "@/data/constants/home";

interface ExperienceTabsProps {
  experiences: TimelineItem[];
  journeyItems: JourneyItem[];
}

/**
 * 경력 페이지 탭 컴포넌트.
 * Career(회사 경력)와 Journey(개발 여정) 탭으로 나누어 표시한다.
 */
export function ExperienceTabs({experiences, journeyItems}: ExperienceTabsProps) {
  return (
    <Tabs defaultValue="career" className="mt-8">
      <TabsList variant="line" className="w-full justify-start border-b border-border">
        <TabsTrigger value="career" className="text-base cursor-pointer">
          Career
        </TabsTrigger>
        <TabsTrigger value="journey" className="text-base cursor-pointer">
          Journey
        </TabsTrigger>
      </TabsList>

      <TabsContent value="career">
        <ExperienceTimeline items={experiences} />
      </TabsContent>

      <TabsContent value="journey">
        <div className="px-1 pt-8">
          <ExperienceJourney items={journeyItems} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
