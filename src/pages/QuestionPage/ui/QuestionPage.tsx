import { useParams } from 'react-router-dom';
import classes from './QuestionPage.module.scss';
import { BackLink, ErrorMessage } from '@/shared/ui';
import { useGetQuestionQuery } from '@/entities/question';
import { QuestionView } from '@/widgets/QuestionView';
import { QuestionSidebar } from '@/widgets/QuestionSidebar';
import { QuestionPageSkeleton } from './QuestionPageSkeleton';
import { useModalState } from '@/shared/hooks';
import { getErrorMessage } from '@/shared/lib';

export function QuestionPage() {
  const { id } = useParams();
  const { data: question, isLoading, error } = useGetQuestionQuery(Number(id), { skip: !id });
  const [isDetailsOpen, openDetails, closeDetails] = useModalState();

  if (isLoading) return <QuestionPageSkeleton />;
  if (error) return <ErrorMessage message={getErrorMessage(error)} />;
  if (!question) return null;

  return (
    <div className={classes.page}>
      <div className={classes.topBar}><BackLink /></div>
      <div className={classes.content}>
        <div className={classes.main}>
          <QuestionView question={question} onOpenDetails={openDetails} />
        </div>
        <div className={classes.sidebar}>
          <QuestionSidebar question={question} />
        </div>
      </div>

      {isDetailsOpen && (
        <div className={classes.overlay} onClick={closeDetails}>
          <div className={classes.overlayInner} onClick={(event) => event.stopPropagation()}>
            <QuestionSidebar question={question} showClose onClose={closeDetails} />
          </div>
        </div>
      )}
    </div>
  );
}

