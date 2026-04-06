import type { Question, TendencyOption } from '@/types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '월요일 아침, 알람이 울릴 때 드는 첫 번째 생각은?',
    options: [
      { label: '😀 나는 갓생러니까 바로 일어나서 출근해야지~', score: 0 },
      { label: '🙂 출근은 해야지.. 생존이니까', score: 1 },
      { label: '😐 어억..5분만 더...(이미 10분 지남)', score: 2 },
      { label: '💀 알람 끄고 인생도 같이 꺼버림', score: 3 },
    ],
  },
  {
    id: 2,
    text: '출근해서 자리 앉자마자 드는 생각은?',
    options: [
      { label: '😀 야호 오늘도 생산적으로 일해야지', score: 0 },
      { label: '🙂 일단 식도에 아메리카노 한 잔 넣어야겠다', score: 1 },
      { label: '😐 일단 화장실 갔다와볼까나?', score: 2 },
      { label: '💀 음... 퇴근까지 7시간 56분 오케이', score: 3 },
    ],
  },
  {
    id: 3,
    text: '이번 주 야근은 몇 번이나 했나요?',
    options: [
      { label: '😀 야근? 그게 뭔데요?', score: 0 },
      { label: '🙂 1~2번, 아직 인간임', score: 1 },
      { label: '😐 3~4번, 집이 낯설다', score: 2 },
      { label: '💀 회사 주소로 전입 신고 하는게 빠름', score: 3 },
    ],
  },
  {
    id: 4,
    text: '내 연봉에 대한 솔직한 심정은?',
    options: [
      { label: '😀 금융치료 야무지게 당하는중', score: 0 },
      { label: '🙂 피자먹을 때 치즈 크러스트 고민 없이 추가 가능', score: 1 },
      { label: '😐 시급 계산하고 갑자기 숙연해짐', score: 2 },
      { label: '💀 연봉 = 생존 수당', score: 3 },
    ],
  },
  {
    id: 5,
    text: '회의 중 머릿속 상황은?',
    options: [
      { label: '😀 집중 + 메모까지 완벽', score: 0 },
      { label: '🙂 듣는 척은 하는 프로 호응러', score: 1 },
      { label: '😐 일단 눈뜨고 숨쉬고 잘하고 있음', score: 2 },
      { label: '💀 ??? : 아몰랑 배고프다 헤헤', score: 3 },
    ],
  },
  {
    id: 6,
    text: '업무 중 가장 많이 하는 것은?',
    options: [
      { label: '😀 투투투투... 흐음... 푸푸푸.. 추임새 넣기', score: 0 },
      { label: '🙂 일단 막막해서 한동안 가만히 있음', score: 1 },
      { label: '😐 Alt + Tab 컨트롤', score: 2 },
      { label: '💀 유튜브 시청, 웹서핑, 공고 확인 등 다수의 생산적 활동', score: 3 },
    ],
  },
  {
    id: 7,
    text: '주변 친구들을 볼 때 내 상황은?',
    options: [
      { label: '😀 나 꽤 잘 살고 있는 것 같음', score: 0 },
      { label: '🙂 다들 비슷비슷한 것 같음', score: 1 },
      { label: '😐 아니 저녀석이..? 엄청나네 부럽다', score: 2 },
      { label: '💀 나만 인생 난이도 헬모드 시작', score: 3 },
    ],
  },
];

export const TENDENCY_OPTIONS: TendencyOption[] = [
  {
    value: 'creative',
    label: '🎨 판 갈아엎기',
    description: '프리랜서, 창업, 업종 변경까지 다 열려 있음',
  },
  {
    value: 'transfer',
    label: '🏢 회사만 갈아타기',
    description: '일은 할 수 있음. 다만 여기선 못 하겠음',
  },
  {
    value: 'escape',
    label: '🚪 일단 런',
    description: '계획은 탈출 후 생각. 지금은 생존이 먼저임',
  },
  {
    value: 'noplan',
    label: '🛋 인간 회복 모드',
    description: '아무것도 안 하고 잠깐 사람으로 살고 싶음',
  },
];
