import React from 'react';
import { DESIRES } from '../data/desires';
import { getLast7Days } from '../utils/storage';
import { getTodayStr } from '../data/questions';
import { BannerAd, isAdFree } from '../utils/ads';

interface MapProps {
  onBack: () => void;
}

export default function Map({ onBack }: MapProps) {
  const todayStr = getTodayStr();
  const week = getLast7Days(todayStr);
  const adFree = isAdFree();

  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

  const filledDays = week.filter(d => d !== null).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>7일 욕망 지도</h1>
        <p style={styles.subtitle}>최근 7일간 나를 지배한 욕망</p>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statNum}>{filledDays}</div>
          <div style={styles.statLabel}>기록된 날</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>{7 - filledDays}</div>
          <div style={styles.statLabel}>미기록</div>
        </div>
        {filledDays > 0 && (() => {
          const tally: Record<string, number> = {};
          week.forEach(d => {
            if (d) tally[d.dominant] = (tally[d.dominant] ?? 0) + 1;
          });
          const topKey = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0];
          const topDesire = DESIRES[topKey as keyof typeof DESIRES];
          return (
            <div style={styles.statCard}>
              <div style={styles.statNum}>{topDesire.emoji}</div>
              <div style={styles.statLabel}>주된 욕망</div>
            </div>
          );
        })()}
      </div>

      {/* Day cards */}
      <div style={styles.dayList}>
        {week.map((day, i) => {
          const d = new Date(todayStr);
          d.setDate(d.getDate() - (6 - i));
          const dayLabel = dayNames[d.getDay() === 0 ? 6 : d.getDay() - 1];
          const dateLabel = `${d.getMonth() + 1}/${d.getDate()}`;
          const isToday = i === 6;
          const desire = day ? DESIRES[day.dominant] : null;

          return (
            <div
              key={i}
              style={{
                ...styles.dayCard,
                borderColor: isToday ? 'rgba(192,57,43,0.4)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <div style={styles.dayInfo}>
                <span style={styles.dayName}>{dayLabel}</span>
                <span style={styles.dateLabel}>{dateLabel}</span>
                {isToday && <span style={styles.todayBadge}>오늘</span>}
              </div>
              {desire ? (
                <div style={styles.dayResult}>
                  <span style={styles.dayEmoji}>{desire.emoji}</span>
                  <div>
                    <div style={styles.dayDesireName}>{desire.label}</div>
                    <div style={styles.dayDesireDesc}>{desire.shortDesc}</div>
                  </div>
                </div>
              ) : (
                <div style={styles.dayEmpty}>
                  <span style={styles.dayEmptyText}>기록 없음</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Banner */}
      {!adFree && (
        <div style={styles.bannerWrap}>
          <BannerAd />
        </div>
      )}

      <button style={styles.backButton} onClick={onBack}>
        돌아가기
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0D0D0D',
    color: '#FFFFFF',
    padding: '0 20px 60px',
  },
  header: {
    paddingTop: '56px',
    paddingBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
  },
  statsRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
  },
  statCard: {
    flex: 1,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '16px 12px',
    textAlign: 'center',
  },
  statNum: {
    fontSize: '26px',
    fontWeight: 900,
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
  },
  dayList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
  },
  dayCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid',
    borderRadius: '14px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  dayInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    width: '36px',
    flexShrink: 0,
  },
  dayName: {
    fontSize: '16px',
    fontWeight: 800,
  },
  dateLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
  },
  todayBadge: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#C0392B',
    background: 'rgba(192,57,43,0.15)',
    padding: '2px 6px',
    borderRadius: '99px',
  },
  dayResult: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dayEmoji: { fontSize: '32px' },
  dayDesireName: { fontSize: '16px', fontWeight: 700 },
  dayDesireDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' },
  dayEmpty: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dayEmptyText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.2)',
  },
  bannerWrap: {
    marginBottom: '16px',
  },
  backButton: {
    width: '100%',
    padding: '16px',
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    fontWeight: 700,
    borderRadius: '12px',
  },
};
