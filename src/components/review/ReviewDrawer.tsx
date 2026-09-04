import React, { useRef } from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export const ReviewDrawer: React.FC = () => {
  const { questions, currentIndex, answers, goToIndex, isReviewOpen, setIsReviewOpen, language, t } =
    useQuestionnaire();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isReviewOpen, panelRef);

  if (!isReviewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="review-drawer-title">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 dark:bg-black/60 cursor-default"
        aria-label={t('closeReview')}
        onClick={() => setIsReviewOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          ref={panelRef}
          className="w-full sm:w-96 max-w-md bg-sheet dark:bg-sheet-dark shadow-[0_8px_24px_rgba(51,51,51,0.2)] border-l border-rule dark:border-rule-dark flex flex-col"
        >
          <div className="px-4 sm:px-6 py-4 border-b border-rule dark:border-rule-dark flex items-center justify-between">
            <div>
              <h2 id="review-drawer-title" className="font-exam text-lg font-semibold text-ink dark:text-ink-dark">
                {t('reviewDrawerTitle')}
              </h2>
              <p className="text-sm text-muted dark:text-muted-dark mt-0.5">{t('jumpDirectly')}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewOpen(false)}
              className="p-2 rounded-md text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
              aria-label={t('closeReview')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3">
            {questions
              .filter((q) => q.type !== 'welcome')
              .map((q, idx) => {
                const questionStepIndex = idx + 1;
                const answer = answers[q.id];
                const hasAnswer =
                  answer !== undefined && answer !== '' && (!Array.isArray(answer) || answer.length > 0);
                const isCurrent = currentIndex === questionStepIndex;
                let answerDisplay = t('notAnsweredYet');
                if (hasAnswer) {
                  if (Array.isArray(answer)) {
                    answerDisplay = `${answer.length} ${t('itemsSelected')}`;
                  } else if (q.type === 'rating-scale') {
                    answerDisplay = t('scoreReview', { score: String(answer) });
                  } else if (q.type === 'single-choice') {
                    const opt = q.options?.find((o) => o.id === answer);
                    answerDisplay = opt
                      ? language === 'pt' && opt.labelPt
                        ? opt.labelPt
                        : opt.label
                      : String(answer);
                  } else {
                    answerDisplay = String(answer).slice(0, 40) + (String(answer).length > 40 ? '...' : '');
                  }
                }

                const displayTitle = language === 'pt' && q.titlePt ? q.titlePt : q.title;
                const displayCategory = language === 'pt' && q.categoryPt ? q.categoryPt : q.category;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => goToIndex(questionStepIndex)}
                    className={`w-full text-left py-3.5 px-3 my-1 rounded-md cursor-pointer flex items-start gap-3 ${
                      isCurrent ? 'bg-paper dark:bg-paper-dark border border-rule dark:border-rule-dark' : 'hover:bg-paper dark:hover:bg-paper-dark'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">
                      {hasAnswer ? (
                        <CheckCircle2 className="w-4 h-4 text-stamp" />
                      ) : (
                        <Circle className="w-4 h-4 text-rule dark:text-rule-dark" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-muted dark:text-muted-dark">
                        {t('itemLabel')} {questionStepIndex}
                        {displayCategory ? ` · ${displayCategory}` : ''}
                      </span>
                      <span className="block text-sm font-medium text-ink dark:text-ink-dark truncate">
                        {displayTitle}
                      </span>
                      <span
                        className={`block text-sm mt-0.5 truncate ${
                          hasAnswer ? 'text-ink dark:text-ink-dark' : 'text-muted dark:text-muted-dark'
                        }`}
                      >
                        {answerDisplay}
                      </span>
                    </span>
                  </button>
                );
              })}
          </div>

          <div className="p-4 border-t border-rule dark:border-rule-dark">
            <button
              type="button"
              onClick={() => setIsReviewOpen(false)}
              className="w-full py-2.5 px-4 rounded-md bg-stamp text-white text-sm font-medium hover:bg-stamp-ink cursor-pointer min-h-11"
            >
              {t('closeReview')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
