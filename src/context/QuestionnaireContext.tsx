import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AnswersState, AnswerValue, Language } from '../types/questionnaire';
import {
  QUESTION_SECTIONS,
  getSectionById,
  getRandomSectionId,
  calculateAssignmentGrade,
} from '../data/sampleQuestions';
import { UI_TRANSLATIONS } from '../data/translations';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useTheme } from '../hooks/useTheme';
import { QuestionnaireContext } from './QuestionnaireContextDef';

const STORAGE_KEY = 'etec_en_answers_v1';
const STEP_KEY = 'etec_en_step_v1';
const NAME_KEY = 'etec_en_student_name_v1';
const TIME_KEY = 'etec_en_elapsed_v1';
const SECTION_KEY = 'etec_en_section_v1';
const START_TIME_KEY = 'etec_en_start_v1';
const LANG_KEY = 'etec_en_language_v1';

function hasFullName(name: string): boolean {
  return name.trim().split(/\s+/).filter(Boolean).length >= 2;
}

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { soundEnabled } = useTheme();
  const { playSelect, playSlide, playSuccess, playAlert } = useSoundEffects(soundEnabled);

  // Section ID: picked randomly on fresh load, or preserved if student is mid-assignment
  const [currentSectionId, setCurrentSectionId] = useState<number>(() => {
    try {
      const savedStep = localStorage.getItem(STEP_KEY);
      const parsedStep = savedStep ? parseInt(savedStep, 10) : 0;
      if (parsedStep > 0) {
        const savedSec = localStorage.getItem(SECTION_KEY);
        const parsedSec = savedSec ? parseInt(savedSec, 10) : null;
        if (parsedSec && parsedSec >= 1 && parsedSec <= QUESTION_SECTIONS.length) {
          return parsedSec;
        }
      }
      const randomSec = getRandomSectionId();
      localStorage.setItem(SECTION_KEY, String(randomSec));
      return randomSec;
    } catch {
      return getRandomSectionId();
    }
  });

  const currentSection = getSectionById(currentSectionId);
  const questions = currentSection.questions;

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem(NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [answers, setAnswers] = useState<AnswersState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Keep a synchronous ref to answers so immediate actions (clicks, timeouts) never read stale state
  const answersRef = useRef<AnswersState>(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STEP_KEY);
      const parsed = saved ? parseInt(saved, 10) : 0;
      return isNaN(parsed) || parsed < 0 || parsed > questions.length ? 0 : parsed;
    } catch {
      return 0;
    }
  });

  const [startTime, setStartTime] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(START_TIME_KEY);
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(TIME_KEY);
      const parsed = saved ? parseInt(saved, 10) : 0;
      return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    } catch {
      return 0;
    }
  });

  // Language state: 'en' or 'pt'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved === 'pt' || saved === 'en' ? saved : 'pt';
    } catch {
      return 'pt';
    }
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'pt' : 'en';
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let text = UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return text;
    },
    [language]
  );

  const [direction, setDirection] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isHomeConfirmOpen, setIsHomeConfirmOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SECTION_KEY, String(currentSectionId));
    } catch {
      // ignore
    }
  }, [currentSectionId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, String(currentIndex));
    } catch {
      // ignore
    }
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(NAME_KEY, studentName);
    } catch {
      // ignore
    }
  }, [studentName]);

  const currentQuestion = currentIndex < questions.length ? questions[currentIndex] : null;
  const isCompleted = currentIndex >= questions.length;

  const answeredCount = questions.filter(
    (q) => q.type !== 'welcome' && answers[q.id] !== undefined && answers[q.id] !== ''
  ).length;

  const totalSteps = questions.length;

  const randomizeSection = useCallback(() => {
    let nextId = getRandomSectionId();
    if (QUESTION_SECTIONS.length > 1 && nextId === currentSectionId) {
      nextId = (currentSectionId % QUESTION_SECTIONS.length) + 1;
    }
    answersRef.current = {};
    setCurrentSectionId(nextId);
    setAnswers({});
    setCurrentIndex(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setValidationError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
      localStorage.removeItem(TIME_KEY);
      localStorage.removeItem(START_TIME_KEY);
      localStorage.setItem(SECTION_KEY, String(nextId));
    } catch {
      // ignore
    }
    playSelect();
  }, [
    currentSectionId,
    playSelect,
    setCurrentSectionId,
    setAnswers,
    setCurrentIndex,
    setStartTime,
    setElapsedSeconds,
    setValidationError,
  ]);

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    // Update ref immediately and synchronously so any fast auto-advance reads the fresh value
    answersRef.current = {
      ...answersRef.current,
      [questionId]: value,
    };
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setValidationError(null);
  }, [setAnswers, setValidationError]);

  const validateCurrent = useCallback(
    (instantOverride?: { questionId: string; value: AnswerValue }): boolean => {
      if (!currentQuestion) return true;
      if (currentQuestion.type === 'welcome') {
        if (!hasFullName(studentName)) {
          setValidationError(t('nameRequired'));
          playAlert();
          return false;
        }
        setValidationError(null);
        return true;
      }

      if (currentQuestion.required) {
        let ans = answersRef.current[currentQuestion.id];
        if (instantOverride && instantOverride.questionId === currentQuestion.id) {
          ans = instantOverride.value;
        }
        if (ans === undefined || ans === '' || (Array.isArray(ans) && ans.length === 0)) {
          setValidationError(t('validationRequired'));
          playAlert();
          return false;
        }
      }
      setValidationError(null);
      return true;
    },
    [currentQuestion, playAlert, setValidationError, studentName, t]
  );

  const goToNext = useCallback(
    (instantOverride?: { questionId: string; value: AnswerValue }): boolean => {
      if (isTransitioningRef.current) return false;
      if (!validateCurrent(instantOverride)) return false;

      if (currentIndex < questions.length) {
        isTransitioningRef.current = true;
        setDirection(1);
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);

        // Set start time when beginning from welcome screen (0 -> 1)
        if (currentIndex === 0) {
          const now = Date.now();
          setStartTime(now);
          try {
            localStorage.setItem(START_TIME_KEY, String(now));
          } catch {
            // ignore
          }
        }

        // Finalize elapsed time when reaching completion screen
        if (nextIdx === questions.length) {
          let finalElapsed = elapsedSeconds;
          if (startTime) {
            finalElapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
          }
          setElapsedSeconds(finalElapsed);
          try {
            localStorage.setItem(TIME_KEY, String(finalElapsed));
          } catch {
            // ignore
          }
          playSuccess();
        } else {
          playSlide('next');
        }

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 160);
        return true;
      }
      return false;
    },
    [
      currentIndex,
      questions.length,
      validateCurrent,
      startTime,
      elapsedSeconds,
      playSlide,
      playSuccess,
      setDirection,
      setCurrentIndex,
      setStartTime,
      setElapsedSeconds,
    ]
  );

  const goToPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (currentIndex > 0) {
      isTransitioningRef.current = true;
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setValidationError(null);
      playSlide('prev');

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 160);
    }
  }, [currentIndex, playSlide, setDirection, setCurrentIndex, setValidationError]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioningRef.current) return;
      if (index >= 0 && index <= questions.length) {
        isTransitioningRef.current = true;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        setValidationError(null);
        setIsReviewOpen(false);
        setIsHomeConfirmOpen(false);
        playSlide(index > currentIndex ? 'next' : 'prev');

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 160);
      }
    },
    [
      currentIndex,
      questions.length,
      playSlide,
      setDirection,
      setCurrentIndex,
      setValidationError,
      setIsReviewOpen,
      setIsHomeConfirmOpen,
    ]
  );

  const goHome = useCallback(
    (confirmIfDirty: boolean = true) => {
      if (currentIndex === 0) return;

      if (confirmIfDirty && answeredCount > 0 && !isCompleted) {
        setIsHomeConfirmOpen(true);
        return;
      }

      goToIndex(0);
    },
    [currentIndex, answeredCount, isCompleted, goToIndex, setIsHomeConfirmOpen]
  );

  const resetQuestionnaire = useCallback(() => {
    const newSecId = getRandomSectionId();
    answersRef.current = {};
    setCurrentSectionId(newSecId);
    setAnswers({});
    setCurrentIndex(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setDirection(-1);
    setValidationError(null);
    setIsHomeConfirmOpen(false);
    setIsReviewOpen(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
      localStorage.removeItem(TIME_KEY);
      localStorage.removeItem(START_TIME_KEY);
      localStorage.setItem(SECTION_KEY, String(newSecId));
    } catch {
      // ignore
    }
    playSelect();
  }, [
    playSelect,
    setCurrentSectionId,
    setAnswers,
    setCurrentIndex,
    setStartTime,
    setElapsedSeconds,
    setDirection,
    setValidationError,
    setIsHomeConfirmOpen,
    setIsReviewOpen,
  ]);

  const exportAnswersJson = useCallback(() => {
    let finalElapsed = elapsedSeconds;
    if (startTime && (!finalElapsed || finalElapsed === 0)) {
      finalElapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    }

    const grade = calculateAssignmentGrade(
      answers,
      questions,
      studentName,
      finalElapsed,
      currentSection.title
    );
    const mins = Math.floor(finalElapsed / 60);
    const secs = finalElapsed % 60;

    const data = {
      institution: 'Etec de Araçatuba',
      instructor: 'Prof. Fausto Shell',
      assignment: 'English Language & Academic Skills Assignment',
      section: currentSection.title,
      studentName: studentName.trim() || 'Anonymous Student',
      completedAt: new Date().toISOString(),
      timeTaken: `${mins}m ${secs}s`,
      grade: {
        score: grade.score,
        total: grade.totalQuestions,
        percentage: `${grade.percentage}%`,
        letterGrade: grade.letterGrade,
        cefrLevel: grade.cefrLevel,
      },
      responses: Object.entries(answers).map(([qId, value]) => {
        const q = questions.find((item) => item.id === qId);
        return {
          questionId: qId,
          title: q ? q.title : qId,
          category: q ? q.category : 'General',
          studentAnswer: value,
          correctAnswer: q?.correctAnswer,
          isCorrect: q?.correctAnswer ? value === q.correctAnswer : undefined,
          ruleExplanation: q?.explanation,
        };
      }),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = (studentName.trim() || 'student').toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `english-assignment-etec-${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [answers, questions, studentName, elapsedSeconds, startTime, currentSection.title]);

  return (
    <QuestionnaireContext.Provider
      value={{
        questions,
        currentSectionId,
        sectionTitle: language === 'pt' && currentSection.titlePt ? currentSection.titlePt : currentSection.title,
        language,
        setLanguage,
        toggleLanguage,
        t,
        randomizeSection,
        currentIndex,
        currentQuestion,
        totalSteps,
        answeredCount,
        direction,
        answers,
        isCompleted,
        validationError,
        studentName,
        setStudentName,
        startTime,
        elapsedSeconds,
        setAnswer,
        goToNext,
        goToPrev,
        goToIndex,
        goHome,
        resetQuestionnaire,
        exportAnswersJson,
        isReviewOpen,
        setIsReviewOpen,
        isHomeConfirmOpen,
        setIsHomeConfirmOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
