import { SideBar } from '@/shared/ui';
import { QuestionFilterPanel } from '@/features/filter-questions';
import { SkeletonQuestionsFilters } from './SkeletonQuestionsFilters';

export function QuestionsFilters({
  specializations,
  skills,
  filters,
  onFiltersChange,
  onClose,
  showClose = false,
  isSpecializationsLoading,
  isSkillsLoading,
}) {
  return (
    <SideBar showClose={showClose} onClose={onClose}>
      {isSpecializationsLoading ? (
        <SkeletonQuestionsFilters />
      ) : (
        <QuestionFilterPanel
          specializations={specializations}
          skills={skills}
          filters={filters}
          onFiltersChange={onFiltersChange}
          isSkillsLoading={isSkillsLoading}
        />
      )}
    </SideBar>
  );
}
