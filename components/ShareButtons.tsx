'use client';

import { RefObject, useState } from 'react';
import type { ResultData } from '@/types';

interface ShareButtonsProps {
  cardRef: RefObject<HTMLDivElement | null>;
  result: ResultData;
  name: string;
}

export default function ShareButtons({ cardRef, result, name }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const shareText = name
    ? `${name}의 예상 퇴사일은 "${result.resignDate}"! 나는 "${result.title}" 유형 ${result.emoji}`
    : `내 예상 퇴사일은 "${result.resignDate}"! 나는 "${result.title}" 유형 ${result.emoji}`;

  const pageUrl = typeof window !== 'undefined' ? window.location.origin : '';

  async function handleSaveImage() {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = '내-퇴사일.png';
      link.href = dataUrl;
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  }

  function handleTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\n' + pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleThreads() {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + '\n\n' + pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('링크 복사에 실패했습니다.');
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-center text-xs text-zinc-400">결과 공유하기</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
        >
          <span>{saving ? '⏳' : '📸'}</span>
          {saving ? '저장 중...' : '이미지 저장'}
        </button>

        <button
          onClick={handleCopyLink}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
        >
          <span>{copied ? '✅' : '🔗'}</span>
          {copied ? '복사됨!' : '링크 복사'}
        </button>

        <button
          onClick={handleTwitter}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
        >
          <span>🐦</span>
          트위터
        </button>

        <button
          onClick={handleThreads}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
        >
          <span>🧵</span>
          스레드
        </button>
      </div>
    </div>
  );
}
