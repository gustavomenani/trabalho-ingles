import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { KeyboardBadge } from '../ui/KeyboardBadge';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const FooterNav: React.FC = () => {
  const { currentIndex, totalSteps, goToNext, goToPrev, isCompleted, validationError, t } =
    useQuestionnaire();

  if (isCompleted || currentIndex === 0) return null;

  const isLastQuestion = currentIndex === totalSteps - 1;

  return (
    <footer className="app-chrome shrink-0 z-30 w-full bg-paper/95 dark:bg-paper-dark/95 border-t border-rule dark:border-rule-dark">
      <div className="app-column py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col gap-2">
        <div role="alert" aria-live="polite" className="text-center text-sm font-medium text-stamp empty:hidden">
          {validationError}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div className="col-start-1 justify-self-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrev}
              iconLeft={<ArrowLeft className="w-4 h-4" />}
              aria-label={t('previousBtn')}
            >
              <span className="hidden sm:inline">{t('previousBtn')}</span>
            </Button>
          </div>

          <div className="col-start-2 hidden md:flex items-center gap-2 text-sm text-muted dark:text-muted-dark select-none">
            <span>{t('pressKey')}</span>
            <KeyboardBadge keys="Enter" />
            <span>{t('pressEnterToAdvance')}</span>
          </div>

          <div className="col-start-3 justify-self-end">
            <Button variant="primary" size="md" onClick={() => goToNext()} iconRight={<ArrowRight className="w-4 h-4" />}>
              {isLastQuestion ? t('submitBtn') : t('nextBtn')}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
