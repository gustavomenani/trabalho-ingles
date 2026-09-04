import React, { Suspense, lazy } from 'react';
import { ThemeProvider, QuestionnaireProvider } from './context';
import { useQuestionnaire, useKeyboardNavigation } from './hooks';
import { Header, ProgressBar, FooterNav } from './components/layout';
import { WelcomeScreen } from './components/questions/WelcomeScreen';

const QuestionContainer = lazy(() =>
  import('./components/questions/QuestionContainer').then((m) => ({ default: m.QuestionContainer }))
);
const CompletionScreen = lazy(() =>
  import('./components/results/CompletionScreen').then((m) => ({ default: m.CompletionScreen }))
);
const ReviewDrawer = lazy(() =>
  import('./components/review/ReviewDrawer').then((m) => ({ default: m.ReviewDrawer }))
);
const HomeConfirmModal = lazy(() =>
  import('./components/ui/HomeConfirmModal').then((m) => ({ default: m.HomeConfirmModal }))
);
const ShortcutsModal = lazy(() =>
  import('./components/ui/ShortcutsModal').then((m) => ({ default: m.ShortcutsModal }))
);

const QuestionnaireApp: React.FC = () => {
  useKeyboardNavigation();

  const { currentIndex, isCompleted, isReviewOpen, isHomeConfirmOpen, isShortcutsOpen, language, t } =
    useQuestionnaire();

  React.useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title =
      language === 'pt'
        ? 'Trabalho de Inglês (3º Bimestre) — Etec de Araçatuba • Prof. Fausto Shell'
        : 'English Assignment (Term III) — Etec de Araçatuba • Prof. Fausto Shell';
  }, [language]);

  React.useEffect(() => {
    const root = document.documentElement;
    let wasDark = false;

    const beforePrint = () => {
      if (root.classList.contains('printing')) return;
      wasDark = root.classList.contains('dark');
      root.classList.remove('dark');
      root.classList.add('printing');
    };

    const afterPrint = () => {
      if (!root.classList.contains('printing')) return;
      root.classList.remove('printing');
      if (wasDark) root.classList.add('dark');
    };

    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) beforePrint();
      else afterPrint();
    };

    const media = window.matchMedia('print');
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    media.addEventListener('change', onMedia);

    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
      media.removeEventListener('change', onMedia);
      root.classList.remove('printing');
    };
  }, []);

  return (
    <div className="h-full min-h-0 flex flex-col bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark">
      <div className="app-chrome h-[3px] bg-stamp w-full shrink-0" aria-hidden="true" />
      <a
        href="#main-content"
        className="app-chrome sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-sheet dark:focus:bg-sheet-dark focus:text-ink dark:focus:text-ink-dark focus:px-3 focus:py-2 focus:border focus:border-stamp"
      >
        {t('skipToContent')}
      </a>

      <Header />
      <ProgressBar />

      <main id="main-content" className="flex-1 min-h-0 overflow-y-auto w-full">
        {currentIndex === 0 && !isCompleted ? (
          <WelcomeScreen />
        ) : (
          <Suspense fallback={<div className="min-h-[300px]" />}>
            {isCompleted ? <CompletionScreen /> : <QuestionContainer />}
          </Suspense>
        )}
      </main>

      <FooterNav />

      <Suspense fallback={null}>
        {isReviewOpen && <ReviewDrawer />}
        {isHomeConfirmOpen && <HomeConfirmModal />}
        {isShortcutsOpen && <ShortcutsModal />}
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <QuestionnaireProvider>
        <QuestionnaireApp />
      </QuestionnaireProvider>
    </ThemeProvider>
  );
}
