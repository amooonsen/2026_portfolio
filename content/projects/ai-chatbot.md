---
title: "AI 챗봇"
description: "자연어 처리 기반 고객 상담 자동화 서비스. RAG 파이프라인으로 도메인 특화 응답을 제공합니다."
tags: ["Next.js", "TypeScript", "LangChain", "Tailwind CSS"]
year: 2024
images:
  - "https://picsum.photos/seed/chatbot-1/1200/800"
  - "https://picsum.photos/seed/chatbot-2/1200/800"
links:
  live: "#"
---

## 프로젝트 배경

고객 상담 응대 시간을 줄이고 24시간 서비스를 제공하기 위해, RAG(Retrieval-Augmented Generation) 기반의 AI 챗봇을 개발했습니다.

## 주요 작업

- **RAG 파이프라인**: LangChain을 활용한 문서 임베딩, 벡터 검색, 응답 생성 파이프라인 구축
- **프론트엔드 채팅 UI**: Next.js 기반 실시간 채팅 인터페이스 (스트리밍 응답 지원)
- **관리자 대시보드**: 대화 기록 조회, 응답 품질 모니터링, FAQ 관리 기능

## 기술적 도전

도메인 특화 지식(제품 매뉴얼, FAQ, 정책 문서)을 효과적으로 검색하고, 환각(hallucination)을 최소화하기 위한 프롬프트 엔지니어링과 검증 로직을 구현했습니다.

## 성과

- 고객 상담 응대 시간 **70% 단축**
- 자동 응답 정확도 92%
- 월 평균 상담 처리량 3배 증가
