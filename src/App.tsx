import React, { useState, useEffect, useRef } from 'react';
import { graniteEvent, closeView } from '@apps-in-toss/web-framework';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Map from './pages/Map';
import type { DesireKey } from './data/desires';
import { DESIRE_KEYS } from './data/desires';
import { getTodayStr } from './data/questions';
import { saveDayResult } from './utils/storage';
import { showInterstitialAd } from './utils/ads';
import { logGrowth } from './utils/growth';

type Screen = 'home' | 'quiz' | 'result' | 'map';

interface ResultData {
  dominant: DesireKey;
  scores: Partial<Record<DesireKey, number>>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [resultData, setResultData] = useState<ResultData | null>(null);

  // 내비게이션 바 뒤로가기: 첫 화면이면 종료, 그 외 화면은 첫 화면으로
  const screenRef = useRef(screen);
  screenRef.current = screen;
  useEffect(() => {
    try {
      const cleanup = graniteEvent.addEventListener('backEvent', {
        onEvent: () => {
          if (screenRef.current === 'home') void closeView();
          else setScreen('home');
        },
      });
      return () => { cleanup?.(); };
    } catch { return undefined; }
  }, []);

  async function handleQuizComplete(scores: Partial<Record<DesireKey, number>>) {
    // Find dominant desire
    const dominant = DESIRE_KEYS.reduce<DesireKey>(
      (best, k) => ((scores[k] ?? 0) > (scores[best] ?? 0) ? k : best),
      DESIRE_KEYS[0],
    );

    // Save result
    const today = getTodayStr();
    saveDayResult({ date: today, dominant, scores });
    logGrowth('test_complete', { dominant });
    setResultData({ dominant, scores });

    // Show interstitial before result
    await showInterstitialAd();
    setScreen('result');
  }

  return (
    <>
      {screen === 'home' && (
        <Home
          onStart={() => setScreen('quiz')}
          onViewMap={() => setScreen('map')}
        />
      )}
      {screen === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} />
      )}
      {screen === 'result' && resultData && (
        <Result
          dominant={resultData.dominant}
          scores={resultData.scores}
          totalQuestions={5}
          onHome={() => setScreen('home')}
          onViewMap={() => setScreen('map')}
        />
      )}
      {screen === 'map' && (
        <Map onBack={() => setScreen('home')} />
      )}
    </>
  );
}
