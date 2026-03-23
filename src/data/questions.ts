export interface Question {
  id: number;
  text: string;
  emoji: string;
  options: {
    text: string;
    scores: Record<string, number>;
  }[];
}

export interface ResultType {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  traits: string[];
  vibeWith: string;
  tip: string;
  color: string;
  gradient: [string, string];
}

// 4가지 바이브 유형: 파이어(F), 웨이브(W), 스파크(S), 딥(D)
export const questions: Question[] = [
  {
    id: 1,
    text: '새로운 프로젝트가 생겼을 때 나는?',
    emoji: '🚀',
    options: [
      { text: '바로 실행 모드. 일단 시작하고 본다', scores: { F: 2 } },
      { text: '어떻게 흘러갈지 보면서 자연스럽게 합류한다', scores: { W: 2 } },
      { text: '독특한 아이디어 없는지 먼저 탐색한다', scores: { S: 2 } },
      { text: '의미 있는 일인지 먼저 따져본다', scores: { D: 2 } },
    ],
  },
  {
    id: 2,
    text: '무리에서 나는 주로 어떤 포지션?',
    emoji: '👥',
    options: [
      { text: '분위기 리드하는 편. 자연스럽게 앞에 있다', scores: { F: 2 } },
      { text: '갈등 중재하고 분위기 부드럽게 만드는 편', scores: { W: 2 } },
      { text: '엉뚱한 아이디어로 분위기 띄우는 편', scores: { S: 2 } },
      { text: '조용히 관찰하다가 핵심 찌르는 말 하는 편', scores: { D: 2 } },
    ],
  },
  {
    id: 3,
    text: '아무 계획 없는 주말, 나는?',
    emoji: '☀️',
    options: [
      { text: '뭐라도 한다. 가만히 있는 게 더 힘들다', scores: { F: 2 } },
      { text: '그냥 흘러가는 대로. 뭔가 생기겠지', scores: { W: 2 } },
      { text: '즉흥으로 뭔가 새로운 거 해본다', scores: { S: 2 } },
      { text: '오히려 좋아. 혼자만의 시간을 충전한다', scores: { D: 2 } },
    ],
  },
  {
    id: 4,
    text: '중요한 결정 앞에서 나는?',
    emoji: '🎯',
    options: [
      { text: '빠르게 판단하고 실행. 고민이 길면 답 없다', scores: { F: 2 } },
      { text: '주변 상황과 사람들 반응 보면서 결정한다', scores: { W: 2 } },
      { text: '직관을 믿는다. 끌리는 쪽으로 간다', scores: { S: 2 } },
      { text: '시간이 걸려도 깊이 생각하고 결정한다', scores: { D: 2 } },
    ],
  },
  {
    id: 5,
    text: '스트레스 받을 때 나만의 해소법은?',
    emoji: '🌀',
    options: [
      { text: '몸을 움직인다. 운동이나 활동적인 걸 한다', scores: { F: 2 } },
      { text: '좋아하는 사람들이랑 시간을 보낸다', scores: { W: 2 } },
      { text: '뭔가 만들거나 창작 활동을 한다', scores: { S: 2 } },
      { text: '혼자 조용히 생각을 정리하는 시간을 갖는다', scores: { D: 2 } },
    ],
  },
  {
    id: 6,
    text: '처음 만난 사람과 대화할 때 나는?',
    emoji: '💬',
    options: [
      { text: '먼저 대화 시작하는 편. 어색함은 내가 깬다', scores: { F: 2 } },
      { text: '상대 페이스에 맞춰서 자연스럽게 흘러간다', scores: { W: 2 } },
      { text: '엉뚱하거나 신선한 주제로 대화를 이끈다', scores: { S: 2 } },
      { text: '깊은 대화를 선호. 표면적인 얘기는 별로다', scores: { D: 2 } },
    ],
  },
  {
    id: 7,
    text: '나의 에너지 충전 방식은?',
    emoji: '⚡',
    options: [
      { text: '뭔가를 이루거나 완성했을 때 충전된다', scores: { F: 2 } },
      { text: '평화롭고 편안한 환경에 있을 때 충전된다', scores: { W: 2 } },
      { text: '새로운 자극이나 영감을 받을 때 충전된다', scores: { S: 2 } },
      { text: '혼자 깊이 몰입할 수 있을 때 충전된다', scores: { D: 2 } },
    ],
  },
  {
    id: 8,
    text: '나에게 이상적인 하루는?',
    emoji: '🌟',
    options: [
      { text: '할 일 다 해치우고 성취감 느끼는 하루', scores: { F: 2 } },
      { text: '무리 없이 흘러가고 모두가 좋은 하루', scores: { W: 2 } },
      { text: '예상 못한 재미있는 일이 생기는 하루', scores: { S: 2 } },
      { text: '뭔가 깊이 생각하게 되는 인사이트가 있는 하루', scores: { D: 2 } },
    ],
  },
];

export const resultTypes: Record<string, ResultType> = {
  F: {
    id: 'F',
    title: '파이어 바이브',
    emoji: '🔥',
    subtitle: '불꽃 같은 에너지의 소유자',
    description:
      '어디서든 에너지가 넘치고 추진력이 강한 타입이에요. 생각보다 행동이 먼저고, 도전을 두려워하지 않아요. 주변 사람들은 당신의 열정에 자연스럽게 끌리고, 당신이 있으면 분위기가 달라져요. 목표가 생기면 빠르게 달려가는 게 당신의 바이브.',
    traits: ['강한 추진력', '리더십', '빠른 실행력', '넘치는 에너지'],
    vibeWith: '딥 바이브(D)와 궁합이 좋아요. 서로의 부족한 부분을 채워줘요',
    tip: '가끔은 속도를 늦추고 주변을 돌아보세요. 깊이가 더해지면 더 강력해져요 🔥',
    color: '#F97316',
    gradient: ['#F97316', '#EF4444'],
  },
  W: {
    id: 'W',
    title: '웨이브 바이브',
    emoji: '🌊',
    subtitle: '물처럼 유연하게 흐르는 타입',
    description:
      '어떤 상황에도 자연스럽게 적응하는 능력이 탁월해요. 억지로 밀어붙이기보다 흐름을 타면서 가장 좋은 타이밍을 기다릴 줄 알아요. 사람들과의 관계에서 마찰을 줄이는 능력이 있고, 당신 곁에 있으면 편안함을 느끼는 사람이 많아요.',
    traits: ['뛰어난 적응력', '조화로운 성격', '자연스러운 공감', '유연한 사고'],
    vibeWith: '파이어 바이브(F)나 스파크 바이브(S)와 잘 어울려요',
    tip: '흐름을 타는 것도 좋지만, 때로는 원하는 걸 먼저 말해보세요. 당신의 의견도 중요해요 🌊',
    color: '#0EA5E9',
    gradient: ['#0EA5E9', '#6366F1'],
  },
  S: {
    id: 'S',
    title: '스파크 바이브',
    emoji: '⚡',
    subtitle: '번개처럼 터지는 아이디어 메이커',
    description:
      '남들이 보지 못하는 걸 보고, 예상치 못한 방향으로 생각하는 게 특기예요. 창의성과 즉흥성이 합쳐진 타입으로, 루틴보다 새로운 자극에서 에너지를 얻어요. 지루함을 못 참고, 항상 다음 아이디어가 머릿속에서 튀어나오는 사람이에요.',
    traits: ['폭발적인 창의력', '즉흥성', '새로운 시각', '트렌드 감각'],
    vibeWith: '딥 바이브(D)와 시너지가 폭발해요. 깊이와 창의가 만나면 최강 조합',
    tip: '아이디어를 완성까지 끌고 가는 연습을 해보세요. 시작만큼 마무리도 멋질 거예요 ⚡',
    color: '#7C3AED',
    gradient: ['#7C3AED', '#06B6D4'],
  },
  D: {
    id: 'D',
    title: '딥 바이브',
    emoji: '🌙',
    subtitle: '수면 아래 깊이를 가진 사람',
    description:
      '표면보다 본질을 먼저 보는 타입이에요. 말수가 적을 수 있지만, 말할 땐 핵심을 찔러요. 감수성이 풍부하고 자기 내면 세계가 뚜렷해요. 깊이 있는 대화와 사유를 즐기며, 주변 사람들에게 인사이트를 주는 존재로 기억돼요.',
    traits: ['깊은 사유력', '예리한 통찰', '풍부한 감수성', '본질 집중'],
    vibeWith: '스파크 바이브(S)나 파이어 바이브(F)와 좋은 균형을 이뤄요',
    tip: '당신의 생각을 더 자주 꺼내보세요. 세상은 당신의 관점이 필요해요 🌙',
    color: '#6366F1',
    gradient: ['#6366F1', '#A855F7'],
  },
};

export function calculateResult(answers: Record<number, number>): ResultType {
  const scores: Record<string, number> = { F: 0, W: 0, S: 0, D: 0 };

  questions.forEach((q) => {
    const answerIndex = answers[q.id];
    if (answerIndex !== undefined) {
      const option = q.options[answerIndex];
      Object.entries(option.scores).forEach(([type, score]) => {
        scores[type] = (scores[type] || 0) + score;
      });
    }
  });

  const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return resultTypes[topType];
}
