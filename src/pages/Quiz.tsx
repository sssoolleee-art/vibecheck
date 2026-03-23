import React, { useState, useEffect } from 'react';
import { graniteEvent } from '@apps-in-toss/web-bridge';
import { questions } from '../data/questions';

interface QuizProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

export default function Quiz({ onComplete, onBack }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const cleanup = graniteEvent.addEventListener('backEvent', {
      onEvent: () => {
        if (currentIndex === 0) {
          onBack();
        } else {
          setCurrentIndex(currentIndex - 1);
          setSelected(answers[questions[currentIndex - 1].id] ?? null);
        }
      },
    });
    return () => { cleanup?.(); };
  }, [currentIndex, answers, onBack]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleSelect(optionIndex: number) {
    if (isAnimating) return;
    setSelected(optionIndex);
    setIsAnimating(true);

    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion.id]: optionIndex };
      setAnswers(newAnswers);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setIsAnimating(false);
      } else {
        onComplete(newAnswers);
      }
    }, 350);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.progressText}>{currentIndex + 1} <span style={{ color: '#D1D5DB' }}>/ {questions.length}</span></span>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      <div style={styles.questionSection}>
        <div style={styles.emojiBox}>
          <span style={styles.questionEmoji}>{currentQuestion.emoji}</span>
        </div>
        <h2 style={styles.questionText}>{currentQuestion.text}</h2>
      </div>

      <div style={styles.optionsSection}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            style={{
              ...styles.optionButton,
              ...(selected === index ? styles.optionSelected : {}),
            }}
            onClick={() => handleSelect(index)}
          >
            <span style={{
              ...styles.optionIndex,
              ...(selected === index ? styles.optionIndexSelected : {}),
            }}>
              {['A', 'B', 'C', 'D'][index]}
            </span>
            <span style={styles.optionText}>{option.text}</span>
            {selected === index && <span style={styles.checkmark}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    padding: '0 20px 40px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '16px',
    paddingBottom: '12px',
  },
  progressText: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#1F2937',
  },
  progressBar: {
    height: '4px',
    background: '#F3F4F6',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '44px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #7C3AED, #06B6D4)',
    borderRadius: '99px',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  questionSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '28px',
    gap: '16px',
  },
  emojiBox: {
    width: '56px',
    height: '56px',
    background: '#F5F3FF',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionEmoji: {
    fontSize: '28px',
  },
  questionText: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#111827',
    lineHeight: 1.4,
    letterSpacing: '-0.5px',
  },
  optionsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  optionButton: {
    width: '100%',
    padding: '16px 18px',
    background: '#F9FAFB',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '2px solid transparent',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  optionSelected: {
    background: '#F5F3FF',
    borderColor: '#7C3AED',
  },
  optionIndex: {
    width: '28px',
    height: '28px',
    background: '#FFFFFF',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: '#9CA3AF',
    flexShrink: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  optionIndexSelected: {
    background: '#7C3AED',
    color: '#FFFFFF',
    boxShadow: 'none',
  },
  optionText: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#1F2937',
    flex: 1,
    lineHeight: 1.4,
  },
  checkmark: {
    fontSize: '15px',
    color: '#7C3AED',
    fontWeight: 700,
    flexShrink: 0,
  },
};
