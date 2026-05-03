import { useEffect, useState, useCallback, useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { SEARCH_DEBOUNCE_MS, PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useQuestionsData } from '../../helpers/hooks/useQuestionsData.js';

const initialFilters = {
  search: '',
  specializationId: null,
  skills: [],
  complexity: [],
  rate: [],
  status: 'all',
};

function QuestionsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters, page, setPage, handleFiltersChange] = useFilters(initialFilters);
  const debouncedSearch = useDebounce(filters.search, SEARCH_DEBOUNCE_MS);

  const handleInitialLoad = useCallback((id) => {
    setFilters(prev => ({ ...prev, specializationId: id }));
  }, [setFilters]);

  const { questions, specializations, skills, isLoading, fetchError } = useQuestionsData(filters, page, debouncedSearch, handleInitialLoad);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const handleOpenFilter = () => setIsFilterOpen(true); 
  const handleCloseFilter = () => setIsFilterOpen(false);

  const totalPages = Math.max(1, Math.ceil(questions.total / PAGE_SIZE_DEFAULT));

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const currentSpec = useMemo(() => specializations.data?.find((specialization) => specialization.id === filters.specializationId), [specializations.data, filters.specializationId]);
  const currentSpecTitle = currentSpec ? `Вопросы ${currentSpec.title}` : '';

  const isInitialBoot = specializations.data.length === 0 || questions.total === 0;
  if (isLoading && isInitialBoot) {
    return <Loader />;
  }

  if (fetchError) {
    return <ErrorMessage error={fetchError}>Click to try again</ErrorMessage>;
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
