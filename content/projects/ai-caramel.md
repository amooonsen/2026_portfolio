---
title: "AI CARAMEL"
description: "삼성, 롯데 등 대형 고객사 대상 AI Insight + 사이트 모니터링 + GA 분석 통합 솔루션. 사내 스타트업으로 FE & BE 개발을 리드했습니다."
tags: ["Next.js", "TypeScript", "Zustand", "Supabase", "Fastify", "n8n"]
year: 2024
featured: true
---

## 프로젝트 개요

사내 스타트업 프로젝트로, 대형 고객사(삼성, 롯데 등) 대상 AI Insight + 사이트 모니터링 + GA 분석 통합 솔루션의 FE & BE 개발을 매니저로서 리드했습니다.

## 주요 성과

- **대형 고객사 대상 통합 솔루션 FE 리드**: 삼성, 롯데 등 대형 고객사 대상 AI Insight + 사이트 모니터링 + GA 분석 통합 솔루션 개발
- **n8n workflow + AI Agent 활용**: Supabase 연동 자동화 데이터 처리 파이프라인 구축
- **Next.js 기반 대시보드 및 분석 인터페이스** 전체 설계 및 구현
- **현업 대응**: 대형 고객사와의 협업 과정에서 현업 피드백을 반영하여 요구사항을 신속히 개선
- **비즈니스 성과 기여**: 고객사 제안 수주 성공에 기술적 근거 및 데모 제공으로 기여
- **Supabase Realtime 활용** 실시간 모니터링 데이터 동기화 구현

## 기술적 도전

n8n workflow와 AI Agent를 결합하여 데이터 수집부터 분석까지 자동화된 파이프라인을 구축하는 것이 핵심 과제였습니다. Supabase Realtime을 활용하여 모니터링 데이터를 실시간으로 동기화하고, Next.js 기반 대시보드에서 직관적인 분석 인터페이스를 제공했습니다.

사내 스타트업 특성상 초기에는 요구사항이 유동적이었고, 고객사 미팅에서 새로운 기능 요청이 빈번했습니다. 빠른 프로토타이핑과 안정적인 서비스 운영을 동시에 충족해야 했기 때문에, BaaS(Backend as a Service)를 적극 활용하여 인프라 관리 부담을 최소화하는 전략을 취했습니다.

실시간 데이터 동기화에서는 다수의 고객사 데이터가 동시에 업데이트되는 상황에서 구독 채널 관리와 메모리 누수 방지가 중요했습니다. 컴포넌트 언마운트 시 구독을 정리하고, 채널별로 독립적인 에러 핸들링을 구현하여 한 고객사의 데이터 오류가 다른 고객사 대시보드에 영향을 주지 않도록 격리했습니다.

## 기술적 의사결정 및 근거

### 백엔드 인프라: Supabase vs Firebase vs 자체 PostgreSQL

**Supabase 채택.** 고객사-프로젝트-모니터링 데이터 간 관계형 모델링이 필수적이었기에 NoSQL 기반 Firebase는 부적합했고, 2인 개발팀 규모의 사내 스타트업에서 자체 PostgreSQL + WebSocket 서버의 인프라 관리까지 감당하기 어려웠습니다. Supabase는 PostgreSQL의 강력한 관계형 쿼리와 BaaS의 생산성을 동시에 제공했습니다. 특히 RLS(Row Level Security) 기반 멀티테넌트 구조로 별도 권한 로직 없이 고객사별 데이터 격리를 DB 레벨에서 보장할 수 있었습니다.

### API 서버: Fastify vs Express

**Fastify 채택.** AI Agent에서 대량의 분석 결과를 JSON으로 전달받아 처리하는 워크플로우에서 Fastify의 JSON 직렬화 성능(Express 대비 약 2배, fast-json-stringify 내장)과 스키마 기반 유효성 검사가 실질적인 이점이었습니다. Express는 가장 넓은 생태계를 보유하지만, n8n 웹훅 데이터 검증을 위해 별도 라이브러리가 필요하고, 타입 안전성에서 열세였습니다. Fastify의 TypeScript-first 설계 덕분에 프론트엔드 팀이 백엔드 코드를 이해하고 기여하기 수월했습니다.

### 워크플로우 자동화: n8n vs 커스텀 워크플로우 엔진

**n8n(자체 호스팅) 채택.** 커스텀 엔진(Bull Queue + Node.js)은 완전한 로직 제어가 가능하지만, 워크플로우 시각화 UI, 에러 핸들링, 재시도 로직, 모니터링을 모두 직접 구현해야 하는 부담이 있었습니다. n8n의 비주얼 에디터는 비개발자(기획자, PM)도 워크플로우를 이해하고 수정할 수 있어, 고객사 미팅 후 즉시 워크플로우를 변경하여 다음 데모에 반영하는 것이 가능했습니다. 자체 호스팅으로 고객사 데이터 보안도 확보했으며, 이러한 빠른 대응력은 수주 성공에 직접적으로 기여했습니다.

```typescript
// Supabase Realtime 구독 패턴: 고객사별 데이터 격리 및 안전한 정리
import { supabase } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';

function useMonitoringRealtime(clientId: string, onUpdate: (payload: MonitoringData) => void) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    // 고객사별 독립 채널로 데이터 격리
    const channel = supabase
      .channel(`monitoring:${clientId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'monitoring_logs',
          filter: `client_id=eq.${clientId}`, // RLS와 별개로 채널 레벨 필터링
        },
        (payload) => {
          onUpdate(payload.new as MonitoringData);
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          // 채널 에러 시 재연결 (다른 고객사 채널에 영향 없음)
          console.error(`Realtime channel error for client: ${clientId}`);
          channel.unsubscribe();
        }
      });

    channelRef.current = channel;

    // 컴포넌트 언마운트 시 구독 정리 (메모리 누수 방지)
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [clientId, onUpdate]);
}
```

## 담당 기간

2024.08 - 2026.02 | FE & BE 개발 매니저
