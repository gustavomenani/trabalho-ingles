import React, { useState } from 'react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';

export const RatingScaleQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, language, t } = useQuestionnaire();
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
  };

  const minLabel = language === 'pt' && question.minLabelPt ? question.minLabelPt : question.minLabel || '1';
  const maxLabel = language === 'pt' && question.maxLabelPt ? question.maxLabelPt : question.maxLabel || '10';

  return (
    <div className="w-full space-y-5">
      <div className="h-7 text-sm text-ink dark:text-ink-dark">
        {(hoveredValue !== null || currentValue !== undefined) && (
          <span>
            {t('selfRating')} {hoveredValue !== null ? hoveredValue : currentValue} / {max}
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2" role="radiogroup" aria-label={t('selfRating')}>
        {scaleItems.map((val) => {
          const isSelected = currentValue === val;
          const isHovered = hoveredValue === val;
          return (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(val)}
              onMouseEnter={() => setHoveredValue(val)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`flex items-center justify-center min-h-11 rounded-md font-semibold text-sm border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp ${
                isSelected
                  ? 'bg-stamp text-white border-stamp'
                  : isHovered
                    ? 'bg-sheet dark:bg-sheet-dark text-ink dark:text-ink-dark border-ink dark:border-ink-dark'
                    : 'bg-sheet dark:bg-sheet-dark text-ink dark:text-ink-dark border-rule dark:border-rule-dark'
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm text-muted dark:text-muted-dark px-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};
