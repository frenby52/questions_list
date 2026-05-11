import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './QuestionPage.module.scss';
import BackLink from '../../components/BackLink/BackLink.jsx';
import QuestionHero from '../../components/QuestionHero/QuestionHero.jsx';
import QuestionNavigation from '../../components/QuestionNavigation/QuestionNavigation.jsx';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer.jsx';
import QuestionFilters from '../../components/QuestionFilters/QuestionFilters.jsx';
import SkeletonQuestionPage from '../../components/SkeletonQuestionPage/SkeletonQuestionPage.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { useQuestion } from '../../helpers/hooks/useQuestion.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import { ROUTES } from '../../constants/routes.js';
import { buildUrl } from '../../helpers/utils/api.js';

function QuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question, isLoading, fetchError } = useQuestion(id);
  const [isDetailsOpen, openDetails, closeDetails] = useModalState();

  const handleFilterClick = useCallback((key, value) => {
    const params = new URLSearchParams();
    params.set(key, String(value));
    navigate(buildUrl(params, ROUTES.QUESTIONS));
  }, [navigate]);

  if (isLoading) return <SkeletonQuestionPage />;
  if (fetchError || !question) {
    return <ErrorMessage message={fetchError?.message}>Вернуться на главную</ErrorMessage>;
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
          <QuestionFilters
            question={question}
            onFilterClick={handleFilterClick}
          />
        </div>
      </div>

      {isDetailsOpen && (
        <div
          className={classes.overlay}
          onClick={closeDetails}
        >
          <div
            className={classes.overlayInner}
            onClick={(event) => event.stopPropagation()}
          >
            <QuestionFilters
              question={question}
              onFilterClick={handleFilterClick}
              showClose
              onClose={closeDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
