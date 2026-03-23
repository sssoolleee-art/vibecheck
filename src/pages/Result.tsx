import React, { useEffect, useRef, useState } from 'react';
import { ResultType } from '../data/questions';

interface ResultProps {
  result: ResultType;
  onRetry: () => void;
}

export default function Result({ result, onRetry }: ResultProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(24px)';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, 80);
    }
  }, []);

  function handleShare() {
    const text = `나의 바이브 유형은 "${result.emoji} ${result.title}"!\n${result.subtitle}\n\n바이브체크에서 나도 해보기 👇`;
    if (navigator.share) {
      navigator.share({ title: '바이브체크', text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShowModal(true);
      });
    }
  }

  const gradientStyle = `linear-gradient(135deg, ${result.gradient[0]} 0%, ${result.gradient[1]} 100%)`;

  return (
    <div style={styles.container}>
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalSheet} onClick={(e) => e.stopPropagation()}>
            <p style={styles.modalEmoji}>⚡</p>
            <p style={styles.modalTitle}>복사됐어요!</p>
            <p style={styles.modalDesc}>친구에게 공유해 보세요</p>
            <button style={styles.modalButton} onClick={() => setShowModal(false)}>
              확인
            </button>
          </div>
        </div>
      )}
      <div ref={cardRef} style={styles.content}>
        {/* 상단 결과 카드 */}
        <div style={{ ...styles.heroCard, background: gradientStyle }}>
          <div style={styles.heroBadge}>MY VIBE TYPE</div>
          <span style={styles.heroEmoji}>{result.emoji}</span>
          <h1 style={styles.heroTitle}>{result.title}</h1>
          <p style={styles.heroSubtitle}>{result.subtitle}</p>
        </div>

        {/* 설명 */}
        <div style={styles.section}>
          <p style={styles.description}>{result.description}</p>
        </div>

        {/* 특성 태그 */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>나의 바이브 키워드</p>
          <div style={styles.tagsWrap}>
            {result.traits.map((trait) => (
              <span key={trait} style={{ ...styles.tag, color: result.color, background: `${result.color}12` }}>
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* 궁합 */}
        <div style={{ ...styles.vibeCard, borderColor: `${result.color}30` }}>
          <p style={styles.sectionLabel}>잘 맞는 바이브</p>
          <p style={styles.vibeText}>{result.vibeWith}</p>
        </div>

        {/* 팁 */}
        <div style={{ ...styles.tipCard, borderLeftColor: result.color }}>
          <p style={styles.tipLabel}>바이브 업그레이드 TIP</p>
          <p style={styles.tipText}>{result.tip}</p>
        </div>

        {/* 버튼 */}
        <div style={styles.buttonSection}>
          <button style={{ ...styles.shareButton, background: gradientStyle }} onClick={handleShare}>
            친구 바이브도 체크해보기 ⚡
          </button>
          <button style={styles.retryButton} onClick={onRetry}>
            다시 체크하기
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#F8F6FF',
  },
  content: {
    padding: '0 0 60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  heroCard: {
    padding: '48px 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '4px',
  },
  heroBadge: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    color: 'rgba(255,255,255,0.8)',
    background: 'rgba(255,255,255,0.2)',
    padding: '4px 12px',
    borderRadius: '99px',
    marginBottom: '4px',
  },
  heroEmoji: {
    fontSize: '64px',
    lineHeight: 1,
  },
  heroTitle: {
    fontSize: '30px',
    fontWeight: 900,
    color: '#FFFFFF',
    letterSpacing: '-0.5px',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 500,
  },
  section: {
    background: '#FFFFFF',
    padding: '20px',
    marginHorizontal: '0',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    color: '#9CA3AF',
    marginBottom: '12px',
    textTransform: 'uppercase' as const,
  },
  description: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: 1.75,
  },
  tagsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    padding: '6px 14px',
    borderRadius: '99px',
    fontSize: '13px',
    fontWeight: 600,
  },
  vibeCard: {
    background: '#FFFFFF',
    padding: '20px',
    border: '1px solid',
    marginHorizontal: '0',
  },
  vibeText: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: 1.6,
  },
  tipCard: {
    background: '#FFFFFF',
    padding: '20px',
    borderLeft: '3px solid',
    marginHorizontal: '0',
  },
  tipLabel: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '8px',
  },
  tipText: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: 1.6,
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '8px 20px 0',
  },
  shareButton: {
    width: '100%',
    padding: '18px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '14px',
    letterSpacing: '-0.3px',
    boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
  },
  retryButton: {
    width: '100%',
    padding: '17px',
    background: '#F3F4F6',
    color: '#6B7280',
    fontSize: '15px',
    fontWeight: 600,
    borderRadius: '14px',
  },
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  modalSheet: {
    width: '100%',
    background: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
    padding: '32px 24px 40px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
  },
  modalEmoji: {
    fontSize: '40px',
    marginBottom: '4px',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
  },
  modalDesc: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '16px',
  },
  modalButton: {
    width: '100%',
    padding: '16px',
    background: '#7C3AED',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '14px',
    marginTop: '8px',
  },
};
