import React, { useState } from 'react';
import type { DesireKey } from '../data/desires';
import { getDailyQuestions, getTodayStr } from '../data/questions';

interface QuizProps {
  onComplete: (scores: Partial<Record<DesireKey, number>>) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const todayStr = getTodayStr();
  const questions = getDailyQuestions(todayStr);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Partial<Record<DesireKey, number>>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  function handleSelect(optionIdx: number) {
    if (animating || selected !== null) return;
    setSelected(optionIdx);
    setAnimating(true);

    const q = questions[current];
    const desire = q.options[optionIdx].desire;
    const newScores = { ...scores, [desire]: (scores[desire] ?? 0) + 1 };

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        onComplete(newScores);
      } else {
        setScores(newScores);
        setCurrent(current + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 400);
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div style={styles.container}>
      {/* Progress */}
      <div style={styles.progressWrap}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <span style={styles.progressText}>{current + 1} / {questions.length}</span>
      </div>

      {/* Question */}
      <div style={styles.questionSection}>
        <div style={styles.qNum}>Q{current + 1}</div>
        <h2 style={styles.qText}>{q.text}</h2>
      </div>

      {/* Options */}
      <div style={styles.options}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            style={{
              ...styles.option,
              ...(selected === i ? styles.optionSelected : {}),
              ...(selected !== null && selected !== i ? styles.optionDimmed : {}),
            }}
            onClick={() => handleSelect(i)}
          >
            <span style={styles.optionAlpha}>{['A', 'B', 'C', 'D'][i]}</span>
            <span style={styles.optionText}>{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0D0D0D',
    color: '#FFFFFF',
    padding: '48px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
  },
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #C0392B, #8E44AD)',
    borderRadius: '99px',
    transition: 'width 0.4s ease',
  },
  progressText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  questionSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  qNum: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#C0392B',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  qText: {
    fontSize: '24px',
    fontWeight: 800,
    lineHeight: 1.4,
    letterSpacing: '-0.5px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    color: '#FFFFFF',
    fontSize: '15px',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  optionSelected: {
    background: 'rgba(192,57,43,0.25)',
    borderColor: '#C0392B',
  },
  optionDimmed: {
    opacity: 0.35,
  },
  optionAlpha: {
    width: '28px',
    height: '28px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    flexShrink: 0,
  },
  optionText: {
    lineHeight: 1.4,
    fontWeight: 500,
  },
};
