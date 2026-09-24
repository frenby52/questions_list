
import classes from './QuestionPage.module.scss';
import BackLink from '../../components/BackLink/BackLink.jsx';
import QuestionHero from '../../components/QuestionHero/QuestionHero.jsx';
import QuestionNavigation from '../../components/QuestionNavigation/QuestionNavigation.jsx';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer.jsx';
import QuestionFilters from '../../components/QuestionFilters/QuestionFilters.jsx';
import SkeletonQuestionPage from '../../components/SkeletonQuestionPage/SkeletonQuestionPage.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import { useParams } from 'react-router-dom';
import { useGetQuestionQuery } from '../../store/services/questionsApi.ts';
import { getErrorMessage } from '../../helpers/utils/api.js';

function QuestionPage() {

  const { id } = useParams();
  const { data: question, isLoading, error } = useGetQuestionQuery(Number(id), {
    skip: !id,
  });
  const [isDetailsOpen, openDetails, closeDetails] = useModalState();

  if (isLoading) return <SkeletonQuestionPage />;
  if (error) {
    return <ErrorMessage message={getErrorMessage(error)} />;
  }

  return (
    <div className={classes.page}>
      <div className={classes.topBar}>
        <BackLink />
      </div>
      <div className={classes.content}>
        <div className={classes.main}>
          <QuestionHero question={question} onOpenDetails={openDetails} />
          <QuestionNavigation />
          <QuestionAnswer title="Краткий ответ" content={question.shortAnswer} />
          <QuestionAnswer title="Развёрнутый ответ" content={question.longAnswer} />
        </div>
        <div className={classes.sidebar}>
          <QuestionFilters question={question} />
        </div>
      </div>

      {isDetailsOpen && (
        <div className={classes.overlay} onClick={closeDetails} >
          <div className={classes.overlayInner} onClick={(event) => event.stopPropagation()}>
            <QuestionFilters question={question} showClose onClose={closeDetails} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
