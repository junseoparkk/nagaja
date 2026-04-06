'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, TENDENCY_OPTIONS } from '@/data/questions';
import type { Tendency } from '@/types';

type Step = 'name' | 'quiz' | 'tendency';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  function handleNameSubmit(inputName: string) {
    setName(inputName);
    setStep('quiz');
  }

  function handleAnswer(score: number) {
    const nextScore = totalScore + score;
    if (questionIndex < QUESTIONS.length - 1) {
      setTotalScore(nextScore);
      setQuestionIndex(questionIndex + 1);
    } else {
      setTotalScore(nextScore);
      setStep('tendency');
    }
  }

  function handleTendency(tendency: Tendency) {
    const params = new URLSearchParams({
      score: String(totalScore),
      tendency,
      ...(name ? { name } : {}),
    });
    router.push(`/loading?${params.toString()}`);
  }

  const progress =
    step === 'name'
      ? 0
      : step === 'quiz'
        ? Math.round(((questionIndex + 1) / (QUESTIONS.length + 1)) * 100)
        : 100;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-zinc-400">
            <span>
              {step === 'name'
                ? '이름 입력'
                : step === 'quiz'
                  ? `${questionIndex + 1} / ${QUESTIONS.length}`
                  : '마지막 질문'}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-1.5 rounded-full bg-zinc-900 transition-all duration-300 dark:bg-zinc-50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 'name' && (
          <NameStep onSubmit={handleNameSubmit} />
        )}
        {step === 'quiz' && (
          <QuizStep
            question={QUESTIONS[questionIndex]}
            onAnswer={handleAnswer}
          />
        )}
        {step === 'tendency' && (
          <TendencyStep onSelect={handleTendency} />
        )}
      </div>
    </div>
  );
}

function NameStep({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-4xl">👋</span>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          먼저, 이름을 알려주세요
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          결과 카드에 표시됩니다. 건너뛰어도 됩니다.
        </p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(value.trim());
        }}
        placeholder="이름 또는 닉네임"
        maxLength={10}
        className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-50"
      />
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onSubmit(value.trim())}
          className="flex h-14 w-full items-center justify-center rounded-full bg-zinc-900 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          시작하기
        </button>
        <button
          onClick={() => onSubmit('')}
          className="flex h-10 w-full items-center justify-center rounded-full text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function QuizStep({
  question,
  onAnswer,
}: {
  question: (typeof QUESTIONS)[number];
  onAnswer: (score: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
          {question.text}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.score}
            onClick={() => onAnswer(option.score)}
            className="flex min-h-[56px] w-full items-center rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-50 dark:hover:bg-zinc-800"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TendencyStep({ onSelect }: { onSelect: (t: Tendency) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
          퇴사한다면, 그 다음은?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          솔직하게 하나만 골라주세요
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {TENDENCY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left transition-colors hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-50 dark:hover:bg-zinc-800"
          >
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {opt.label}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {opt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
