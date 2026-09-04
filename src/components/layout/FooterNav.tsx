import React from 'react';
import { ArrowLeft, ArrowRight, CornerDownLeft, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { KeyboardBadge } from '../ui/KeyboardBadge';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const FooterNav: React.FC = () => {
  const {
    currentIndex,
    totalSteps,
    goToNext,
    goToPrev,
    isCompleted,
    validationError,
    t,
  } = useQuestionnaire();

  if (isCompleted) return null;

  const isWelcome = currentIndex === 0;
  const isLastQuestion = currentIndex === totalSteps - 1;

  return (
    <footer className="sticky bottom-0 z-30 w-full backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col gap-2">
        {/* Validation notification banner */}
        {validationError && (
          <div className="text-center text-xs font-medium text-rose-600 dark:text-rose-400">
            {t('validationRequired')}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          {/* Back Button */}
          <div className="shrink-0">
            {!isWelcome ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPrev}
                iconLeft={<ArrowLeft className="w-4 h-4" />}
                className="text-slate-600 dark:text-zinc-300"
              >
                <span className="hidden sm:inline">{t('previousBtn')}</span>
              </Button>
            ) : (
              <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
                <span>{t('standardEval')}</span>
              </div>
            )}
          </div>

          {/* Center Keyboard hint */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 select-none">
            <span>Press</span>
            <KeyboardBadge keys="Enter ↵" />
            <span>{t('pressEnterToAdvance')}</span>
          </div>

          {/* Next / Submit Button */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => goToNext()}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="font-medium"
            >
              <span>
                {isWelcome
                  ? t('startBtn')
                  : isLastQuestion
                  ? t('submitBtn')
                  : t('nextBtn')}
              </span>
              <CornerDownLeft className="w-3.5 h-3.5 opacity-60 ml-0.5 hidden sm:inline" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
