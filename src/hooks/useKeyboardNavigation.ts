import { useEffect } from 'react';
import { useQuestionnaire } from './useQuestionnaire';
import { useSoundEffects } from './useSoundEffects';
import { useTheme } from './useTheme';

export function useKeyboardNavigation() {
  const {
    currentQuestion,
    goToNext,
    goToPrev,
    setAnswer,
    isCompleted,
    isReviewOpen,
    setIsReviewOpen,
    isHomeConfirmOpen,
    setIsHomeConfirmOpen,
    isShortcutsOpen,
    setIsShortcutsOpen,
  } = useQuestionnaire();

  const { soundEnabled } = useTheme();
  const { playClick, playSelect } = useSoundEffects(soundEnabled);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If modal/drawer is open, Escape closes it
      if (isReviewOpen || isHomeConfirmOpen || isShortcutsOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsReviewOpen(false);
          setIsHomeConfirmOpen(false);
          setIsShortcutsOpen(false);
        }
        return;
      }

      // Check if user is typing into an input or textarea
      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (isInputFocused) {
        // Allow Cmd+Enter or Ctrl+Enter to proceed from input/textarea
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          goToNext();
        }
        return;
      }

      // Toggle shortcuts with '?'
      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(true);
        return;
      }

      if (isCompleted) {
        return;
      }

      // Global Enter to go next
      if (e.key === 'Enter') {
        e.preventDefault();
        goToNext();
        return;
      }

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
        return;
      }

      // Single-choice shortcut handling (A, B, C, D, E or 1, 2, 3...)
      if (currentQuestion && currentQuestion.type === 'single-choice' && currentQuestion.options) {
        const keyUpper = e.key.toUpperCase();
        const optionIndexByKey = parseInt(e.key, 10) - 1;

        const matchedOption = currentQuestion.options.find(
          (opt, idx) =>
            opt.shortcut?.toUpperCase() === keyUpper ||
            (opt.shortcut === undefined && idx === optionIndexByKey)
        );

        if (matchedOption) {
          e.preventDefault();
          playSelect();
          setAnswer(currentQuestion.id, matchedOption.id);
          return;
        }
      }

      // Rating-scale shortcut handling (1 to 10)
      if (currentQuestion && currentQuestion.type === 'rating-scale') {
        let val: number | null = null;
        if (e.key >= '1' && e.key <= '9') {
          val = parseInt(e.key, 10);
        } else if (e.key === '0') {
          val = 10;
        }

        if (val !== null && val >= (currentQuestion.min ?? 1) && val <= (currentQuestion.max ?? 10)) {
          e.preventDefault();
          playClick();
          setAnswer(currentQuestion.id, val);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentQuestion,
    goToNext,
    goToPrev,
    setAnswer,
    isCompleted,
    isReviewOpen,
    setIsReviewOpen,
    isHomeConfirmOpen,
    setIsHomeConfirmOpen,
    isShortcutsOpen,
    setIsShortcutsOpen,
    soundEnabled,
    playClick,
    playSelect,
  ]);
}
