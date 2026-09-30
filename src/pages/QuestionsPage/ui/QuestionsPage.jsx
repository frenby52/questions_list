import { useMemo } from 'react';
import classes from './QuestionsPage.module.scss';
import { QuestionList } from '@/widgets/QuestionList';
import { QuestionsFilters } from '@/widgets/QuestionsFilters';
import { QuestionPageHeader } from './QuestionPageHeader';
import { ErrorMessage, Pagination } from '@/shared/ui';
import { PAGE_SIZE_DEFAULT } from '@/shared/constants/constants';
import { useFilters } from '@/features/filter-questions';
import { useModalState } from '@/shared/hooks/useModalState';
import { useGetSpecializationsQuery } from '@/entities/specialization';
import { useGetSkillsQuery } from '@/entities/skill';
import { useGetQuestionsQuery } from '@/entities/question';
import { getErrorMessage } from '@/shared/helpers/helpers';
import { useInitialSpecResolve } from '@/features/filter-questions';

export function QuestionsPage() {
  const [isFilterOpen, handleOpenFilter, handleCloseFilter] = useModalState();
  const [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange] = useFilters();
  const { data: specializations, isLoading: isSpecializationsLoading, error: specializationsError } = useGetSpecializationsQuery();
  const shouldResolveInitialSpec = useInitialSpecResolve(filters, specializations, setFilters);
  const { data: skills, isLoading: isSkillsLoading } = useGetSkillsQuery(
    { specializations: [filters.specializationId] },
    { skip: !filters.specializationId}
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
          {!isListLoading && <QuestionPageHeader title={currentSpecTitle} onOpenFilter={handleOpenFilter} />}
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
