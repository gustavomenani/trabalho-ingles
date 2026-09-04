import React, { useState } from 'react';
import { Check, BookOpen, Volume2, Square, Globe, Sparkles } from 'lucide-react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';
import { useModernSpeech } from '../../hooks/useModernSpeech';
import { Card } from '../ui/Card';

export const SingleChoiceQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer, goToNext, language, t } = useQuestionnaire();
  const { soundEnabled } = useTheme();
  const { playSelect } = useSoundEffects(soundEnabled);
  const { isPlaying, toggle: toggleSpeech, stop: stopSpeech, hasVoiceSupport } = useModernSpeech();

  // User manual toggle overrides: null means follow language default (pt = visible, en = hidden)
  const [userPassageOverride, setUserPassageOverride] = useState<boolean | null>(null);
  const [userSentenceOverride, setUserSentenceOverride] = useState<boolean | null>(null);

  const showPassageTranslation = userPassageOverride !== null ? userPassageOverride : language === 'pt';
  const showSentenceTranslation = userSentenceOverride !== null ? userSentenceOverride : language === 'pt';

  const selectedValue = answers[question.id] as string | undefined;
  const selectedOption = question.options?.find((o) => o.id === selectedValue);

  const handleSelect = (optionId: string) => {
    stopSpeech();
    playSelect();
    setAnswer(question.id, optionId);
    setTimeout(() => {
      goToNext({ questionId: question.id, value: optionId });
    }, 120);
  };

  const isSentenceStimulus = question.subtitle && question.subtitle.startsWith('"');

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      {/* Reading Passage Box (if provided) */}
      {question.readingPassage && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-left space-y-3 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('readingPassageTitle')}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Portuguese Translation Helper Button */}
              {question.readingPassagePt && (
                <button
                  type="button"
                  onClick={() => setUserPassageOverride(!showPassageTranslation)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    showPassageTranslation
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                  title={showPassageTranslation ? t('hideTranslation') : t('showTranslation')}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{showPassageTranslation ? t('hideTranslation') : t('showTranslation')}</span>
                </button>
              )}

              {/* Modern Natural Speech Synthesizer Button */}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={() => toggleSpeech(question.readingPassage || '')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer select-none ${
                    isPlaying
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 animate-pulse'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                  title={isPlaying ? t('stopAudio') : t('listenAudio')}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-3 h-3 fill-current" />
                      <span>{t('stopAudio')}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{t('listenAudio')}</span>
                      <Sparkles className="w-2.5 h-2.5 text-amber-500 hidden sm:inline" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Original English Passage */}
          <p className="text-sm sm:text-base text-slate-800 dark:text-zinc-200 italic leading-relaxed font-serif">
            &ldquo;{question.readingPassage}&rdquo;
          </p>

          {/* Portuguese Translation Support Box */}
          {showPassageTranslation && question.readingPassagePt && (
            <div className="pt-2.5 border-t border-slate-100 dark:border-zinc-800/80">
              <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{t('translationSupportTitle')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-sans bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                &ldquo;{question.readingPassagePt}&rdquo;
              </p>
            </div>
          )}

          {question.subtitle && !isSentenceStimulus && (
            <p className="text-xs text-slate-500 dark:text-zinc-400 pt-1 border-t border-slate-100 dark:border-zinc-800">
              {language === 'pt' && question.subtitlePt ? question.subtitlePt : question.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Sentence Stimulus Card (for fill-in-the-blank questions) */}
      {isSentenceStimulus && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs text-left space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                {t('sentenceToComplete')}
              </span>
              {selectedOption && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>
                    {t('selectedLabel')} {selectedOption.label}
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Sentence translation toggle */}
              {question.subtitlePt && (
                <button
                  type="button"
                  onClick={() => setUserSentenceOverride(!showSentenceTranslation)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    showSentenceTranslation
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                  title={showSentenceTranslation ? t('hideTranslation') : t('showTranslation')}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{showSentenceTranslation ? t('hideTranslation') : t('showTranslation')}</span>
                </button>
              )}

              {/* Modern Voice Synthesizer Button for Sentence */}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={() => toggleSpeech(question.subtitle || '')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border cursor-pointer select-none ${
                    isPlaying
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 animate-pulse'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                  title={isPlaying ? t('stopAudio') : t('listenAudio')}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-3 h-3 fill-current" />
                      <span>{t('stopAudio')}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{t('listenSentence')}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-900 dark:text-zinc-100 font-medium leading-relaxed font-serif">
            {question.subtitle}
          </p>

          {/* Portuguese translation hint for struggling students */}
          {showSentenceTranslation && question.subtitlePt && (
            <p className="text-xs text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-100 dark:border-zinc-800/80 italic">
              {t('sentenceTranslationTitle')} {question.subtitlePt}
            </p>
          )}
        </div>
      )}

      {/* Choice Options */}
      <div className="space-y-2.5">
        {question.options?.map((option, index) => {
          const isSelected = selectedValue === option.id;
          const letter = option.shortcut || String.fromCharCode(65 + index);
          const descriptionText =
            language === 'pt' && option.descriptionPt ? option.descriptionPt : option.description;

          return (
            <Card
              key={option.id}
              selected={isSelected}
              interactive
              onClick={() => handleSelect(option.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelect(option.id);
                }
              }}
              className="p-3.5 sm:p-4 flex items-start gap-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white rounded-xl"
            >
              {/* Shortcut Letter Badge */}
              <div
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : letter}
              </div>

              {/* Label & Description */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {option.label}
                </div>
                {descriptionText && (
                  <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                    {descriptionText}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
