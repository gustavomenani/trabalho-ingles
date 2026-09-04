import { useContext } from 'react';
import { QuestionnaireContext } from '../context/QuestionnaireContextDef';
import type { QuestionnaireContextType } from '../context/QuestionnaireContextDef';

export const useQuestionnaire = (): QuestionnaireContextType => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
