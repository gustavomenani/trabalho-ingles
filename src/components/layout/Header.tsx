import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Clock, HelpCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';

interface HeaderTimerProps {
  startTime: number | null;
}

const HeaderTimer: React.FC<HeaderTimerProps> = React.memo(({ startTime }) => {
  const [seconds, setSeconds] = React.useState<number>(() => {
    if (!startTime) return 0;
    return Math.max(0, Math.floor((Date.now() - startTime) / 1000));
  });

  React.useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setSeconds(Math.max(0, Math.floor((Date.now() - startTime) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <span className="flex items-center gap-1.5 tabular-nums whitespace-nowrap text-sm text-muted dark:text-muted-dark">
      <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{formattedTime}</span>
    </span>
  );
});
HeaderTimer.displayName = 'HeaderTimer';

const iconBtn =
  'inline-flex items-center justify-center min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 rounded-md text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-sheet dark:hover:bg-sheet-dark cursor-pointer';

export const Header: React.FC = () => {
  const { theme, toggleTheme, soundEnabled, toggleSound } = useTheme();
  const {
    currentIndex,
    totalSteps,
    isCompleted,
    setIsReviewOpen,
    answeredCount,
    goHome,
    startTime,
    setIsShortcutsOpen,
    language,
    toggleLanguage,
    t,
  } = useQuestionnaire();

  const isWelcome = currentIndex === 0;
  const questionTotal = Math.max(0, totalSteps - 1);

  return (
    <header className="app-chrome shrink-0 z-30 w-full bg-paper/95 dark:bg-paper-dark/95 border-b border-rule dark:border-rule-dark">
      <div className="app-column h-14 sm:h-16 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
        {isWelcome ? (
          <div className="col-start-1 flex flex-col min-w-0 justify-self-start">
            <span className="font-semibold text-sm sm:text-base text-ink dark:text-ink-dark truncate">
              {t('assignmentTitle')}
            </span>
            <span className="hidden sm:block text-xs text-muted dark:text-muted-dark truncate">
              {t('schoolAndTeacher')} · {t('term')}
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => goHome(true)}
            className="col-start-1 flex flex-col items-start min-w-0 text-left rounded-md hover:bg-sheet dark:hover:bg-sheet-dark py-0.5 justify-self-start"
            title={t('homeBtn')}
          >
            <span className="font-semibold text-sm sm:text-base text-ink dark:text-ink-dark truncate max-w-full">
              {t('assignmentTitle')}
            </span>
            <span className="hidden sm:block text-xs text-muted dark:text-muted-dark truncate max-w-full">
              {t('schoolAndTeacher')}
            </span>
          </button>
        )}

        <div className="col-start-2 hidden md:flex items-center justify-center">
          {!isWelcome && !isCompleted ? <HeaderTimer startTime={startTime} /> : null}
        </div>

        <div className="col-start-3 flex items-center justify-end gap-0.5 shrink-0 justify-self-end">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 min-h-11 sm:min-h-9 text-sm font-medium rounded-md text-ink dark:text-ink-dark hover:bg-sheet dark:hover:bg-sheet-dark cursor-pointer"
            title={language === 'en' ? t('translateToPt') : t('translateToEn')}
            aria-label={language === 'en' ? t('translateToPt') : t('translateToEn')}
          >
            <span className="sm:hidden" aria-hidden="true">{language === 'en' ? 'PT' : 'EN'}</span>
            <span className="hidden sm:inline">{language === 'en' ? 'Português' : 'English'}</span>
          </button>

          {!isWelcome && !isCompleted && (
            <button
              type="button"
              onClick={() => setIsReviewOpen(true)}
              className={`inline-flex ${iconBtn} gap-1.5 px-2`}
              title={t('reviewBtn')}
              aria-label={t('reviewBtn')}
            >
              <span className="hidden lg:inline text-sm">{t('reviewBtn')}</span>
              <span className="text-sm tabular-nums">
                {answeredCount}/{questionTotal}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsShortcutsOpen(true)}
            className={`${iconBtn} max-md:hidden`}
            title={t('shortcutsTitle')}
            aria-label={t('shortcutsTitle')}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className={iconBtn}
            title={soundEnabled ? t('muteSound') : t('unmuteSound')}
            aria-label={soundEnabled ? t('muteSound') : t('unmuteSound')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={iconBtn}
            title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
            aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
