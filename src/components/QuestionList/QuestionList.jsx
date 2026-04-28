import classes from './QuestionList.module.scss';
import QuestionItem from '../QuestionItem/QuestionItem.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import filterIcon from '../../assets/icons/filter.svg';
import { SkeletonQuestions } from '../SkeletonQuestions/SkeletonQuestions.jsx';

function QuestionList({
  title,
  questions,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onOpenFilter,
}) {
  return (
    <>
      {isLoading ? (
        <SkeletonQuestions />
      ) : (
        <section className={classes.list}>
          <header className={classes.header}>
            <h1 className={classes.title}>{title}</h1>
            <button
              type="button"
              className={classes.filterBtn}
              onClick={onOpenFilter}
            >
              <img src={filterIcon} alt="" width={20} height={20} />
            </button>
          </header>

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
          <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        </section>
      )}
    </>
  );
}

export default QuestionList;
