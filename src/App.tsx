import React, { Suspense, lazy } from 'react';
import { ThemeProvider, QuestionnaireProvider } from './context';
import { useQuestionnaire, useKeyboardNavigation } from './hooks';
import { Header, ProgressBar, FooterNav } from './components/layout';
import { WelcomeScreen } from './components/questions/WelcomeScreen';

// Code-split heavy components for instant initial paint & Lighthouse 100% performance
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
  // Activate keyboard hotkeys
  useKeyboardNavigation();

  const { currentIndex, isCompleted, isReviewOpen, isHomeConfirmOpen, isShortcutsOpen, language } = useQuestionnaire();

  React.useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'pt'
        ? 'Trabalho de Inglês (3º Bimestre) — Etec de Araçatuba • Prof. Fausto Shell'
        : 'English Assignment (Term III) — Etec de Araçatuba • Prof. Fausto Shell';
  }, [language]);


  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-150 relative overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <ProgressBar />

        <main className="flex-1 flex flex-col justify-center items-center w-full">
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
