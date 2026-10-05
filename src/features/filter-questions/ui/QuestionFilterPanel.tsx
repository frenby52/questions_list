import { useState, useMemo } from 'react';
import { SearchInput, FilterGroup, FilterChip } from '@/shared/ui';
import { COMPLEXITY_OPTIONS, RATE_OPTIONS, COLLAPSED_SPECS_COUNT, COLLAPSED_SKILLS_COUNT } from '../config/constants';
import { SkeletonQuestionsFiltersAfterSpecs } from './SkeletonQuestionsFiltersAfterSpecs';
import type { Filters } from '@/entities/question';
import type { Specialization } from '@/entities/specialization';
import type { Skill } from '@/entities/skill';
import type { FilterChangeHandler } from '../model/useFilters';

interface QuestionFilterPanelProps {
  specializations: Specialization[];
  skills: Skill[];
  filters: Filters;
  onFiltersChange: FilterChangeHandler;
  isSkillsLoading?: boolean;
}

export function QuestionFilterPanel({ specializations, skills, filters, onFiltersChange, isSkillsLoading }: QuestionFilterPanelProps) {
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

  const visibleSpecs = useMemo(() => isSpecsExpanded ? specializations : specializations.slice(0, COLLAPSED_SPECS_COUNT), [specializations, isSpecsExpanded]);
  const visibleSkills = useMemo(() => isSkillsExpanded ? skills : skills.slice(0, COLLAPSED_SKILLS_COUNT), [skills, isSkillsExpanded]);

  const specsShowMore =
    specializations.length > COLLAPSED_SPECS_COUNT
      ? isSpecsExpanded
        ? 'Скрыть'
        : 'Посмотреть все'
      : null;

  const skillsShowMore =
    skills.length > COLLAPSED_SKILLS_COUNT
      ? isSkillsExpanded
        ? 'Скрыть'
        : 'Посмотреть все'
      : null;

  return (
    <>
      <SearchInput
        value={filters.search ?? ''}
        onChange={(query) => onFiltersChange('search', query)}
      />
      <FilterGroup
        title="Специализация"
        showMoreLabel={specsShowMore}
        onShowMore={() => setIsSpecsExpanded((prev) => !prev)}
      >
        {visibleSpecs.map((spec) => (
          <FilterChip
            key={spec.id}
            label={spec.title}
            isActive={filters.specializationId === spec.id}
            onClick={() =>
              onFiltersChange(
                'specializationId',
                filters.specializationId === spec.id ? null : spec.id,
              )
            }
          />
        ))}
      </FilterGroup>
      {isSkillsLoading ? (
        <SkeletonQuestionsFiltersAfterSpecs />
      ) : (
        <>
          <FilterGroup
            title="Навыки"
            showMoreLabel={skillsShowMore}
            onShowMore={() => setIsSkillsExpanded((prev) => !prev)}
          >
            {visibleSkills.map((skill) => (
              <FilterChip
                key={skill.id}
                label={skill.title}
                iconSrc={skill.imageSrc}
                isActive={filters.skills?.includes(skill.id)}
                onClick={() => onFiltersChange('skills', skill.id)}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Уровень сложности">
            {COMPLEXITY_OPTIONS.map((option) => {
              const optionValues = option.value.split(',');
              const isActive = optionValues.some((v) => filters.complexity?.includes(v));
              return (
                <FilterChip
                  key={option.value}
                  label={option.label}
                  variant="compact"
                  isActive={isActive}
                  onClick={() => onFiltersChange('complexity', option.value)}
                />
              );
            })}
          </FilterGroup>
          <FilterGroup title="Рейтинг">
            {RATE_OPTIONS.map((rate) => (
              <FilterChip
                key={rate}
                label={String(rate)}
                variant="compact"
                isActive={filters.rate?.includes(rate)}
                onClick={() => onFiltersChange('rate', rate)}
              />
            ))}
          </FilterGroup>
        </>
      )}
    </>
  );
}
