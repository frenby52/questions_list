import { QuestionHero, QuestionAnswer } from '@/entities/question';
import { QuestionNavigation } from '@/features/navigate-questions';

export function QuestionView({ question, onOpenDetails }) {
  return (
    <>
      <QuestionHero question={question} onOpenDetails={onOpenDetails} />
      <QuestionNavigation />
      <QuestionAnswer title="Краткий ответ" content={question.shortAnswer} />
      <QuestionAnswer title="Развёрнутый ответ" content={question.longAnswer} />
    </>
  );
}
