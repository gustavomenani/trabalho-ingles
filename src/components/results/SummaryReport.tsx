import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const SummaryReport: React.FC = () => {
  const { questions, answers, language, t, isCompleted } = useQuestionnaire();

  return (
    <div className="w-full space-y-4 text-left print-key">
      <div>
        <h3 className="font-exam text-lg font-semibold text-ink dark:text-ink-dark">
          {t('answerKeyAndExplanations')}
        </h3>
        <p className="text-sm text-muted dark:text-muted-dark">{t('reviewResponsesDesc')}</p>
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
            const selectedDescription =
              selectedOption && (language === 'pt' && selectedOption.descriptionPt
                ? selectedOption.descriptionPt
                : selectedOption.description);
            const correctDescription =
              correctOption && (language === 'pt' && correctOption.descriptionPt
                ? correctOption.descriptionPt
                : correctOption.description);

            return (
              <article
                key={q.id}
                className="print-item p-4 sm:p-5 bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark space-y-3"
              >
                <div>
                  <p className="text-sm text-muted dark:text-muted-dark mb-1">
                    {t('itemHash')}
                    {stepIndex}
                    {displayCategory ? ` · ${displayCategory}` : ''}
                    {isGraded && (
                      <span className={`ml-2 inline-flex items-center gap-1 font-medium ${isCorrect ? 'text-mark dark:text-mark-dark' : 'text-stamp'}`}>
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
                    )}
                  </p>
                  <h4 className="font-exam text-base font-semibold text-ink dark:text-ink-dark leading-snug">
                    {displayTitle}
                  </h4>
                  {displaySubtitle && (
                    <p className="text-sm text-muted dark:text-muted-dark mt-0.5">{displaySubtitle}</p>
                  )}
                </div>

                {isGraded ? (
                  <div className="space-y-1.5 text-sm">
                    <div>
                      <span className="text-muted dark:text-muted-dark font-medium mr-2">{t('yourAnswer')}</span>
                      <span className={isCorrect ? 'text-mark dark:text-mark-dark font-medium' : 'text-stamp line-through'}>
                        {selectedOptionLabel}
                      </span>
                      {selectedDescription && (
                        <p className="mt-1 text-muted dark:text-muted-dark">{selectedDescription}</p>
                      )}
                    </div>
                    {!isCorrect && correctOption && (
                      <div>
                        <span className="text-mark dark:text-mark-dark font-medium mr-2">{t('correctAnswer')}</span>
                        <span className="font-medium text-mark dark:text-mark-dark">{correctOptionLabel}</span>
                        {correctDescription && (
                          <p className="mt-1 text-muted dark:text-muted-dark">{correctDescription}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm">
                    <span className="text-muted dark:text-muted-dark font-medium mr-2">{t('yourResponse')}</span>
                    {q.type === 'rating-scale' ? (
                      <span className="font-medium text-ink dark:text-ink-dark">
                        {answer ?? t('notRated')} / 10
                      </span>
                    ) : (
                      <p className="mt-1 text-ink dark:text-ink-dark whitespace-pre-wrap leading-relaxed">
                        {String(answer || t('noResponseProvided'))}
                      </p>
                    )}
                  </div>
                )}

                {displayExplanation && isCompleted && (
                  <p className="text-sm text-muted dark:text-muted-dark leading-relaxed pt-2 border-t border-rule dark:border-rule-dark">
                    <span className="font-medium text-ink dark:text-ink-dark">{t('grammarUsageRule')} </span>
                    {displayExplanation}
                  </p>
                )}
              </article>
            );
          })}
      </div>
    </div>
  );
};
