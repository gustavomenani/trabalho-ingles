import React, { useState } from 'react';
import { Printer, RotateCcw, Home, Copy, Check } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { calculateAssignmentGrade } from '../../data/sampleQuestions';
import { Button } from '../ui/Button';
import { SummaryReport } from './SummaryReport';

export const CompletionScreen: React.FC = () => {
  const { answers, questions, sectionTitle, resetQuestionnaire, goHome, studentName, elapsedSeconds, language, t } =
    useQuestionnaire();

  const grade = calculateAssignmentGrade(answers, questions, studentName, elapsedSeconds, sectionTitle, language);
  const [copied, setCopied] = useState(false);

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;
  const currentDate = new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

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

  const displayName = studentName.trim() || t('anonymousStudent');

  return (
    <div className="app-column py-8 sm:py-12 space-y-8 text-left print-report">
      <div className="print-identity space-y-8">
        <div className="print-only print-letterhead">
          <h1>{t('printInstitution')}</h1>
          <p>
            {t('printDocTitle')} — {t('assignmentTitle')} · {t('term')}
          </p>
          <p>
            {t('printInstructorLabel')}: Prof. Fausto Shell
          </p>
          <div className="print-meta">
            <p>
              <span>{t('student')}</span>
              <strong>{displayName}</strong>
            </p>
            <p>
              <span>{t('printExamLabel')}</span>
              <strong>{sectionTitle}</strong>
            </p>
            <p>
              <span>{t('printDateLabel')}</span>
              <strong>{currentDate}</strong>
            </p>
            <p>
              <span>{t('printTimeLabel')}</span>
              <strong>{timeFormatted}</strong>
            </p>
          </div>
        </div>

        <div className="no-print">
          <p className="text-sm text-muted dark:text-muted-dark mb-1">{t('assignmentSubmitted')}</p>
          <h1 className="font-exam text-3xl sm:text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark">
            {t('gradePerformanceReport')}
          </h1>
          <p className="mt-2 text-base text-muted dark:text-muted-dark">{t('officialEvaluation')}</p>
        </div>

        <div className="print-cover p-5 sm:p-7 bg-sheet dark:bg-sheet-dark border border-rule dark:border-rule-dark space-y-6">
          <div className="no-print flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted dark:text-muted-dark border-b border-rule dark:border-rule-dark pb-3">
            <p>
              Etec de Araçatuba · Prof. Fausto Shell · {t('term')}
            </p>
            <p>
              {currentDate} · {timeFormatted}
            </p>
          </div>

          <div className="print-grade-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="print-stamp w-16 h-16 shrink-0 border-2 border-stamp text-stamp flex flex-col items-center justify-center -rotate-6"
                aria-label={`${t('gradeBadge')} ${grade.letterGrade}`}
              >
                <span className="text-2xl font-bold leading-none font-exam">{grade.letterGrade}</span>
                <span className="text-xs mt-0.5">{t('gradeBadge')}</span>
              </div>
              <div>
                <p className="text-sm text-muted dark:text-muted-dark">
                  {t('student')} <strong className="text-ink dark:text-ink-dark">{displayName}</strong>
                </p>
                <h2 className="font-exam text-xl font-semibold text-ink dark:text-ink-dark mt-0.5">{grade.title}</h2>
                <p className="text-sm text-muted dark:text-muted-dark mt-1">
                  {t('cefrEquivalent')} {grade.cefrLevel}
                </p>
                <p className="text-sm text-muted dark:text-muted-dark">{sectionTitle}</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-3xl font-semibold tabular-nums text-ink dark:text-ink-dark">
                {grade.score}/{grade.totalQuestions}
              </p>
              <p className="text-sm text-muted dark:text-muted-dark">
                {grade.percentage}% {t('objectiveAccuracy')}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-ink dark:text-ink-dark">{t('evaluationNote')}</h3>
            <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">{grade.summary}</p>
          </div>

          {grade.recommendations.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-rule dark:border-rule-dark">
              <h3 className="text-sm font-medium text-ink dark:text-ink-dark">{t('recommendedStudy')}</h3>
              <ul className="space-y-1 text-sm text-muted dark:text-muted-dark list-disc pl-5">
                {grade.recommendations.map((rec, i) => (
                  <li key={i} className="leading-relaxed">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 no-print">
        <Button variant="primary" size="sm" onClick={handlePrint} iconLeft={<Printer className="w-4 h-4" />}>
          {t('printPdf')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopySummary}
          iconLeft={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        >
          {copied ? t('copiedSummary') : t('copySummary')}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => goHome(false)} iconLeft={<Home className="w-4 h-4" />}>
          {t('returnToHome')}
        </Button>
        <Button variant="ghost" size="sm" onClick={resetQuestionnaire} iconLeft={<RotateCcw className="w-4 h-4" />}>
          {t('retake')}
        </Button>
      </div>

      <div className="pt-2 print-key">
        <SummaryReport />
      </div>
    </div>
  );
};
