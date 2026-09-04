import React from 'react';
import { Home, X } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { Button } from './Button';

export const HomeConfirmModal: React.FC = () => {
  const { isHomeConfirmOpen, setIsHomeConfirmOpen, goToIndex, t } = useQuestionnaire();

  if (!isHomeConfirmOpen) return null;

  const handleConfirm = () => {
    setIsHomeConfirmOpen(false);
    goToIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsHomeConfirmOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left shadow-xl transition-all border border-slate-200 dark:border-zinc-800 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('homeModalTitle')}
              </h3>
            </div>
            <button
              onClick={() => setIsHomeConfirmOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={t('closeDialog')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            {t('homeModalDesc')}
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsHomeConfirmOpen(false)}
            >
              {t('stayBtn')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirm}
              iconLeft={<Home className="w-3.5 h-3.5" />}
            >
              {t('confirmHomeBtn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
