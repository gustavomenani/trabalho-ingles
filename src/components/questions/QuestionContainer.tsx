import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { WelcomeScreen } from './WelcomeScreen';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { RatingScaleQuestion } from './RatingScaleQuestion';
import { SliderQuestion } from './SliderQuestion';
import { TextFeedbackQuestion } from './TextFeedbackQuestion';

export const QuestionContainer: React.FC = () => {
  const { currentQuestion, currentIndex, language, t } = useQuestionnaire();

  if (!currentQuestion) return null;

  // Clean, razor-sharp opacity transitions without subpixel transform blur
  const variants: Variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: 'easeIn',
      },
    },
  };

  const isQuotedSentence = currentQuestion.subtitle?.startsWith('"');
  const titleText = language === 'pt' && currentQuestion.titlePt ? currentQuestion.titlePt : currentQuestion.title;
  const categoryText =
    language === 'pt' && currentQuestion.categoryPt
      ? currentQuestion.categoryPt
      : currentQuestion.category || 'Assignment';
  const subtitleText =
    language === 'pt' && currentQuestion.subtitlePt ? currentQuestion.subtitlePt : currentQuestion.subtitle;

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-6 w-full max-w-5xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full flex flex-col items-center"
        >
          {currentQuestion.type === 'welcome' ? (
            <WelcomeScreen />
          ) : (
            <div className="w-full max-w-2xl mx-auto space-y-6">
              {/* Question Header */}
              <div className="text-center space-y-3">
                {/* Step indicator and category */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400">
                  <span className="font-mono font-bold text-slate-900 dark:text-zinc-100">
                    {t('itemCount')} {currentIndex}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-slate-800 dark:text-zinc-200">
                    {categoryText}
                  </span>
                  {currentQuestion.required && (
                    <>
                      <span>•</span>
                      <span className="text-slate-500 dark:text-zinc-400 font-medium">{t('graded')}</span>
                    </>
                  )}
                </div>

                {/* Main Question Title */}
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug max-w-xl mx-auto">
                  {titleText}
                </h2>

                {/* Subtitle / Description (rendered here only if not a sentence stimulus) */}
                {subtitleText && !isQuotedSentence && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                    {subtitleText}
                  </p>
                )}
              </div>

              {/* Question Body */}
              <div className="w-full">
                {currentQuestion.type === 'single-choice' && (
                  <SingleChoiceQuestion question={currentQuestion} />
                )}
                {currentQuestion.type === 'multiple-choice' && (
                  <MultipleChoiceQuestion question={currentQuestion} />
                )}
                {currentQuestion.type === 'rating-scale' && (
                  <RatingScaleQuestion question={currentQuestion} />
                )}
                {currentQuestion.type === 'slider' && (
                  <SliderQuestion question={currentQuestion} />
                )}
                {currentQuestion.type === 'text' && (
                  <TextFeedbackQuestion question={currentQuestion} />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
