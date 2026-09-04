import React from 'react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const TextFeedbackQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, language, t } = useQuestionnaire();

  const value = (answers[question.id] as string) || '';
  const maxLength = question.maxLength || 600;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(question.id, e.target.value);
  };

  const placeholderText =
    language === 'pt' && question.placeholderPt
      ? question.placeholderPt
      : question.placeholder || t('typeHere');

  return (
    <div className="w-full max-w-xl mx-auto space-y-3 text-left">
      <div className="relative">
        <textarea
          rows={5}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeholderText}
          className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent text-sm sm:text-base resize-none transition-all leading-relaxed shadow-xs"
          aria-label={language === 'pt' && question.titlePt ? question.titlePt : question.title}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 px-1">
        <span>
          {t('cmdEnterSubmit')}
        </span>
        <span>
          {value.length} / {maxLength} {t('chars')}
        </span>
      </div>
    </div>
  );
};
