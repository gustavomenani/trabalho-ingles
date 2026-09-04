import React from 'react';
import { Check } from 'lucide-react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../ui/Card';

export const MultipleChoiceQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, language, t } = useQuestionnaire();
  const { soundEnabled } = useTheme();
  const { playClick } = useSoundEffects(soundEnabled);

  const selectedValues = (answers[question.id] as string[]) || [];

  const handleToggle = (optionId: string) => {
    playClick();
    if (selectedValues.includes(optionId)) {
      setAnswer(
        question.id,
        selectedValues.filter((id) => id !== optionId)
      );
    } else {
      setAnswer(question.id, [...selectedValues, optionId]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Selected items count pill */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>{t('selectAllThatApply')}</span>
        {selectedValues.length > 0 && (
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            {t('itemsSelectedCount', { count: selectedValues.length })}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options?.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          const optionLabel = language === 'pt' && option.labelPt ? option.labelPt : option.label;
          const optionDesc =
            language === 'pt' && option.descriptionPt ? option.descriptionPt : option.description;

          return (
            <Card
              key={option.id}
              selected={isSelected}
              interactive
              onClick={() => handleToggle(option.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleToggle(option.id);
                }
              }}
              className="p-3.5 flex items-start gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {/* Checkbox box */}
              <div
                className={`shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Label & Description */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-slate-900 dark:text-white leading-snug">
                  {optionLabel}
                </div>
                {optionDesc && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {optionDesc}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
