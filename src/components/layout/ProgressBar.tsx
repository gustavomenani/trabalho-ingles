import React from 'react';
import { Clock } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const ProgressBar: React.FC = () => {
  const { currentIndex, totalSteps, isCompleted, t } = useQuestionnaire();

  const progressPercent = isCompleted
    ? 100
    : currentIndex === 0
    ? 0
    : Math.round((currentIndex / (totalSteps - 1)) * 100);

  const remainingQuestions = Math.max(0, totalSteps - 1 - currentIndex);
  const remainingMins = Math.max(1, Math.ceil((remainingQuestions * 30) / 60));

  if (currentIndex === 0 || isCompleted) return null;

  return (
    <div className="w-full bg-slate-50/80 dark:bg-zinc-950/80 border-b border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-300 mb-1.5 font-medium select-none">
          <span>
            {progressPercent}% {t('completed')}
          </span>
          <div className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>
              ~{remainingMins} {t('minRemaining')}
            </span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-slate-900 dark:from-indigo-400 dark:via-indigo-300 dark:to-white rounded-full shadow-[0_0_8px_rgba(99,102,241,0.35)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
