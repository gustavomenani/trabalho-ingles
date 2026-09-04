import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface DialogProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
  closeLabel: string;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  onClose,
  children,
  labelledBy,
  closeLabel,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, panelRef);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <button
        type="button"
        className="fixed inset-0 bg-ink/45 dark:bg-black/60 cursor-default"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          ref={panelRef}
          className="relative w-full max-w-md bg-sheet dark:bg-sheet-dark p-6 text-left border border-rule dark:border-rule-dark shadow-[0_8px_24px_rgba(51,51,51,0.18)]"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 id={labelledBy} className="text-lg font-semibold text-ink dark:text-ink-dark font-exam">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 -mt-2 text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark"
              aria-label={closeLabel}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
