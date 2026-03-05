# 심볼릭 링크(Symlink) Skills 세팅 안내서

## 1. 개념

### 심볼릭 링크란?

심볼릭 링크(Symbolic Link, Symlink)는 **파일 시스템에서 다른 경로를 가리키는 포인터**다.
일반 파일처럼 보이지만, 실제 내용은 없고 "저기에 진짜 파일이 있어"라고 알려주는 역할만 한다.

```
.claude/skills  →  .skills/   ← 진짜 파일이 여기 있음
.agent/skills   →  .skills/
.agents/skills  →  .skills/
```

### 왜 쓰는가?

AI 도구마다 스킬 파일을 읽는 위치가 다르다.

| 도구 | 스킬 경로 |
|------|-----------|
| Claude Code | `.claude/skills/` |
| Antigravity (`.agent/`) | `.agent/skills/` |
| npx skills (`.agents/`) | `.agents/skills/` |

심볼릭 링크 없이 관리하면 **같은 파일을 세 곳에 중복으로 유지**해야 한다.
심볼릭 링크를 쓰면 `.skills/` 한 곳만 관리하면 나머지 세 경로에 자동으로 반영된다.

### 하드 링크와의 차이

| | 심볼릭 링크 | 하드 링크 |
|--|------------|----------|
| 대상 | 파일·디렉토리 모두 가능 | 파일만 가능 |
| 원본 삭제 시 | 링크가 끊김 (dangling) | 파일 유지 |
| 다른 파티션 | 가능 | 불가 |
| git 추적 | 링크 자체를 추적 | - |

---

## 2. 이 프로젝트 구조

```
프로젝트 루트/
├── .skills/                    ← 실제 스킬 파일 위치 (gitignore됨, 개인 전용)
│   ├── create-animation/SKILL.md
│   ├── create-component/SKILL.md
│   ├── create-page/SKILL.md
│   ├── optimize-performance/SKILL.md
│   ├── find-skills/SKILL.md
│   ├── frontend-design/SKILL.md
│   ├── vercel-react-best-practices/
│   └── web-design-guidelines/SKILL.md
│
├── .agent/skills  →  .skills/  (심볼릭 링크)
├── .agents/skills →  .skills/  (심볼릭 링크)
└── .claude/skills →  .skills/  (심볼릭 링크)
```

`.gitignore`에 `/.skills`가 등록되어 있어 스킬 파일은 git에 올라가지 않는다.
심볼릭 링크 자체(`mode 120000`)만 git에 커밋된다.

---

## 3. 적용 방법

### 3-1. 기본 심볼릭 링크 생성

```bash
# ln -s <원본 경로> <링크 경로>
ln -s /절대경로/.skills .claude/skills
```

> **주의:** 상대 경로는 링크 파일 위치 기준으로 해석된다.
> 혼란을 피하려면 절대 경로 사용을 권장한다.

### 3-2. 이 프로젝트 초기 세팅 (새 머신에서 클론 후)

```bash
# 1. 프로젝트 루트로 이동
cd /path/to/2026_portfolio

# 2. .skills 디렉토리 생성 (git에서 복원되지 않으므로 직접 생성)
mkdir .skills

# 3. 스킬 파일 추가 (npx skills CLI 또는 직접 생성)
npx skills add <패키지명>
# 또는
mkdir .skills/my-skill && touch .skills/my-skill/SKILL.md

# 4. 심볼릭 링크 생성
ln -s $(pwd)/.skills .agent/skills
ln -s $(pwd)/.skills .agents/skills
ln -s $(pwd)/.skills .claude/skills
```

### 3-3. 심볼릭 링크 확인

```bash
# 링크 확인 (l로 시작하는 항목이 심볼릭 링크)
ls -la .claude/skills
# lrwxr-xr-x  .claude/skills -> /절대경로/.skills

# 링크가 올바르게 연결되었는지 확인
ls .claude/skills/
```

### 3-4. 깨진 링크 확인 및 수정

```bash
# 깨진(dangling) 심볼릭 링크 찾기
find . -maxdepth 3 -type l ! -exec test -e {} \; -print

# 링크 삭제 후 재생성
rm .claude/skills
ln -s $(pwd)/.skills .claude/skills
```

---

## 4. git과 심볼릭 링크

git은 심볼릭 링크를 `mode 120000`으로 **링크 자체를 파일처럼 추적**한다.
링크가 가리키는 대상 파일은 추적하지 않는다.

```bash
# git에서 심볼릭 링크로 보이는 예시
create mode 120000 .agents/skills
```

### 주의: symlink 너머 경로 문제

링크 경로 아래의 파일을 직접 `git add`하면 오류가 난다.

```bash
# 오류 발생
git add .agents/skills/find-skills/SKILL.md
# fatal: pathspec '...' is beyond a symbolic link

# 해결: 링크 자체를 추가
git add .agents/skills
```

링크 너머 파일들을 스테이징해야 할 때는 링크를 임시 제거 후 작업한다.

```bash
rm .agents/skills           # 링크 제거
git add -u .agents/         # 변경사항 스테이징
ln -s $(pwd)/.skills .agents/skills  # 링크 재생성
git add .agents/skills      # 링크 추가
```

---

## 5. 스킬 추가/수정

모든 변경은 `.skills/` 에서만 한다.

```bash
# 새 스킬 추가
mkdir .skills/my-new-skill
cat > .skills/my-new-skill/SKILL.md << 'EOF'
---
name: my-new-skill
description: 내 커스텀 스킬 설명
---
# My New Skill
...
EOF

# 확인 — 세 경로 모두 즉시 반영됨
ls .claude/skills/
ls .agent/skills/
ls .agents/skills/
```
