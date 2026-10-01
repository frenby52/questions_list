import classes from './QuestionList.module.scss';
import { QuestionCard } from '@/entities/question';
import type { Question } from '@/entities/question';
import { QuestionActionsMenu } from '@/features/question-actions';
import { SkeletonQuestionList } from './SkeletonQuestionList';

interface QuestionListProps {
  questions: Question[];
  isLoading?: boolean;
}

export function QuestionList({ questions, isLoading }: QuestionListProps) {

  if (isLoading) {
    return <SkeletonQuestionList />;
  }

  return (
    <section>
      {questions.length === 0 ? (
        <div className={classes.empty}>Ничего не найдено</div>
      ) : (
        <ul className={classes.items}>
          {questions.map((question, index) => (
            <li key={question.id}>
              <QuestionCard
                question={question}
                defaultOpen={index === 0}
                questionActions={(close) => (
                  <QuestionActionsMenu question={question} onClose={close} />
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
