import React, { useState, useEffect } from 'react';
import {
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Home,
  Copy,
  Check,
  Clock,
  User,
  Calendar,
  School,
  UserCheck,
} from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { calculateAssignmentGrade } from '../../data/sampleQuestions';
import { Button } from '../ui/Button';
import { SummaryReport } from './SummaryReport';

export const CompletionScreen: React.FC = () => {
  const {
    answers,
    questions,
    sectionTitle,
    exportAnswersJson,
    resetQuestionnaire,
    goHome,
    studentName,
    elapsedSeconds,
    language,
    t,
  } = useQuestionnaire();

  const grade = calculateAssignmentGrade(answers, questions, studentName, elapsedSeconds, sectionTitle, language);
  const [copied, setCopied] = useState<boolean>(false);

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;
  const currentDate = new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      })
      .catch(() => {
        // fallback if confetti fails to load
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const isPt = language === 'pt';
    const text = isPt
      ? `Relatório de Avaliação de Inglês - Etec de Araçatuba (3º Bimestre)\nProfessor: Prof. Fausto Shell\nProva: ${sectionTitle}\nAluno(a): ${studentName.trim() || t('anonymousStudent')}\nConceito: ${grade.letterGrade} (${grade.score}/${grade.totalQuestions} - ${grade.percentage}%)\nNível CEFR: ${grade.cefrLevel}\nTempo: ${timeFormatted}\nData: ${currentDate}`
      : `English Assignment Report - Etec de Araçatuba (Term III)\nInstructor: Prof. Fausto Shell\nExam Set: ${sectionTitle}\nStudent: ${studentName.trim() || 'Anonymous Student'}\nGrade: ${grade.letterGrade} (${grade.score}/${grade.totalQuestions} - ${grade.percentage}%)\nCEFR Level: ${grade.cefrLevel}\nTime: ${timeFormatted}\nDate: ${currentDate}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 animate-fadeIn text-center">
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-800 dark:text-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t('assignmentSubmitted')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('gradePerformanceReport')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-lg mx-auto">
          {t('officialEvaluation')}
        </p>
      </div>

      {/* Academic Grade Card / Certificate */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-300/80 dark:border-zinc-800 shadow-sm text-left space-y-6">
        {/* Student Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800 pb-3">
          <div className="flex flex-wrap items-center gap-2.5 font-medium text-slate-800 dark:text-zinc-200">
            <div className="flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-500" />
              <span>Etec de Araçatuba</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Prof. Fausto Shell</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 font-mono text-[10px] font-semibold text-slate-700 dark:text-zinc-300">
                {t('term')}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('student')} <strong>{studentName.trim() || t('anonymousStudent')}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{timeFormatted}</span>
            </div>
          </div>
        </div>

        {/* Top Grade Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
          <div className="flex items-center gap-4">
            {/* Letter Grade Stamp */}
            <div className="w-16 h-16 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex flex-col items-center justify-center font-bold shadow-xs">
              <span className="text-2xl font-black leading-none">{grade.letterGrade}</span>
              <span className="text-[10px] font-mono tracking-wider opacity-80 mt-0.5">{t('gradeBadge')}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 dark:text-zinc-400 uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                {t('cefrEquivalent')} {grade.cefrLevel}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {grade.title}
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 mt-1">
                {sectionTitle}
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {grade.score} / {grade.totalQuestions}
            </span>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              {grade.percentage}% {t('objectiveAccuracy')}
            </p>
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            {t('evaluationNote')}
          </h3>
          <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
            {grade.summary}
          </p>
        </div>

        {/* Competencies Progress Bars */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{t('skillBreakdown')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {grade.competencies.map((comp) => (
              <div key={comp.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-zinc-300">{comp.label}</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">
                    {comp.score}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {grade.recommendations.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('recommendedStudy')}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-400 list-disc list-inside">
              {grade.recommendations.map((rec, i) => (
                <li key={i} className="leading-relaxed">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={exportAnswersJson}
            iconLeft={<Download className="w-4 h-4" />}
          >
            {t('exportJson')}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            iconLeft={<Printer className="w-4 h-4" />}
          >
            {t('printPdf')}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
            iconLeft={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? t('copiedSummary') : t('copySummary')}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goHome(false)}
            iconLeft={<Home className="w-4 h-4" />}
            className="text-slate-700 dark:text-zinc-300"
          >
            {t('returnToHome')}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetQuestionnaire}
            iconLeft={<RotateCcw className="w-4 h-4" />}
            className="text-slate-500 dark:text-zinc-400"
          >
            {t('retake')}
          </Button>
        </div>
      </div>

      {/* Itemized Answer Key Breakdown */}
      <div className="pt-4">
        <SummaryReport />
      </div>
    </div>
  );
};
