import React, { useState } from 'react';
import { Check, BookOpen, Volume2, Globe } from 'lucide-react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';
import { useModernSpeech } from '../../hooks/useModernSpeech';
import { Card } from '../ui/Card';

export const SingleChoiceQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, language, t } = useQuestionnaire();
  const { soundEnabled } = useTheme();
  const { playSelect } = useSoundEffects(soundEnabled);
  const { isPlaying, toggle: toggleSpeech, stop: stopSpeech, hasVoiceSupport } = useModernSpeech();

  const [showPassageTranslation, setShowPassageTranslation] = useState(false);
  const [showSentenceTranslation, setShowSentenceTranslation] = useState(false);

  const selectedValue = answers[question.id] as string | undefined;
  const selectedOption = question.options?.find((o) => o.id === selectedValue);
  const selectedOptionLabel =
    language === 'pt' && selectedOption?.labelPt ? selectedOption.labelPt : selectedOption?.label;

  const handleSelect = (optionId: string) => {
    stopSpeech();
    playSelect();
    setAnswer(question.id, optionId);
  };

  const isSentenceStimulus = question.subtitle && question.subtitle.startsWith('"');
  const groupLabel = language === 'pt' && question.titlePt ? question.titlePt : question.title;

  return (
    <div className="space-y-4 w-full">
      {question.readingPassage && (
        <div className="p-4 sm:p-5 rounded-md bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark text-left space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted dark:text-muted-dark">
              <BookOpen className="w-4 h-4" />
              <span>{t('readingPassageTitle')}</span>
            </div>
            <div className="flex items-center gap-2">
              {question.readingPassagePt && (
                <button
                  type="button"
                  onClick={() => setShowPassageTranslation((v) => !v)}
                  aria-pressed={showPassageTranslation}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium border cursor-pointer border-rule dark:border-rule-dark text-ink dark:text-ink-dark hover:bg-paper dark:hover:bg-paper-dark"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{showPassageTranslation ? t('hideTranslation') : t('showTranslation')}</span>
                </button>
              )}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={() => toggleSpeech(question.readingPassage || '')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium border cursor-pointer border-rule dark:border-rule-dark text-ink dark:text-ink-dark hover:bg-paper dark:hover:bg-paper-dark"
                >
                  <Volume2 className="w-3.5 h-3.5 text-mark dark:text-mark-dark" />
                  <span>{isPlaying ? t('stopAudio') : t('listenAudio')}</span>
                </button>
              )}
            </div>
          </div>

          <p className="font-exam text-base text-ink dark:text-ink-dark leading-relaxed">
            &ldquo;{question.readingPassage}&rdquo;
          </p>

          {showPassageTranslation && question.readingPassagePt && (
            <p className="text-sm text-muted dark:text-muted-dark leading-relaxed pt-2 border-t border-rule dark:border-rule-dark">
              {t('translationSupportTitle')} {question.readingPassagePt}
            </p>
          )}
        </div>
      )}

      {isSentenceStimulus && (
        <div className="p-4 sm:p-5 rounded-md bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark text-left space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-muted dark:text-muted-dark">{t('sentenceToComplete')}</span>
            <div className="flex items-center gap-1.5">
              {question.subtitlePt && (
                <button
                  type="button"
                  onClick={() => setShowSentenceTranslation((v) => !v)}
                  aria-pressed={showSentenceTranslation}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium border cursor-pointer border-rule dark:border-rule-dark text-ink dark:text-ink-dark hover:bg-paper dark:hover:bg-paper-dark"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{showSentenceTranslation ? t('hideTranslation') : t('showTranslation')}</span>
                </button>
              )}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={() => toggleSpeech(question.subtitle || '')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium border cursor-pointer border-rule dark:border-rule-dark text-ink dark:text-ink-dark hover:bg-paper dark:hover:bg-paper-dark"
                >
                  <Volume2 className="w-3.5 h-3.5 text-mark dark:text-mark-dark" />
                  <span>{isPlaying ? t('stopAudio') : t('listenSentence')}</span>
                </button>
              )}
            </div>
          </div>

          <p className="font-exam text-lg text-ink dark:text-ink-dark leading-relaxed">{question.subtitle}</p>

          {showSentenceTranslation && question.subtitlePt && (
            <p className="text-sm text-muted dark:text-muted-dark pt-2 border-t border-rule dark:border-rule-dark">
              {t('sentenceTranslationTitle')} {question.subtitlePt}
            </p>
          )}

          {selectedOption && (
            <p className="text-sm text-mark dark:text-mark-dark flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {t('selectedLabel')} {selectedOptionLabel}
            </p>
          )}
        </div>
      )}

      <div role="radiogroup" aria-label={groupLabel} className="space-y-2">
        {question.options?.map((option, index) => {
          const isSelected = selectedValue === option.id;
          const letter = option.shortcut || String.fromCharCode(65 + index);
          const optionLabel = language === 'pt' && option.labelPt ? option.labelPt : option.label;

          return (
            <Card
              key={option.id}
              selected={isSelected}
              interactive
              onClick={() => handleSelect(option.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected || (!selectedValue && index === 0) ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelect(option.id);
                }
              }}
              className="p-3.5 sm:p-4 flex items-start gap-3.5 cursor-pointer min-h-11"
            >
              <div
                className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-semibold text-sm ${
                  isSelected
                    ? 'bg-stamp text-white'
                    : 'bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark border border-rule dark:border-rule-dark'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : letter}
              </div>
              <div className="flex-1 min-w-0 pt-1 font-medium text-base text-ink dark:text-ink-dark leading-snug">
                {optionLabel}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
