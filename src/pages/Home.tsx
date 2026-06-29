import React, { useEffect, useState } from 'react';
import { getTodayStr } from '../data/questions';
import { getTodayResult, getStreak, getLast7Days } from '../utils/storage';
import { DESIRES } from '../data/desires';

interface HomeProps {
  onStart: () => void;
  onViewMap: () => void;
}

export default function Home({ onStart, onViewMap }: HomeProps) {
  const todayStr = getTodayStr();
  const todayResult = getTodayResult(todayStr);
  const streak = getStreak(todayStr);
  const week = getLast7Days(todayStr);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    forceUpdate(n => n + 1);
  }, []);

  const alreadyDone = todayResult !== null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.appName}>욕망 지수</span>
          {streak > 0 && (
            <div style={styles.streakBadge}>
              <span style={styles.streakFire}>🔥</span>
              <span style={styles.streakText}>{streak}일 연속</span>
            </div>
          )}
        </div>
        <h1 style={styles.title}>
          오늘 나를 움직이는<br />
          <span style={styles.titleAccent}>욕망</span>은 무엇인가
        </h1>
        <p style={styles.subtitle}>
          매일 5문제 · 오욕칠정 기반 심리진단
        </p>
      </div>

      {/* 7일 미리보기 */}
      <div style={styles.weekRow}>
        {week.map((day, i) => {
          const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
          const d = new Date(todayStr);
          d.setDate(d.getDate() - (6 - i));
          const label = dayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1];
          const isToday = i === 6;
          const desire = day ? DESIRES[day.dominant] : null;
          return (
            <div
              key={i}
              style={{
                ...styles.dayDot,
                background: desire ? desire.color : (isToday ? 'rgba(192,57,43,0.2)' : 'rgba(255,255,255,0.08)'),
                border: isToday ? '2px solid #C0392B' : '2px solid transparent',
              }}
              title={desire ? desire.label : ''}
            >
              <span style={styles.dayDotEmoji}>{desire ? desire.emoji : (isToday ? '?' : '')}</span>
              <span style={styles.dayLabel}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* 오늘 결과 or 시작 */}
      {alreadyDone && todayResult ? (
        <div style={styles.resultCard}>
          <div style={styles.resultCardTop}>
            <span style={styles.resultCardBadge}>오늘의 욕망</span>
            <span style={styles.resultCardDate}>{todayStr}</span>
          </div>
          <div style={styles.resultCardBody}>
            <span style={styles.resultEmoji}>{DESIRES[todayResult.dominant].emoji}</span>
            <div>
              <div style={styles.resultDominantLabel}>{DESIRES[todayResult.dominant].label}</div>
              <div style={styles.resultDominantDesc}>{DESIRES[todayResult.dominant].shortDesc}</div>
            </div>
          </div>
          <button style={styles.retakeButton} onClick={onStart}>
            다시 진단하기
          </button>
        </div>
      ) : (
        <div style={styles.ctaSection}>
          <div style={styles.desirePreview}>
            {['💰', '🔥', '🍖', '👑', '😴', '😄', '😤', '😢', '😰', '💗', '🖤', '🌑'].map((emoji, i) => (
              <span key={i} style={{ ...styles.previewEmoji, animationDelay: `${i * 0.1}s` }}>{emoji}</span>
            ))}
          </div>
          <button style={styles.startButton} onClick={onStart}>
            오늘의 욕망 진단하기
          </button>
          <p style={styles.startHint}>매일 새로운 질문 · 약 1분</p>
        </div>
      )}

      {/* 7일 욕망 지도 */}
      <button style={styles.mapButton} onClick={onViewMap}>
        7일 욕망 지도 보기 →
      </button>

      {/* 오욕칠정 설명 */}
      <div style={styles.groups}>
        <div style={styles.groupCard}>
          <div style={styles.groupTitle}>오욕 五慾</div>
          <div style={styles.groupDesc}>재·색·식·명예·수면</div>
          <div style={styles.groupSub}>본능에서 비롯된 욕망</div>
        </div>
        <div style={styles.groupCard}>
          <div style={styles.groupTitle}>칠정 七情</div>
          <div style={styles.groupDesc}>희·노·애·구·애·오·욕</div>
          <div style={styles.groupSub}>감정에서 비롯된 욕망</div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0D0D0D',
    color: '#FFFFFF',
    padding: '0 20px 60px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    paddingTop: '56px',
    paddingBottom: '28px',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  appName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#C0392B',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  streakBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(192,57,43,0.15)',
    border: '1px solid rgba(192,57,43,0.3)',
    borderRadius: '99px',
    padding: '4px 10px',
  },
  streakFire: { fontSize: '14px' },
  streakText: { fontSize: '13px', fontWeight: 700, color: '#E74C3C' },
  title: {
    fontSize: '32px',
    fontWeight: 900,
    lineHeight: 1.25,
    letterSpacing: '-0.5px',
    marginBottom: '10px',
  },
  titleAccent: {
    color: '#C0392B',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.45)',
  },
  weekRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '28px',
  },
  dayDot: {
    width: '40px',
    height: '52px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  dayDotEmoji: { fontSize: '18px' },
  dayLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 },
  resultCard: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '16px',
  },
  resultCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  resultCardBadge: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#C0392B',
    background: 'rgba(192,57,43,0.15)',
    padding: '3px 10px',
    borderRadius: '99px',
  },
  resultCardDate: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
  resultCardBody: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px',
  },
  resultEmoji: { fontSize: '40px' },
  resultDominantLabel: { fontSize: '20px', fontWeight: 800 },
  resultDominantDesc: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' },
  retakeButton: {
    width: '100%',
    padding: '12px',
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '10px',
  },
  ctaSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  desirePreview: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
    padding: '20px',
  },
  previewEmoji: { fontSize: '28px' },
  startButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #C0392B 0%, #8E44AD 100%)',
    color: '#FFFFFF',
    fontSize: '17px',
    fontWeight: 800,
    borderRadius: '14px',
    letterSpacing: '-0.3px',
    boxShadow: '0 4px 24px rgba(192,57,43,0.4)',
  },
  startHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
  },
  mapButton: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '12px',
    marginBottom: '28px',
    textAlign: 'center',
  },
  groups: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  groupCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '16px',
  },
  groupTitle: {
    fontSize: '15px',
    fontWeight: 800,
    color: '#C0392B',
    marginBottom: '6px',
  },
  groupDesc: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '4px',
    lineHeight: 1.5,
  },
  groupSub: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
  },
};
