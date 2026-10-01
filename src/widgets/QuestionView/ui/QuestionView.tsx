import { QuestionHero, QuestionAnswer } from '@/entities/question';
import { QuestionNavigation } from '@/features/navigate-questions';
import type { Question } from '@/entities/question';

interface QuestionViewProps {
  question: Question;
  onOpenDetails?: () => void;
}

export function QuestionView({ question, onOpenDetails }: QuestionViewProps) {
  return (
    <>
      <QuestionHero question={question} onOpenDetails={onOpenDetails} />
      <QuestionNavigation />
      <QuestionAnswer title="Краткий ответ" content={question.shortAnswer} />
      <QuestionAnswer title="Развёрнутый ответ" content={question.longAnswer} />
    </>
  );
}
