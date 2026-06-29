import type { DesireKey } from './desires';

export interface Question {
  id: number;
  text: string;
  options: { text: string; desire: DesireKey }[];
}

// 날짜 기반으로 매일 5개 다른 질문 선택
export const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: '월급이 들어왔다. 가장 먼저 하는 생각은?',
    options: [
      { text: '저축/투자 얼마 할지 바로 계산', desire: '재욕' },
      { text: '뭐 맛있는 거 먹을까', desire: '식욕' },
      { text: '갖고 싶었던 거 사야지', desire: '색욕' },
      { text: '이 정도론 부족한데…', desire: '욕' },
    ],
  },
  {
    id: 2,
    text: '오늘 가장 하고 싶은 것 하나만 고른다면?',
    options: [
      { text: '아무것도 안 하고 그냥 자기', desire: '수면욕' },
      { text: '맛있는 거 먹으러 가기', desire: '식욕' },
      { text: '누군가와 깊은 대화 나누기', desire: '애정' },
      { text: '혼자 좋아하는 걸 실컷 하기', desire: '색욕' },
    ],
  },
  {
    id: 3,
    text: '친한 친구가 나보다 훨씬 잘 됐다. 솔직한 속마음은?',
    options: [
      { text: '진심으로 축하한다', desire: '희' },
      { text: '나도 저렇게 될 수 있을까 불안하다', desire: '구' },
      { text: '왜 나는 안 되지 속상하다', desire: '애' },
      { text: '나도 저 이상 돼야겠다 자극받는다', desire: '명예욕' },
    ],
  },
  {
    id: 4,
    text: '누군가 나를 무시하는 발언을 했다. 반응은?',
    options: [
      { text: '바로 반박하고 싸운다', desire: '노' },
      { text: '겉으론 웃고 속으론 기억해둔다', desire: '오' },
      { text: '상처받고 며칠 동안 생각난다', desire: '애' },
      { text: '무시당하지 않을 만큼 성공해야겠다고 다짐', desire: '명예욕' },
    ],
  },
  {
    id: 5,
    text: '지금 당장 선택해야 한다면?',
    options: [
      { text: '억대 연봉이지만 아무도 모르는 직업', desire: '재욕' },
      { text: '돈 적지만 모두가 부러워하는 직업', desire: '명예욕' },
      { text: '평범한 연봉이지만 퇴근 후 자유 완전 보장', desire: '수면욕' },
      { text: '내가 진짜 좋아하는 일', desire: '욕' },
    ],
  },
  {
    id: 6,
    text: '연인이 "요즘 네가 좀 변한 것 같아"라고 했다. 첫 반응은?',
    options: [
      { text: '왜? 어떻게 변했는데? (방어적)', desire: '노' },
      { text: '많이 힘들었나 봐… (울컥)', desire: '애' },
      { text: '그래서 날 싫어하는 건 아니지? (불안)', desire: '구' },
      { text: '맞아, 나 요즘 뭔가 달라지고 싶어', desire: '욕' },
    ],
  },
  {
    id: 7,
    text: '혼자만의 시간이 생겼다. 뭘 하나?',
    options: [
      { text: '그냥 누워서 아무것도 안 함', desire: '수면욕' },
      { text: '맛집 투어 혹은 배달', desire: '식욕' },
      { text: '좋아하는 콘텐츠에 완전히 빠짐', desire: '색욕' },
      { text: '미래 계획 세우거나 자기계발', desire: '명예욕' },
    ],
  },
  {
    id: 8,
    text: '소중한 사람과 크게 싸웠다. 그 이후 행동은?',
    options: [
      { text: '먼저 연락해서 화해 시도', desire: '애정' },
      { text: '상대방이 연락올 때까지 기다림', desire: '노' },
      { text: '혼자 울거나 힘들어함', desire: '애' },
      { text: '그 사람 지워버리기로 결심', desire: '오' },
    ],
  },
  {
    id: 9,
    text: '갑자기 큰돈이 생겼다. 진짜 속마음으로 하고 싶은 건?',
    options: [
      { text: '더 불려서 부자가 되기', desire: '재욕' },
      { text: '하고 싶었던 경험 다 해보기', desire: '색욕' },
      { text: '좋아하는 사람들에게 쓰기', desire: '애정' },
      { text: '지금 당장은 안 쓰고 나중을 위해 묻어두기', desire: '구' },
    ],
  },
  {
    id: 10,
    text: '새벽 3시에 잠이 안 온다. 머릿속에 있는 건?',
    options: [
      { text: '돈 걱정, 미래 불안', desire: '재욕' },
      { text: '누군가에 대한 감정', desire: '애정' },
      { text: '억울하거나 화나는 기억', desire: '노' },
      { text: '이 삶이 맞는 건지 근본적인 의문', desire: '욕' },
    ],
  },
  {
    id: 11,
    text: '오늘 기분이 안 좋다. 회복하는 방법은?',
    options: [
      { text: '실컷 자고 일어나면 낫겠지', desire: '수면욕' },
      { text: '맛있는 거 먹으면 좀 나아짐', desire: '식욕' },
      { text: '좋아하는 사람과 시간 보내기', desire: '애정' },
      { text: '혼자 생각 정리하면서 삭히기', desire: '애' },
    ],
  },
  {
    id: 12,
    text: '회사에서 칭찬을 받았다. 무슨 말을 들으면 가장 기쁜가?',
    options: [
      { text: '"이번 프로젝트 덕분에 수익이 많이 났어요"', desire: '재욕' },
      { text: '"당신 없으면 안 돼요, 정말 대단해요"', desire: '명예욕' },
      { text: '"팀 분위기를 밝게 만들어줘서 고마워요"', desire: '희' },
      { text: '"당신 덕분에 제가 많이 배웠어요"', desire: '애정' },
    ],
  },
  {
    id: 13,
    text: '싫어하는 사람을 어쩔 수 없이 계속 봐야 할 때 전략은?',
    options: [
      { text: '철저히 무시하고 없는 사람 취급', desire: '오' },
      { text: '겉으론 잘 대하되 속으론 경계 최대치', desire: '구' },
      { text: '직접 말해서 해결하거나 싸움', desire: '노' },
      { text: '그냥 내 감정 죽이고 참음', desire: '애' },
    ],
  },
  {
    id: 14,
    text: '5년 후 나의 모습, 가장 원하는 건 하나 고른다면?',
    options: [
      { text: '경제적으로 완전히 자유로운 상태', desire: '재욕' },
      { text: '내 분야에서 인정받는 전문가', desire: '명예욕' },
      { text: '사랑하는 사람들과 평화로운 일상', desire: '애정' },
      { text: '지금보다 훨씬 더 나다운 삶', desire: '욕' },
    ],
  },
  {
    id: 15,
    text: '당신이 가장 참기 힘든 상황은?',
    options: [
      { text: '돈이 없거나 경제적으로 불안정할 때', desire: '재욕' },
      { text: '아무도 나를 알아주지 않을 때', desire: '명예욕' },
      { text: '사랑하는 사람에게 외면받을 때', desire: '애정' },
      { text: '의미 없이 그냥 시간만 보낼 때', desire: '욕' },
    ],
  },
];

export function getDailyQuestions(dateStr: string): Question[] {
  // 날짜를 seed로 사용해 매일 다른 5문제 선택 (Fisher-Yates 셔플)
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed |= 0;
  }
  function rand() {
    seed = (seed * 1664525 + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  }
  const arr = [...ALL_QUESTIONS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 5);
}

export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
