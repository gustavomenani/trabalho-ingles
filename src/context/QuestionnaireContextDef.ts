import { createContext } from 'react';
import type { Question, AnswersState, AnswerValue, Language } from '../types/questionnaire';

export interface QuestionnaireContextType {
  questions: Question[];
  currentSectionId: number;
  sectionTitle: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  randomizeSection: () => void;
  currentIndex: number;
  currentQuestion: Question | null;
  totalSteps: number;
  answeredCount: number;
  direction: number; // 1 = forward, -1 = backward
  answers: AnswersState;
  isCompleted: boolean;
  validationError: string | null;
  studentName: string;
  setStudentName: (name: string) => void;
  startTime: number | null;
  elapsedSeconds: number;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  goToNext: (instantOverride?: { questionId: string; value: AnswerValue }) => boolean;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
  goHome: (confirmIfDirty?: boolean) => void;
  resetQuestionnaire: () => void;
  exportAnswersJson: () => void;
  isReviewOpen: boolean;
  setIsReviewOpen: (open: boolean) => void;
  isHomeConfirmOpen: boolean;
  setIsHomeConfirmOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);
