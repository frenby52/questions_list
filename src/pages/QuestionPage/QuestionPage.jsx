import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './QuestionPage.module.scss';
import BackLink from '../../components/BackLink/BackLink.jsx';
import QuestionHero from '../../components/QuestionHero/QuestionHero.jsx';
import QuestionNavigation from '../../components/QuestionNavigation/QuestionNavigation.jsx';
import QuestionAnswer from '../../components/QuestionAnswer/QuestionAnswer.jsx';
import QuestionFilters from '../../components/QuestionFilters/QuestionFilters.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { useQuestion } from '../../helpers/hooks/useQuestion.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import { logQuestionsRequest } from '../../helpers/utils/api.js';
import { ROUTES } from '../../constants/routes.js';

function QuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question, isLoading, fetchError } = useQuestion(id);
  const [isDetailsOpen, openDetails, closeDetails] = useModalState();

  const handleSkillClick = useCallback((skillId) => {
    const queryString = new URLSearchParams({
      skills: String(skillId),
    }).toString();
    logQuestionsRequest('skill click', queryString);
    navigate(ROUTES.QUESTIONS);
  }, [navigate]);

  const handleKeywordClick = useCallback((keyword) => {
    const queryString = new URLSearchParams({ keywords: keyword }).toString();
    logQuestionsRequest('keyword click', queryString);
    navigate(ROUTES.QUESTIONS);
  }, [navigate]);

  if (isLoading) return <Loader />;
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
            onSkillClick={handleSkillClick}
            onKeywordClick={handleKeywordClick}
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
              onSkillClick={handleSkillClick}
              onKeywordClick={handleKeywordClick}
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
