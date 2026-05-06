import classes from './QuestionList.module.scss';
import QuestionItem from '../QuestionItem/QuestionItem.jsx';
import QuestionListHeader from '../QuestionListHeader/QuestionListHeader.jsx';
import { SkeletonQuestions } from '../SkeletonQuestions/SkeletonQuestions.jsx';

function QuestionList({ title, questions, isLoading, onOpenFilter }) {
  return (
    <>
      {isLoading ? (
        <SkeletonQuestions />
      ) : (
        <section>
          <QuestionListHeader title={title} onOpenFilter={onOpenFilter} />

          {questions.length === 0 && !isLoading ? (
            <div className={classes.empty}>Ничего не найдено</div>
          ) : (
            <ul className={classes.items}>
              {questions.map((question, index) => (
                <li key={question.id}>
                  <QuestionItem question={question} defaultOpen={index === 0} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}

export default QuestionList;
