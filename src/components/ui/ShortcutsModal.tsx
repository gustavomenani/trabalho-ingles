import React from 'react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { KeyboardBadge } from './KeyboardBadge';
import { Dialog } from './Dialog';

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent);
}

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen, language, t } = useQuestionnaire();

  if (!isShortcutsOpen) return null;

  const isPt = language === 'pt';
  const submitCombo = isApplePlatform() ? '⌘ + Enter' : 'Ctrl + Enter';

  const shortcuts = [
    {
      key: 'Enter',
      action: isPt ? 'Avançar / começar a prova' : 'Advance / start the assignment',
    },
    {
      key: 'A – D',
      action: isPt ? 'Marcar alternativa (sem avançar sozinho)' : 'Select an option (does not auto-advance)',
    },
    {
      key: '1 – 9, 0',
      action: isPt ? 'Marcar nota na escala (0 = 10)' : 'Select a rating (0 = 10)',
    },
    {
      key: '↑ / ↓',
      action: isPt ? 'Questão anterior ou próxima' : 'Previous or next question',
    },
    {
      key: submitCombo,
      action: isPt ? 'Enviar resposta escrita' : 'Submit written response',
    },
    {
      key: 'Esc',
      action: isPt ? 'Fechar janela ou revisão' : 'Close dialog or review',
    },
    {
      key: '?',
      action: isPt ? 'Abrir ou fechar este guia' : 'Open or close this guide',
    },
  ];

  return (
    <Dialog
      title={t('shortcutsModalTitle')}
      onClose={() => setIsShortcutsOpen(false)}
      labelledBy="shortcuts-title"
      closeLabel={t('shortcutsClose')}
    >
      <div className="divide-y divide-rule dark:divide-rule-dark">
        {shortcuts.map((item) => (
          <div key={item.key} className="py-2.5 flex items-center justify-between gap-3 text-sm">
            <span className="text-ink dark:text-ink-dark">{item.action}</span>
            <KeyboardBadge keys={item.key} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsShortcutsOpen(false)}
        className="mt-4 w-full py-2.5 px-3 rounded-md bg-paper dark:bg-paper-dark hover:bg-rule/40 text-sm font-medium text-ink dark:text-ink-dark cursor-pointer min-h-11"
      >
        {t('shortcutsCloseGuide')}
      </button>
    </Dialog>
  );
};
