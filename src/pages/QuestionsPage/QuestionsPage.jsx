import {useCallback, useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { SEARCH_DEBOUNCE_MS, PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useQuestionsData } from '../../helpers/hooks/useQuestionsData.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';

function QuestionsPage() {
  const [isFilterOpen, handleOpenFilter, handleCloseFilter] = useModalState();
  const [filters, setFilters, page, handlePageChange, handleFiltersChange] = useFilters();
  const debouncedSearch = useDebounce(filters.search, SEARCH_DEBOUNCE_MS);

  const handleInitialLoad = useCallback((id) => {
    setFilters(prev => ({ ...prev, specializationId: id }));
  }, [setFilters]);

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
        <QuestionList
          title={currentSpecTitle}
          questions={questions.data}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onOpenFilter={handleOpenFilter}
        />

        <div className={classes.desktopFilter}>
          <Filter
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
            <Filter
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
