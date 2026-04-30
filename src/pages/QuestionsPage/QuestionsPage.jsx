import { useEffect, useState, useRef, useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import { apiRequest, buildQueryParams, buildUrl } from '../../helpers/utils/api.js';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { SEARCH_DEBOUNCE_MS, PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useQuestionsFilters } from '../../helpers/hooks/useQuestionsFilters.js';

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
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState({ data: [], total: 0 });
  const [specializations, setSpecializations] = useState({ data: [], total: 0 });
  const [skills, setSkills] = useState({ data: [], total: 0 });
  const [fetchError, setFetchError] = useState(null);
  const prevSpecializationId = useRef(null);

  const [filters, setFilters, page, setPage, handleFiltersChange] = useQuestionsFilters(initialFilters);
  const { search, specializationId, skills: skillIds, complexity, rate, status } = filters;
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const handleOpenFilter = () => setIsFilterOpen(true); 
  const handleCloseFilter = () => setIsFilterOpen(false);

  const totalPages = Math.max(1, Math.ceil(questions.total / PAGE_SIZE_DEFAULT));

  useEffect(() => {
    const initSpecializations = async () => {
      try {
        setIsLoading(true);

        const { data: [initialSpecialization], total: totalSpecializations } = await apiRequest('/specializations');
        const specializations = await apiRequest(`/specializations?limit=${totalSpecializations}`);
        setFilters((prevFilters) => ({ ...prevFilters, specializationId: initialSpecialization.id }));
        setSpecializations(specializations);

      } catch (err) {
        setFetchError(err);
        setIsLoading(false);
      }
    };
    initSpecializations();
  }, []);

  useEffect(() => {
    if (!specializationId) return;
    const updateData = async () => {
      try {
        setIsLoading(true);
        const debouncedFilters = {
          search: debouncedSearch,
          specializationId,
          skills: skillIds,
          complexity,
          rate,
          status,
        };
        const params = buildQueryParams(debouncedFilters, page);
        const url = buildUrl(params);

        if (prevSpecializationId.current !== specializationId) {
          const [newQuestions, newSkills] = await Promise.all([
            apiRequest(`/questions/public-questions?specializationId=${specializationId}`),
            apiRequest(`/skills?specializations=${specializationId}`),
          ]);
          setSkills(newSkills);
          setQuestions(newQuestions);
          prevSpecializationId.current = specializationId;
        } else {
          const newQuestions = await apiRequest(url);
          setQuestions(newQuestions);
        }
        setFetchError(null);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };
    updateData();
  }, [debouncedSearch, specializationId, skillIds, complexity, rate, status, page]);

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

  const currentSpec = useMemo(() => specializations.data?.find((specialization) => specialization.id === specializationId), [specializations.data, specializationId]);
  const currentSpecTitle = currentSpec ? `Вопросы ${currentSpec.title}` : '';

  if (isLoading && specializations.data.length === 0) {
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
