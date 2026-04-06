import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <main className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-6xl">📋</span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            내 퇴사일은 언제일까?
          </h1>
          <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            8개의 질문으로 알아보는
            <br />
            나의 예상 퇴사일
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <Link
            href="/quiz"
            className="flex h-14 w-full items-center justify-center rounded-full bg-zinc-900 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            퇴사일 계산하기 →
          </Link>
          <p className="text-xs text-zinc-400">
            소요 시간 약 1분 · 개인정보 수집 없음
          </p>
        </div>
      </main>
    </div>
  );
}
