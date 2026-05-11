import { useCallback, useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import QuestionsFilters from '../../components/QuestionsFilters/QuestionsFilters.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useQuestionsData } from '../../helpers/hooks/useQuestionsData.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import Pagination from '../../components/Pagination/Pagination.jsx';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader.jsx';

function QuestionsPage() {
  const [isFilterOpen, handleOpenFilter, handleCloseFilter] = useModalState();
  const [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange] = useFilters();

  const handleInitialLoad = useCallback((id) => {
    if (!filters.specializationId) {
      setFilters(prev => ({ ...prev, specializationId: id }));
    }
  }, [filters.specializationId, setFilters]);

  const { questions, specializations, skills, isSpecializationsLoading, isSkillsLoading, isQuestionsLoading, fetchError } = useQuestionsData(filters, page, debouncedSearch, handleInitialLoad);
  const totalPages = Math.max(1, Math.ceil(questions.total / PAGE_SIZE_DEFAULT));
  const currentSpec = useMemo(() => specializations.data?.find((specialization) => specialization.id === filters.specializationId), [specializations.data, filters.specializationId]);
  const currentSpecTitle = currentSpec ? `Вопросы ${currentSpec.title}` : '';

  if (fetchError) {
    return <ErrorMessage error={fetchError?.message}>Click to try again</ErrorMessage>;
  }

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <div className={classes.contentWrapper}>
          {!isQuestionsLoading && <QuestionListHeader title={currentSpecTitle} onOpenFilter={handleOpenFilter} />}
          <QuestionList questions={questions.data} isLoading={isQuestionsLoading}
          />
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </div>
        <div className={classes.desktopFilter}>
          <QuestionsFilters
            specializations={specializations.data}
            skills={skills.data}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isSpecializationsLoading={isSpecializationsLoading}
            isSkillsLoading={isSkillsLoading}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div className={classes.overlay} onClick={handleCloseFilter}>
          <div className={classes.overlayInner} onClick={(event) => event.stopPropagation()}>
            <QuestionsFilters
              specializations={specializations.data}
              skills={skills.data}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              showClose
              onClose={handleCloseFilter}
              isSpecializationsLoading={isSpecializationsLoading}
              isSkillsLoading={isSkillsLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;
