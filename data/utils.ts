import type { ResultType, Tendency } from '@/types';

export function scoreToPercent(score: number): number {
  return Math.min(Math.round((score / 21) * 99), 99);
}

export function scoreToType(score: number, tendency: Tendency): ResultType {
  if (score <= 7) return 'model';
  if (score >= 19) return 'legend';

  const isHigh = score >= 14;

  switch (tendency) {
    case 'creative':
      return isHigh ? 'escaped' : 'jeju';
    case 'transfer':
      return isHigh ? 'resume7' : 'jobhopper';
    case 'escape':
      return isHigh ? 'burnout' : 'quiet';
    case 'noplan':
      return isHigh ? 'wallet' : 'noplan';
  }
}
