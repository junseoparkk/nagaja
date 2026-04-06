export type ResultType =
  | 'model'
  | 'legend'
  | 'jeju'
  | 'escaped'
  | 'jobhopper'
  | 'resume7'
  | 'quiet'
  | 'burnout'
  | 'noplan'
  | 'wallet';

export type Tendency = 'creative' | 'transfer' | 'escape' | 'noplan';

export interface QuizOption {
  label: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface TendencyOption {
  value: Tendency;
  label: string;
  description: string;
}

export interface ResultData {
  type: ResultType;
  title: string;
  subtitle: string;
  emoji: string;
  resignDate: string;
  body: string;
  color: string;
  docNum: string;
  dept: string;
  reason: string;
  grade: string;
  gradeColor: 'green' | 'yellow' | 'orange' | 'red';
  stampText: string;
  defaultPercent: number;
}
