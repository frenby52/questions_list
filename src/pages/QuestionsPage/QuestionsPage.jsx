import { useCallback, useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import QuestionsFilters from '../../components/QuestionsFilters/QuestionsFilters.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useQuestionsData } from '../../helpers/hooks/useQuestionsData.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import Pagination from '../../components/Pagination/Pagination.jsx';

function QuestionsPage() {

  const [isFilterOpen, handleOpenFilter, handleCloseFilter] = useModalState();
  const [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange] = useFilters();

  const handleInitialLoad = useCallback((id) => {
    if (!filters.specializationId) {
      setFilters(prev => ({ ...prev, specializationId: id }));
    }
  }, [filters.specializationId, setFilters]);

  const { questions, specializations, skills, isLoading, fetchError } = useQuestionsData(filters, page, debouncedSearch, handleInitialLoad);

  const totalPages = Math.max(1, Math.ceil(questions.total / PAGE_SIZE_DEFAULT));

  const currentSpec = useMemo(() => specializations.data?.find((specialization) => specialization.id === filters.specializationId), [specializations.data, filters.specializationId]);
  const currentSpecTitle = currentSpec ? `Вопросы ${currentSpec.title}` : '';

  const isInitialBoot = specializations.data.length === 0 || questions.total === 0;
  if (isLoading && isInitialBoot) {
    return <Loader />;
  }

  if (fetchError) {
    return <ErrorMessage error={fetchError?.message}>Click to try again</ErrorMessage>;
  }

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <div className={classes.contentWrapper}>
          <QuestionList
            title={currentSpecTitle}
            questions={questions.data}
            isLoading={isLoading}
            onOpenFilter={handleOpenFilter}
          />
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </div>
        <div className={classes.desktopFilter}>
          <QuestionsFilters
            specializations={specializations.data}
            skills={skills.data}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div
          className={classes.overlay}
          onClick={handleCloseFilter}
        >
          <div
            className={classes.overlayInner}
            onClick={(event) => event.stopPropagation()}
          >
            <QuestionsFilters
              specializations={specializations.data}
              skills={skills.data}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              showClose
              onClose={handleCloseFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;
