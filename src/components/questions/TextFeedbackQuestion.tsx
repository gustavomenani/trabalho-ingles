import React from 'react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent);
}

export const TextFeedbackQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, language, t } = useQuestionnaire();
  const value = (answers[question.id] as string) || '';
  const maxLength = question.maxLength || 600;
  const placeholderText =
    language === 'pt' && question.placeholderPt ? question.placeholderPt : question.placeholder || t('typeHere');

  return (
    <div className="w-full space-y-3 text-left">
      <textarea
        rows={5}
        value={value}
        onChange={(e) => setAnswer(question.id, e.target.value)}
        maxLength={maxLength}
        placeholder={placeholderText}
        className="w-full p-4 rounded-md bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark text-ink dark:text-ink-dark placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-stamp text-base resize-none leading-relaxed"
        aria-label={language === 'pt' && question.titlePt ? question.titlePt : question.title}
      />
      <div className="flex items-center justify-between text-sm text-muted dark:text-muted-dark px-1">
        <span>{t(isApplePlatform() ? 'cmdEnterSubmit' : 'ctrlEnterSubmit')}</span>
        <span>
          {value.length} / {maxLength} {t('chars')}
        </span>
      </div>
    </div>
  );
};
