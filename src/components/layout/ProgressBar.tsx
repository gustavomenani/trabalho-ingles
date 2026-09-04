import React from 'react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const ProgressBar: React.FC = () => {
  const { currentIndex, totalSteps, isCompleted, t } = useQuestionnaire();

  const questionTotal = Math.max(1, totalSteps - 1);
  const progressPercent = isCompleted ? 100 : currentIndex === 0 ? 0 : Math.round((currentIndex / questionTotal) * 100);

  if (currentIndex === 0 || isCompleted) return null;

  return (
    <div
      className="app-chrome w-full h-0.5 bg-rule dark:bg-rule-dark shrink-0"
      role="progressbar"
      aria-valuenow={progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('questionProgress', { current: currentIndex, total: questionTotal })}
    >
      <div className="h-full bg-stamp transition-[width] duration-300 ease-out" style={{ width: `${progressPercent}%` }} />
    </div>
  );
};
