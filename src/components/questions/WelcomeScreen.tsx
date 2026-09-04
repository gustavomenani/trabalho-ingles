import React from 'react';
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  FileText,
  ArrowRight,
  User,
  RotateCcw,
  School,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

export const WelcomeScreen: React.FC = () => {
  const {
    goToNext,
    studentName,
    setStudentName,
    answeredCount,
    resetQuestionnaire,
    sectionTitle,
    t,
  } = useQuestionnaire();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToNext();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-10 px-4 text-center">
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-4">
        <GraduationCap className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
        <span>{t('badgeSchool')}</span>
      </div>

      {/* Assignment Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
        {t('welcomeHeading')}
      </h1>

      {/* Institution & Instructor Pill */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 dark:text-zinc-400 mb-4 py-2 px-3.5 rounded-xl bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-zinc-200">
          <School className="w-3.5 h-3.5 text-slate-500" />
          <span>{t('schoolLabel')} <strong>Etec de Araçatuba</strong></span>
        </div>
        <span className="text-slate-300 dark:text-zinc-700">•</span>
        <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-zinc-200">
          <UserCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>{t('instructorLabel')} <strong>Prof. Fausto Shell</strong></span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto mb-5 leading-relaxed">
        {t('welcomeSubtitle')}
      </p>

      {/* Dynamic Randomized Assignment Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-2xs text-xs text-slate-600 dark:text-zinc-400 mb-6">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>
          {t('randomBadge')} <strong className="text-slate-900 dark:text-zinc-100 font-semibold">{sectionTitle}</strong>
        </span>
      </div>

      {/* Student Name Input */}
      <div className="w-full mb-6 text-left">
        <label
          htmlFor="student-name-input"
          className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
        >
          <User className="w-3.5 h-3.5" />
          <span>{t('studentNameLabel')}</span>
        </label>
        <input
          id="student-name-input"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('studentNamePlaceholder')}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-xs"
        />
      </div>

      {/* Academic Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-zinc-300 mb-1.5" />
          <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
            {t('objectiveGradingTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {t('objectiveGradingDesc')}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <BookOpen className="w-4 h-4 text-slate-700 dark:text-zinc-300 mb-1.5" />
          <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
            {t('answerKeyTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {t('answerKeyDesc')}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <FileText className="w-4 h-4 text-slate-700 dark:text-zinc-300 mb-1.5" />
          <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
            {t('writtenExpressionTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {t('writtenExpressionDesc')}
          </p>
        </div>
      </div>

      {/* In-progress notice if user has previous progress */}
      {answeredCount > 0 && (
        <div className="mb-5 p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs flex items-center justify-between gap-3 text-slate-700 dark:text-zinc-300 text-left">
          <span>
            {t('savedAnswersNotice', { count: answeredCount })}
          </span>
          <button
            onClick={resetQuestionnaire}
            className="text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-medium shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('resetAll')}</span>
          </button>
        </div>
      )}

      {/* Start Action */}
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          size="lg"
          variant="primary"
          onClick={() => goToNext()}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto text-sm sm:text-base px-8 py-3"
        >
          {answeredCount > 0 ? t('resumeBtn') : t('beginBtn')}
        </Button>
      </div>

      <p className="text-xs text-slate-400 dark:text-zinc-500 mt-3.5">
        {t('enterToStart')}
      </p>
    </div>
  );
};
