'use client';

import { useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RESULTS } from '@/data/results';
import { scoreToPercent } from '@/data/utils';
import ResignationCard from '@/components/ResignationCard';
import ShareButtons from '@/components/ShareButtons';
import type { ResultType } from '@/types';

function ResultContent() {
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);

  const type = (searchParams.get('type') ?? 'model') as ResultType;
  const name = searchParams.get('name') ?? '';
  const scoreParam = searchParams.get('score');
  const score = scoreParam !== null ? Number(scoreParam) : null;

  const result = RESULTS[type] ?? RESULTS['model'];
  const percent = score !== null ? scoreToPercent(score) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 px-5 py-8 dark:bg-zinc-950">
      <div className="flex w-full max-w-sm flex-col gap-4">
        {/* Resignation card */}
        <ResignationCard ref={cardRef} result={result} name={name} percent={percent} />

        {/* Share buttons */}
        <ShareButtons cardRef={cardRef} result={result} name={name} />

        {/* Retry */}
        <div className="flex items-center justify-center gap-4 pb-4">
          <Link
            href="/quiz"
            className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-300"
          >
            다시 테스트하기
          </Link>
          <span className="text-zinc-600">·</span>
          <Link
            href="/"
            className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-300"
          >
            처음으로
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
