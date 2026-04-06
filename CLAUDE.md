# CLAUDE.md

> 전체 PRD는 /docs/PRD.md 참고

---

## 서비스 개요

8개 질문으로 나의 예상 퇴사일을 계산해주는 직장인 공감 바이럴 웹앱.
이름 입력(Q0) → 질문 8개 → 로딩 → 사직서 형태 결과 카드 → SNS 공유

---

## 핵심 원칙

- 외부 API 없음
- DB 없음
- 로그인 없음
- 개인정보 수집 없음 (이름은 로컬에서만 사용)
- 모바일 퍼스트
- 정적 배포 (Vercel)
- 페이지 로딩 2초 이내

---

## 기술 스택

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- 배포: Vercel
- 이미지 저장: html2canvas
- 카카오 공유: 카카오 SDK

---

## 디렉토리 구조

```
/app
  /page.tsx                     랜딩
  /quiz/page.tsx                 질문 (Q0 이름입력 + Q1~Q8)
  /loading/page.tsx              로딩
  /result/page.tsx               결과
  /result/opengraph-image.tsx    OG 이미지 동적 생성
/data
  questions.ts                   질문 8개 데이터
  results.ts                     결과 10개 유형 데이터
  utils.ts                       scoreToType, scoreToPercent
/types
  index.ts                       타입 정의
/components
  QuizCard.tsx                   질문 카드
  NameInput.tsx                  이름 입력 (Q0)
  ResignationCard.tsx            사직서 카드
  ShareButtons.tsx               공유 버튼 모음
/docs
  PRD.md                         전체 기획 문서
```

---

## 유저 플로우

```
/ (랜딩)
  ↓ [시작하기]
/quiz → Q0 이름 입력 → Q1~Q7 점수 누적 → Q8 성향 분기
  ↓
/loading?score=14&tendency=creative&name=김철수
  ↓ 3.5초
/result?type=danger&name=김철수
```

---

## URL 파라미터

```
/loading  ?score={0~21}&tendency={creative|transfer|escape|noplan}&name={string|null}
/result   ?type={ResultType}&name={string|null}
```

---

## 점수 계산

```
Q1~Q7: 각 0~3점 → 총점 0~21점
Q8: 성향 분기만 (점수 미반영)
퇴사 욕구 % = Math.min(Math.round((score / 21) * 99), 99)
```

---

## 유형 분기 로직

```
총점 0~7          → model (모범사원형)
총점 19~21        → legend (전설의퇴사형)
총점 8~18 + 성향:
  creative  8~13  → jeju      / 14~18 → escaped
  transfer  8~13  → jobhopper / 14~18 → resume7
  escape    8~13  → quiet     / 14~18 → burnout
  noplan    8~13  → noplan    / 14~18 → wallet
```

---

## 이름 처리

```
이름 입력했을 때:
  발신: "{name} (본인)"
  제목: "{name}의 퇴직 의사 표명의 건"

이름 없을 때 (건너뛰기):
  발신: "본인 (마음속 퇴사 담당자)"
  제목: "퇴직 의사 표명의 건"
```

---

## 공유 기능

```
[📸 이미지 저장]  html2canvas → PNG (scale: 3)
[💛 카카오 공유]  카카오 SDK
[🐦 트위터 공유]  URL 스킴
[🧵 스레드 공유]  URL 스킴
[🔗 링크 복사]    클립보드
```

OG 이미지는 Next.js ImageResponse로 동적 생성 (1200x630)

---

## 코딩 컨벤션

- 컴포넌트: PascalCase
- 함수: camelCase
- 상수/데이터: UPPER_SNAKE_CASE
- CSS: Tailwind 클래스 우선
- `any` 타입 금지
- 컴포넌트 파일당 하나의 컴포넌트

---

## 개발 순서

```
1. types/index.ts
2. data/questions.ts
3. data/results.ts
4. data/utils.ts
5. app/page.tsx (랜딩)
6. app/quiz/page.tsx (Q0 + Q1~Q8)
7. app/loading/page.tsx
8. app/result/page.tsx
9. components/ResignationCard.tsx
10. components/ShareButtons.tsx
11. app/result/opengraph-image.tsx
```
