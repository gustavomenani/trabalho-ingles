import React from 'react';
import { X, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const ReviewDrawer: React.FC = () => {
  const {
    questions,
    currentIndex,
    answers,
    goToIndex,
    isReviewOpen,
    setIsReviewOpen,
    language,
    t,
  } = useQuestionnaire();

  if (!isReviewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsReviewOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('reviewDrawerTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t('jumpDirectly')}
              </p>
            </div>
            <button
              onClick={() => setIsReviewOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t('closeReview')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Question List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100 dark:divide-slate-800/60">
            {questions
              .filter((q) => q.type !== 'welcome')
              .map((q, idx) => {
                const questionStepIndex = idx + 1; // 1-indexed (since welcome is 0)
                const answer = answers[q.id];
                const hasAnswer =
                  answer !== undefined &&
                  answer !== '' &&
                  (!Array.isArray(answer) || answer.length > 0);

                const isCurrent = currentIndex === questionStepIndex;

                let answerDisplay = t('notAnsweredYet');
                if (hasAnswer) {
                  if (Array.isArray(answer)) {
                    answerDisplay = `${answer.length} ${t('itemsSelected')}`;
                  } else if (q.type === 'slider') {
                    answerDisplay = `${answer} ${q.unit || ''}`;
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
                  <div
                    key={q.id}
                    onClick={() => goToIndex(questionStepIndex)}
                    className={`py-3.5 px-3 rounded-xl transition-colors cursor-pointer group flex items-start gap-3 my-1 ${
                      isCurrent
                        ? 'bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700'
                        : 'hover:bg-slate-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {hasAnswer ? (
                        <CheckCircle2 className="w-4 h-4 text-slate-900 dark:text-zinc-100" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                        {t('itemLabel')} {questionStepIndex} • {displayCategory}
                      </div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {displayTitle}
                      </div>
                      <div
                        className={`text-xs mt-0.5 truncate ${
                          hasAnswer
                            ? 'text-slate-700 dark:text-zinc-300 font-medium'
                            : 'text-slate-400 italic'
                        }`}
                      >
                        {answerDisplay}
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                  </div>
                );
              })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
            <button
              onClick={() => setIsReviewOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t('closeReview')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
