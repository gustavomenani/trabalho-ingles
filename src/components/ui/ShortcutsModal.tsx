import React from 'react';
import { Keyboard, X } from 'lucide-react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { KeyboardBadge } from './KeyboardBadge';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen, language, t } = useQuestionnaire();

  if (!isShortcutsOpen) return null;

  const isPt = language === 'pt';

  const shortcuts = [
    {
      key: 'Enter ↵',
      action: isPt
        ? 'Avançar para a próxima questão / Iniciar avaliação'
        : 'Advance to next question / Start assignment',
    },
    {
      key: 'A – D',
      action: isPt
        ? 'Selecionar alternativa imediatamente e avançar'
        : 'Select option immediately and auto-advance',
    },
    {
      key: '1 – 9, 0',
      action: isPt
        ? 'Selecionar nota na escala (pressione 0 para 10)'
        : 'Select confidence rating (press 0 for 10)',
    },
    {
      key: '↑ / ↓',
      action: isPt
        ? 'Navegar entre questões anteriores e próximas'
        : 'Navigate between previous and next items',
    },
    {
      key: 'Cmd ⌘ + Enter',
      action: isPt
        ? 'Enviar resposta discursiva escrita'
        : 'Submit text response from essay area',
    },
    {
      key: 'Esc',
      action: isPt
        ? 'Fechar modais, gaveta de revisão e diálogos'
        : 'Close dialogs, drawer, and modals',
    },
    {
      key: '?',
      action: isPt
        ? 'Abrir / fechar este guia de atalhos'
        : 'Open / close this keyboard shortcuts guide',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsShortcutsOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left shadow-xl transition-all border border-slate-200 dark:border-zinc-800 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 flex items-center justify-center">
                <Keyboard className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('shortcutsModalTitle')}
              </h3>
            </div>
            <button
              onClick={() => setIsShortcutsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label={t('shortcutsClose')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
            {shortcuts.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 dark:text-zinc-300 font-medium">
                  {item.action}
                </span>
                <KeyboardBadge keys={item.key} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsShortcutsOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-medium text-slate-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
