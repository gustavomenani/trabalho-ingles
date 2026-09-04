export type Language = 'en' | 'pt';

export type QuestionType =
  | 'welcome'
  | 'single-choice'
  | 'multiple-choice'
  | 'rating-scale'
  | 'slider'
  | 'text';

export interface ChoiceOption {
  id: string;
  label: string;
  labelPt?: string;
  description?: string;
  descriptionPt?: string;
  shortcut?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  titlePt?: string;
  subtitle?: string;
  subtitlePt?: string;
  category?: string;
  categoryPt?: string;
  required?: boolean;
  options?: ChoiceOption[];
  correctAnswer?: string; // ID of the correct option for graded questions
  explanation?: string; // Pedagogical explanation for the correct answer
  explanationPt?: string;
  readingPassage?: string; // Optional context passage for reading comprehension
  readingPassagePt?: string;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  minLabelPt?: string;
  maxLabel?: string;
  maxLabelPt?: string;
  unit?: string;
  placeholder?: string;
  placeholderPt?: string;
  maxLength?: number;
  infoTip?: string;
}

export interface QuestionSection {
  id: number;
  title: string;
  titlePt?: string;
  theme: string;
  themePt?: string;
  description: string;
  descriptionPt?: string;
  questions: Question[];
}

export type AnswerValue = string | string[] | number;

export interface AnswersState {
  [questionId: string]: AnswerValue;
}

export interface AssignmentGrade {
  studentName?: string;
  elapsedSeconds?: number;
  sectionTitle?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  letterGrade: string;
  cefrLevel: string;
  title: string;
  summary: string;
  competencies: {
    label: string;
    score: number;
  }[];
  recommendations: string[];
}
