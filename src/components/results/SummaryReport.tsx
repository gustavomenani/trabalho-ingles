import React from 'react';
import { Edit3, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const SummaryReport: React.FC = () => {
  const { questions, answers, goToIndex, language, t } = useQuestionnaire();

  return (
    <div className="w-full space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {t('answerKeyAndExplanations')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {t('reviewResponsesDesc')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {questions
          .filter((q) => q.type !== 'welcome')
          .map((q, idx) => {
            const stepIndex = idx + 1;
            const answer = answers[q.id];
            const isGraded = q.correctAnswer !== undefined;
            const isCorrect = isGraded && answer === q.correctAnswer;

            const selectedOption = q.options?.find((o) => o.id === answer);
            const correctOption = q.options?.find((o) => o.id === q.correctAnswer);

            const displayTitle = language === 'pt' && q.titlePt ? q.titlePt : q.title;
            const displaySubtitle = language === 'pt' && q.subtitlePt ? q.subtitlePt : q.subtitle;
            const displayCategory = language === 'pt' && q.categoryPt ? q.categoryPt : q.category;
            const displayExplanation = language === 'pt' && q.explanationPt ? q.explanationPt : q.explanation;

            const selectedOptionLabel = selectedOption
              ? language === 'pt' && selectedOption.labelPt
                ? selectedOption.labelPt
                : selectedOption.label
              : t('noAnswerProvided');

            const correctOptionLabel = correctOption
              ? language === 'pt' && correctOption.labelPt
                ? correctOption.labelPt
                : correctOption.label
              : '';

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                      <span className="font-mono text-slate-700 dark:text-zinc-300">
                        {t('itemHash')}{stepIndex}
                      </span>
                      <span>•</span>
                      <span>{displayCategory}</span>
                      {isGraded && (
                        <>
                          <span>•</span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                              isCorrect
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> {t('correctPt')}
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> {t('incorrectPt')}
                              </>
                            )}
                          </span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                      {displayTitle}
                    </h4>
                    {displaySubtitle && (
                      <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 italic">
                        {displaySubtitle}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToIndex(stepIndex)}
                    className="shrink-0 p-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                    title={t('change')}
                    aria-label={`${t('change')} ${displayTitle}`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('change')}</span>
                  </button>
                </div>

                {/* Answers Breakdown */}
                {isGraded ? (
                  <div className="space-y-1.5 text-xs sm:text-sm pt-1">
                    <div className="flex items-start gap-2">
                      <span className="text-slate-500 dark:text-zinc-400 w-24 shrink-0 font-medium">
                        {t('yourAnswer')}
                      </span>
                      <span
                        className={`font-semibold ${
                          isCorrect
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : 'text-rose-600 dark:text-rose-400 line-through'
                        }`}
                      >
                        {selectedOptionLabel}
                      </span>
                    </div>

                    {!isCorrect && correctOption && (
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 w-24 shrink-0 font-medium">
                          {t('correctAnswer')}
                        </span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                          {correctOptionLabel}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm pt-1">
                    <span className="text-slate-500 dark:text-zinc-400 font-medium mr-2">
                      {t('yourResponse')}
                    </span>
                    {q.type === 'rating-scale' ? (
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {answer ?? t('notRated')} / 10
                      </span>
                    ) : (
                      <p className="mt-1 text-slate-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-zinc-800/60 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
                        {String(answer || t('noResponseProvided'))}
                      </p>
                    )}
                  </div>
                )}

                {/* Pedagogical Explanation Box */}
                {displayExplanation && (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-xs text-slate-700 dark:text-zinc-300 space-y-1">
                    <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
                      <span>{t('grammarUsageRule')}</span>
                    </div>
                    <p className="leading-relaxed pl-4">{displayExplanation}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
