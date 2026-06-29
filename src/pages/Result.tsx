import React, { useState } from 'react';
import type { DesireKey } from '../data/desires';
import { DESIRES, DESIRE_KEYS } from '../data/desires';
import { BannerAd, isAdFree, buyAdFree, showRewardedAd } from '../utils/ads';

interface ResultProps {
  dominant: DesireKey;
  scores: Partial<Record<DesireKey, number>>;
  totalQuestions: number;
  onHome: () => void;
  onViewMap: () => void;
}

const DEEP_UNLOCK_KEY = 'desireindex_deep_unlocked';

export default function Result({ dominant, scores, totalQuestions, onHome, onViewMap }: ResultProps) {
  const desire = DESIRES[dominant];
  const [deepUnlocked, setDeepUnlocked] = useState(() =>
    localStorage.getItem(DEEP_UNLOCK_KEY) === 'true'
  );
  const [unlocking, setUnlocking] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const adFree = isAdFree();

  async function handleUnlockDeep() {
    if (unlocking || deepUnlocked) return;
    setUnlocking(true);
    const earned = await showRewardedAd();
    if (earned) {
      localStorage.setItem(DEEP_UNLOCK_KEY, 'true');
      setDeepUnlocked(true);
    }
    setUnlocking(false);
  }

  function handleBuyAdFree() {
    setPurchasing(true);
    buyAdFree(
      () => {},
      () => setPurchasing(false),
    );
  }

  // top 3 desires by score
  const ranked = DESIRE_KEYS
    .filter(k => (scores[k] ?? 0) > 0)
    .sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0));

  const maxScore = Math.max(...ranked.map(k => scores[k] ?? 0), 1);

  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={{ ...styles.hero, background: `linear-gradient(180deg, ${desire.color}22 0%, #0D0D0D 100%)` }}>
        <div style={styles.resultBadge}>오늘의 지배 욕망</div>
        <div style={styles.heroEmoji}>{desire.emoji}</div>
        <h1 style={styles.heroLabel}>{desire.label}</h1>
        <p style={styles.heroHanja}>{desire.hanja}</p>
        <p style={styles.heroShort}>{desire.shortDesc}</p>
      </div>

      {/* Full desc */}
      <div style={styles.section}>
        <p style={styles.fullDesc}>{desire.fullDesc}</p>
      </div>

      {/* Score breakdown */}
      {ranked.length > 1 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>욕망 분포</div>
          {ranked.slice(0, 5).map(k => {
            const d = DESIRES[k];
            const pct = Math.round(((scores[k] ?? 0) / maxScore) * 100);
            return (
              <div key={k} style={styles.barRow}>
                <span style={styles.barEmoji}>{d.emoji}</span>
                <span style={styles.barLabel}>{d.label}</span>
                <div style={styles.barTrack}>
                  <div style={{ ...styles.barFill, width: `${pct}%`, background: d.color }} />
                </div>
                <span style={styles.barVal}>{scores[k]}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Deep analysis gate */}
      <div style={styles.section}>
        <div style={styles.deepCard}>
          <div style={styles.deepTitle}>심층 분석</div>
          {deepUnlocked ? (
            <div style={styles.deepContent}>
              <div style={styles.insightBlock}>
                <div style={styles.insightLabel}>그림자</div>
                <p style={styles.insightText}>{desire.shadow}</p>
              </div>
              <div style={styles.insightBlock}>
                <div style={styles.insightLabel}>인사이트</div>
                <p style={styles.insightText}>{desire.insight}</p>
              </div>
            </div>
          ) : (
            <div style={styles.deepLocked}>
              <div style={styles.deepLockedText}>
                <div style={styles.blurRow}>그림자: {desire.shadow}</div>
                <div style={styles.blurRow}>인사이트: {desire.insight}</div>
              </div>
              <button
                style={{ ...styles.unlockButton, opacity: unlocking ? 0.6 : 1 }}
                onClick={handleUnlockDeep}
                disabled={unlocking}
              >
                {unlocking ? '광고 로딩 중...' : '광고 보고 잠금 해제'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Banner */}
      {!adFree && (
        <div style={styles.bannerWrap}>
          <BannerAd />
        </div>
      )}

      {/* IAP */}
      {!adFree && (
        <div style={styles.section}>
          <button
            style={{ ...styles.iapButton, opacity: purchasing ? 0.6 : 1 }}
            onClick={handleBuyAdFree}
            disabled={purchasing}
          >
            {purchasing ? '처리 중...' : '광고 없이 즐기기 ₩990'}
          </button>
        </div>
      )}

      {/* Actions */}
      <div style={styles.section}>
        <button style={styles.mapButton} onClick={onViewMap}>
          7일 욕망 지도 보기
        </button>
        <button style={styles.homeButton} onClick={onHome}>
          홈으로
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#0D0D0D',
    color: '#FFFFFF',
    paddingBottom: '40px',
  },
  hero: {
    padding: '56px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  resultBadge: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  heroEmoji: { fontSize: '72px', marginBottom: '16px' },
  heroLabel: { fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '6px' },
  heroHanja: { fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' },
  heroShort: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 },
  section: {
    padding: '0 20px',
    marginBottom: '24px',
  },
  fullDesc: {
    fontSize: '16px',
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.8)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  barEmoji: { fontSize: '18px', width: '24px', textAlign: 'center' },
  barLabel: { fontSize: '13px', fontWeight: 600, width: '70px', flexShrink: 0 },
  barTrack: {
    flex: 1,
    height: '6px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '99px',
    transition: 'width 0.6s ease',
  },
  barVal: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.5)',
    width: '16px',
    textAlign: 'right',
  },
  deepCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '20px',
  },
  deepTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  deepContent: {},
  insightBlock: { marginBottom: '16px' },
  insightLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#C0392B',
    marginBottom: '6px',
  },
  insightText: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.8)',
  },
  deepLocked: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  deepLockedText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  blurRow: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.3)',
    filter: 'blur(5px)',
    userSelect: 'none',
  },
  unlockButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #C0392B 0%, #8E44AD 100%)',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: 700,
    borderRadius: '12px',
  },
  bannerWrap: {
    padding: '0 20px',
    marginBottom: '16px',
  },
  iapButton: {
    width: '100%',
    padding: '12px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: '10px',
  },
  mapButton: {
    width: '100%',
    padding: '16px',
    background: 'rgba(192,57,43,0.15)',
    border: '1px solid rgba(192,57,43,0.3)',
    color: '#E74C3C',
    fontSize: '15px',
    fontWeight: 700,
    borderRadius: '12px',
    marginBottom: '12px',
  },
  homeButton: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '12px',
  },
};
