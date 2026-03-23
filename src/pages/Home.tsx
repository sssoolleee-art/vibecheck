import React from 'react';

interface HomeProps {
  onStart: () => void;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div style={styles.badge}>PERSONALITY TEST</div>
        <h1 style={styles.title}>나의 바이브<br />유형은?</h1>
        <p style={styles.subtitle}>8가지 질문으로 알아보는<br />나만의 에너지 타입</p>
      </div>

      <div style={styles.cardSection}>
        {[
          { emoji: '🔥', label: '파이어 바이브', color: '#FFF4EE', border: '#FED7AA' },
          { emoji: '🌊', label: '웨이브 바이브', color: '#EFF8FF', border: '#BAE6FD' },
          { emoji: '⚡', label: '스파크 바이브', color: '#F5F3FF', border: '#DDD6FE' },
          { emoji: '🌙', label: '딥 바이브', color: '#EEF2FF', border: '#C7D2FE' },
        ].map((type) => (
          <div key={type.label} style={{ ...styles.typeCard, background: type.color, borderColor: type.border }}>
            <span style={styles.typeEmoji}>{type.emoji}</span>
            <span style={styles.typeLabel}>{type.label}</span>
          </div>
        ))}
      </div>

      <div style={styles.bottomSection}>
        <div style={styles.infoRow}>
          <span style={styles.infoItem}>⏱️ 약 2분</span>
          <span style={styles.dot} />
          <span style={styles.infoItem}>8문항</span>
          <span style={styles.dot} />
          <span style={styles.infoItem}>4가지 유형</span>
        </div>
        <button style={styles.startButton} onClick={onStart}>
          바이브 체크하기
        </button>
        <p style={styles.disclaimer}>* 재미로 즐기는 성향 테스트예요</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#F8F6FF',
    padding: '0 20px 48px',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '56px',
    paddingBottom: '36px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    color: '#7C3AED',
    background: '#EDE9FE',
    padding: '5px 12px',
    borderRadius: '99px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 900,
    color: '#0F0A2A',
    lineHeight: 1.2,
    marginBottom: '14px',
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: 1.6,
  },
  cardSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '40px',
  },
  typeCard: {
    borderRadius: '14px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid',
  },
  typeEmoji: {
    fontSize: '22px',
  },
  typeLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
  },
  bottomSection: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoItem: {
    fontSize: '13px',
    color: '#9CA3AF',
  },
  dot: {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    background: '#D1D5DB',
  },
  startButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
    color: '#FFFFFF',
    fontSize: '17px',
    fontWeight: 700,
    borderRadius: '14px',
    letterSpacing: '-0.3px',
    boxShadow: '0 4px 24px rgba(124, 58, 237, 0.35)',
  },
  disclaimer: {
    fontSize: '12px',
    color: '#9CA3AF',
  },
};
