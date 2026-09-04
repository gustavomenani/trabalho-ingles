import React from 'react';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  BookOpen,
  CheckSquare,
  Home,
  Clock,
  HelpCircle,
  Languages,
} from 'lucide-react';
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
    <span className="flex items-center gap-1 font-mono whitespace-nowrap">
      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <span>{formattedTime}</span>
    </span>
  );
});
HeaderTimer.displayName = 'HeaderTimer';

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

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/95 dark:bg-zinc-950/95 border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Academic Brand & Home Click */}
        <div
          onClick={() => goHome(true)}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none min-w-0"
          title={t('homeBtn')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              goHome(true);
            }
          }}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center shadow-xs shrink-0">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-xs sm:text-base tracking-tight text-slate-900 dark:text-zinc-100 truncate">
                {t('assignmentTitle')}
              </span>
              <span className="hidden sm:inline-block text-[9px] sm:text-[10px] uppercase font-mono px-1 sm:px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-semibold border border-slate-200 dark:border-zinc-700 shrink-0">
                {t('term')}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 hidden md:block whitespace-nowrap">
              Etec de Araçatuba • Prof. Fausto Shell
            </span>
          </div>
        </div>

        {/* Center Progress & Timer in a Single Balanced, Non-wrapping Pill */}
        {!isWelcome && !isCompleted && (
          <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 whitespace-nowrap shrink-0 select-none">
            <span className="whitespace-nowrap font-medium text-slate-700 dark:text-zinc-300">
              {t('itemCount')} <strong className="text-slate-900 dark:text-white font-bold">{currentIndex}</strong> {t('of')} {totalSteps - 1}
            </span>
            <span className="text-slate-300 dark:text-zinc-700">•</span>
            <HeaderTimer startTime={startTime} />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Language Translation Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shrink-0 select-none"
            title={language === 'en' ? t('translateToPt') : t('translateToEn')}
            aria-label={language === 'en' ? t('translateToPt') : t('translateToEn')}
          >
            <Languages className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="font-mono text-[11px]">{language === 'en' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
          </button>

          {/* Explicit Home Button - visible on sm+ since clicking brand logo/title handles home on mobile */}
          {!isWelcome && (
            <button
              onClick={() => goHome(true)}
              className="hidden sm:flex px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title={t('homeBtn')}
              aria-label={t('homeBtn')}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t('homeBtn')}</span>
            </button>
          )}

          {/* Review Questions Drawer Button */}
          {!isWelcome && !isCompleted && (
            <button
              onClick={() => setIsReviewOpen(true)}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title={t('reviewBtn')}
              aria-label={t('reviewBtn')}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t('reviewBtn')}</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300">
                {answeredCount}/{totalSteps - 1}
              </span>
            </button>
          )}

          {/* Shortcuts Help Button - hidden on touch/mobile screens since touch devices do not have physical keyboard shortcuts */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="hidden md:inline-flex p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title={t('shortcutsTitle')}
            aria-label={t('shortcutsTitle')}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            title={soundEnabled ? t('muteSound') : t('unmuteSound')}
            aria-label={soundEnabled ? t('muteSound') : t('unmuteSound')}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-zinc-200" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
            aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
