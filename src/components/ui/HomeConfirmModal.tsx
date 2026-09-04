import React from 'react';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { Button } from './Button';
import { Dialog } from './Dialog';

export const HomeConfirmModal: React.FC = () => {
  const { isHomeConfirmOpen, setIsHomeConfirmOpen, goToIndex, t } = useQuestionnaire();

  if (!isHomeConfirmOpen) return null;

  const handleConfirm = () => {
    setIsHomeConfirmOpen(false);
    goToIndex(0);
  };

  return (
    <Dialog
      title={t('homeModalTitle')}
      onClose={() => setIsHomeConfirmOpen(false)}
      labelledBy="home-confirm-title"
      closeLabel={t('closeDialog')}
    >
      <p className="text-sm text-muted dark:text-muted-dark leading-relaxed mb-5">{t('homeModalDesc')}</p>
      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => setIsHomeConfirmOpen(false)}>
          {t('stayBtn')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleConfirm}>
          {t('confirmHomeBtn')}
        </Button>
      </div>
    </Dialog>
  );
};
