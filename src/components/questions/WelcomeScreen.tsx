import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const WelcomeScreen: React.FC = () => {
  const {
    goToNext,
    studentName,
    setStudentName,
    answeredCount,
    resetQuestionnaire,
    sectionTitle,
    validationError,
    t,
  } = useQuestionnaire();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToNext();
    }
  };

  return (
    <div className="app-column py-8 sm:py-12 text-left">
      <h1 className="font-exam text-3xl sm:text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark mb-3">
        {t('welcomeHeading')}
      </h1>
      <p className="text-base text-muted dark:text-muted-dark max-w-prose mb-8 leading-relaxed">
        {t('welcomeSubtitle')}
      </p>

      <p className="text-sm text-ink dark:text-ink-dark mb-6">
        {t('randomBadge')} <span className="font-medium">{sectionTitle}</span>
      </p>

      <div className="w-full mb-4">
        <label htmlFor="student-name-input" className="block text-sm font-medium text-ink dark:text-ink-dark mb-1.5">
          {t('studentNameLabel')}
        </label>
        <input
          id="student-name-input"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(validationError)}
          aria-describedby="student-name-hint student-name-error"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('studentNamePlaceholder')}
          className="w-full px-3 py-3 rounded-md bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark text-ink dark:text-ink-dark placeholder:text-muted dark:placeholder:text-muted-dark text-base focus:outline-none focus:ring-2 focus:ring-stamp focus:border-stamp"
        />
        <p id="student-name-hint" className="mt-1.5 text-sm text-muted dark:text-muted-dark">
          {t('nameHint')}
        </p>
        <p id="student-name-error" role="alert" className="mt-1 text-sm text-stamp empty:hidden">
          {validationError}
        </p>
      </div>

      {answeredCount > 0 && (
        <div className="mb-5 p-3 border border-rule dark:border-rule-dark bg-sheet dark:bg-sheet-dark text-sm flex items-center justify-between gap-3">
          <span>{t('savedAnswersNotice', { count: answeredCount })}</span>
          <button
            type="button"
            onClick={resetQuestionnaire}
            className="text-stamp hover:underline flex items-center gap-1 font-medium shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetAll')}</span>
          </button>
        </div>
      )}

      <Button
        size="lg"
        variant="primary"
        onClick={() => goToNext()}
        iconRight={<ArrowRight className="w-4 h-4" />}
        className="w-full sm:w-auto"
      >
        {answeredCount > 0 ? t('resumeBtn') : t('beginBtn')}
      </Button>
    </div>
  );
};
