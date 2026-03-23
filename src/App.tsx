import React, { useState } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { calculateResult } from './data/questions';
import type { ResultType } from './data/questions';

type Screen = 'home' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [result, setResult] = useState<ResultType | null>(null);

  function handleStart() {
    setScreen('quiz');
  }

  function handleComplete(answers: Record<number, number>) {
    const r = calculateResult(answers);
    setResult(r);
    setScreen('result');
  }

  function handleRetry() {
    setResult(null);
    setScreen('home');
  }

  return (
    <>
      {screen === 'home' && <Home onStart={handleStart} />}
      {screen === 'quiz' && (
        <Quiz onComplete={handleComplete} onBack={() => setScreen('home')} />
      )}
      {screen === 'result' && result && (
        <Result result={result} onRetry={handleRetry} />
      )}
    </>
  );
}
