import { SideBar } from '@/shared/ui';
import { QuestionFilterPanel } from '@/features/filter-questions';
import { SkeletonQuestionsFilters } from './SkeletonQuestionsFilters';
import type { Filters } from '@/shared/api/types';
import type { Specialization } from '@/entities/specialization';
import type { Skill } from '@/entities/skill';
import type { FilterChangeHandler } from '@/features/filter-questions';

interface QuestionsFiltersProps {
  specializations: Specialization[];
  skills: Skill[];
  filters: Filters;
  onFiltersChange: FilterChangeHandler;
  onClose?: () => void;
  showClose?: boolean;
  isSpecializationsLoading?: boolean;
  isSkillsLoading?: boolean;
}

export function QuestionsFilters({
  specializations,
  skills,
  filters,
  onFiltersChange,
  onClose,
  showClose = false,
  isSpecializationsLoading,
  isSkillsLoading,
}: QuestionsFiltersProps) {
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
