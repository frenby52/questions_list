import classes from './QuestionList.module.scss';
import QuestionItem from '../QuestionItem/QuestionItem.jsx';
import SkeletonQuestionList from '../SkeletonQuestionList/SkeletonQuestionList.jsx';

function QuestionList({ questions, isLoading }) {
  return (
    <>
      {isLoading ? (
        <SkeletonQuestionList />
      ) : (
        <section>
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
