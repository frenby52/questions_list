import { useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import QuestionList from '../../components/QuestionList/QuestionList.jsx';
import QuestionsFilters from '../../components/QuestionsFilters/QuestionsFilters.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { PAGE_SIZE_DEFAULT } from '../../constants/constants.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useModalState } from '../../helpers/hooks/useModalState.js';
import Pagination from '../../components/Pagination/Pagination.jsx';
import QuestionListHeader from '../../components/QuestionListHeader/QuestionListHeader.jsx'; 
import { useGetSpecializationsQuery, useGetSkillsQuery, useGetQuestionsQuery } from '../../store/services/questionsApi.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { getErrorMessage } from '../../helpers/utils/api.js';
import { useInitialSpecResolve } from '../../helpers/hooks/useInitialSpecResolve.js';

function QuestionsPage() {
  const [isFilterOpen, handleOpenFilter, handleCloseFilter] = useModalState();
  const [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange] = useFilters();
  const { data: specializations, isLoading: isSpecializationsLoading, error: specializationsError } = useGetSpecializationsQuery();
  const shouldResolveInitialSpec = useInitialSpecResolve(filters, specializations, setFilters);
  const { data: skills, isLoading: isSkillsLoading } = useGetSkillsQuery(
    filters.specializationId ?? skipToken
  );

  const shouldSkipQuestions = shouldResolveInitialSpec && !specializationsError;

  const { data: questions, isFetching: isQuestionsFetching, refetch: refetchQuestions, error: questionsError, } = useGetQuestionsQuery(
    { ...filters, search: debouncedSearch, page },
    { skip: shouldSkipQuestions}
  );

  const totalPages = Math.max(1, Math.ceil((questions?.total ?? 0) / PAGE_SIZE_DEFAULT));
  const currentSpec = useMemo(() => specializations?.data?.find((specialization) => specialization.id === filters.specializationId), [specializations, filters.specializationId]);
  const currentSpecTitle = currentSpec ? `Вопросы ${currentSpec.title}` : '';
  const isListLoading = shouldSkipQuestions || isQuestionsFetching;

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <div className={classes.contentWrapper}>
          {!isListLoading && <QuestionListHeader title={currentSpecTitle} onOpenFilter={handleOpenFilter} />}
          {questionsError ? (
            <ErrorMessage message={getErrorMessage(questionsError)} refetch={refetchQuestions} />
          ) : (
            <>
              <QuestionList questions={questions?.data ?? []} isLoading={isListLoading} />
              <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </>
          )}
        </div>
        <div className={classes.desktopFilter}>
          <QuestionsFilters
            specializations={specializations?.data ?? []}
            skills={skills?.data ?? []}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isSpecializationsLoading={isSpecializationsLoading}
            isSkillsLoading={isSkillsLoading}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div className={classes.overlay} onClick={handleCloseFilter}>
          <div className={classes.overlayInner} onClick={(e) => e.stopPropagation()}>
            <QuestionsFilters
              specializations={specializations?.data ?? []}
              skills={skills?.data ?? []}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isSpecializationsLoading={isSpecializationsLoading}
              isSkillsLoading={isSkillsLoading}
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
