'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { scoreToType } from '@/data/utils';
import type { Tendency } from '@/types';
import { Suspense } from 'react';

const LOADING_MESSAGES = [
  '퇴사 욕구를 분석 중입니다...',
  '인내심 수치를 측정하고 있습니다...',
  '월급날까지 버틸 수 있을지 계산 중...',
  '상사 참을성 지수를 산출하고 있습니다...',
  '당신의 사직서를 작성 중입니다...',
  '퇴사일을 특정하고 있습니다...',
];

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messageIndex, setMessageIndex] = useState(0);

  const score = Number(searchParams.get('score') ?? '0');
  const tendency = (searchParams.get('tendency') ?? 'noplan') as Tendency;
  const name = searchParams.get('name') ?? '';

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const type = scoreToType(score, tendency);
      const params = new URLSearchParams({ type, ...(name ? { name } : {}) });
      router.push(`/result?${params.toString()}`);
    }, 3500);
    return () => clearTimeout(timer);
  }, [router, score, tendency, name]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
          <span className="text-2xl">📋</span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 transition-all duration-300">
            {LOADING_MESSAGES[messageIndex]}
          </p>
          <p className="text-sm text-zinc-400">
            결과를 계산하는 중입니다
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoadingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
        </div>
      }
    >
      <LoadingContent />
    </Suspense>
  );
}
