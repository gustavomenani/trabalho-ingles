import React, { useState } from 'react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';

export const RatingScaleQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, goToNext, language, t } = useQuestionnaire();
  const { soundEnabled } = useTheme();
  const { playClick } = useSoundEffects(soundEnabled);

  const min = question.min ?? 1;
  const max = question.max ?? 10;
  const currentValue = answers[question.id] as number | undefined;

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const scaleItems = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleSelect = (val: number) => {
    playClick();
    setAnswer(question.id, val);
    setTimeout(() => {
      goToNext({ questionId: question.id, value: val });
    }, 120);
  };

  const minLabel = language === 'pt' && question.minLabelPt ? question.minLabelPt : question.minLabel || '1';
  const maxLabel = language === 'pt' && question.maxLabelPt ? question.maxLabelPt : question.maxLabel || '10';

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Current selection highlight */}
      <div className="text-center h-7">
        {(hoveredValue !== null || currentValue !== undefined) && (
          <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold border border-slate-200 dark:border-zinc-700">
            {t('selfRating')}{' '}
            <strong className="text-sm">
              {hoveredValue !== null ? hoveredValue : currentValue} / {max}
            </strong>
          </span>
        )}
      </div>

      {/* Button Row */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {scaleItems.map((val) => {
          const isSelected = currentValue === val;
          const isHovered = hoveredValue === val;

          return (
            <button
              key={val}
              type="button"
              onClick={() => handleSelect(val)}
              onMouseEnter={() => setHoveredValue(val)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`relative flex flex-col items-center justify-center h-13 sm:h-14 rounded-xl font-semibold text-sm sm:text-base transition-all transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white border cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-xs'
                  : isHovered
                  ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 border-slate-300 dark:border-zinc-600'
                  : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800'
              }`}
            >
              <span>{val}</span>
              <span className="text-[10px] font-mono font-normal opacity-50 mt-0.5">
                {val === 10 ? '0' : val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Extreme labels */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-1 font-medium">
        <span>← {minLabel}</span>
        <span>{maxLabel} →</span>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-zinc-500">
        {t('scaleKeyboardHint')}
      </p>
    </div>
  );
};
