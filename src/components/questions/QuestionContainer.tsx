import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { RatingScaleQuestion } from './RatingScaleQuestion';
import { TextFeedbackQuestion } from './TextFeedbackQuestion';

export const QuestionContainer: React.FC = () => {
  const { currentQuestion, currentIndex, totalSteps, language, t } = useQuestionnaire();

  if (!currentQuestion || currentQuestion.type === 'welcome') return null;

  const variants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.15, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } },
  };

  const isQuotedSentence = currentQuestion.subtitle?.startsWith('"');
  const titleText = language === 'pt' && currentQuestion.titlePt ? currentQuestion.titlePt : currentQuestion.title;
  const categoryText =
    language === 'pt' && currentQuestion.categoryPt
      ? currentQuestion.categoryPt
      : currentQuestion.category || 'Assignment';
  const subtitleText =
    language === 'pt' && currentQuestion.subtitlePt ? currentQuestion.subtitlePt : currentQuestion.subtitle;
  const questionTotal = Math.max(1, totalSteps - 1);

  return (
    <div className="app-column py-8 sm:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <div className="w-full space-y-5">
            <div className="text-left space-y-2">
              <p className="text-sm text-muted dark:text-muted-dark">
                {t('questionProgress', { current: currentIndex, total: questionTotal })}
                {categoryText ? ` · ${categoryText}` : ''}
              </p>
              <h2 className="font-exam text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-ink-dark leading-snug">
                {titleText}
              </h2>
              {subtitleText && !isQuotedSentence && (
                <p className="text-sm text-muted dark:text-muted-dark leading-relaxed max-w-prose">
                  {subtitleText}
                </p>
              )}
            </div>

            <div className="w-full">
              {currentQuestion.type === 'single-choice' && (
                <SingleChoiceQuestion question={currentQuestion} />
              )}
              {currentQuestion.type === 'rating-scale' && (
                <RatingScaleQuestion question={currentQuestion} />
              )}
              {currentQuestion.type === 'text' && (
                <TextFeedbackQuestion question={currentQuestion} />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
