import type { DesireKey } from '../data/desires';

const STORAGE_KEY = 'desireindex_results';

export interface DayResult {
  date: string; // YYYY-MM-DD
  dominant: DesireKey;
  scores: Partial<Record<DesireKey, number>>;
}

function loadAll(): DayResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(results: DayResult[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function saveDayResult(result: DayResult) {
  const all = loadAll();
  const idx = all.findIndex(r => r.date === result.date);
  if (idx >= 0) {
    all[idx] = result;
  } else {
    all.push(result);
  }
  // keep last 30 days only
  all.sort((a, b) => a.date.localeCompare(b.date));
  saveAll(all.slice(-30));
}

export function getTodayResult(dateStr: string): DayResult | null {
  return loadAll().find(r => r.date === dateStr) ?? null;
}

export function getLast7Days(todayStr: string): (DayResult | null)[] {
  const all = loadAll();
  const result: (DayResult | null)[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStr);
    d.setDate(d.getDate() - i);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    result.push(all.find(r => r.date === ds) ?? null);
  }
  return result;
}

export function getStreak(todayStr: string): number {
  const all = loadAll();
  let streak = 0;
  let d = new Date(todayStr);
  while (true) {
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (all.some(r => r.date === ds)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
