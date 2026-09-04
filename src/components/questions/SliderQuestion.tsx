import React from 'react';
import type { Question } from '../../types/questionnaire';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useTheme } from '../../hooks/useTheme';

export const SliderQuestion: React.FC<{ question: Question }> = ({ question }) => {
  const { answers, setAnswer } = useQuestionnaire();
  const { soundEnabled } = useTheme();
  const { playClick } = useSoundEffects(soundEnabled);

  const min = question.min ?? 0;
  const max = question.max ?? 20;
  const step = question.step ?? 1;
  const unit = question.unit ? ` ${question.unit}` : '';

  const value = (answers[question.id] as number) ?? Math.round((min + max) / 2);

  const handleChange = (newVal: number) => {
    playClick();
    setAnswer(question.id, newVal);
  };

  // Presets
  const presets = [1, 3, 5, 8, 12, 15];

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 py-2">
      {/* Big Value Counter */}
      <div className="text-center">
        <div className="inline-block px-8 py-4 rounded-2xl bg-indigo-50/80 dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm">
          <span className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">
            {value >= max ? `${max}+` : value}
          </span>
          <span className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-300 ml-2">
            {value === 1 ? 'year' : unit.trim()}
          </span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="space-y-3">
        <div className="relative py-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={question.title}
          />
        </div>

        {/* Labels below slider */}
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>{question.minLabel || `${min}${unit}`}</span>
          <span>{question.maxLabel || `${max}+${unit}`}</span>
        </div>
      </div>

      {/* Quick selection chips */}
      <div className="space-y-2">
        <div className="text-xs text-center text-slate-400 dark:text-slate-500">
          Or jump to a preset:
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handleChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                value === p
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {p} {p === 1 ? 'yr' : 'yrs'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
