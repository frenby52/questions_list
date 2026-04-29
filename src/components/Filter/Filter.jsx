import { useState } from 'react';
import classes from './Filter.module.scss';
import SearchInput from '../SearchInput/SearchInput.jsx';
import FilterGroup from '../FilterGroup/FilterGroup.jsx';
import FilterChip from '../FilterChip/FilterChip.jsx';
import closeIcon from '../../assets/icons/close.svg';
import { useMemo } from 'react';
import { COMPLEXITY_OPTIONS, RATE_OPTIONS, STATUS_OPTIONS, COLLAPSED_SPECS_COUNT, COLLAPSED_SKILLS_COUNT } from '../../constants/constants.js';

function Filter({
  specializations,
  skills,
  filters,
  onFiltersChange,
  onClose,
  showClose = false,
}) {
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

  const visibleSpecs   = useMemo(() => isSpecsExpanded ? specializations : specializations.slice(0, COLLAPSED_SPECS_COUNT), [specializations, isSpecsExpanded]);
  const visibleSkills  = useMemo(() => isSkillsExpanded ? skills : skills.slice(0, COLLAPSED_SKILLS_COUNT), [skills, isSkillsExpanded]);
  const flatComplexity = useMemo(() => filters.complexity.flat(), [filters.complexity]);

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
    <aside className={classes.filter}>
      {showClose && (
        <button
          type="button"
          className={classes.close}
          onClick={onClose}
        >
          <img src={closeIcon} alt="" width={20} height={20} />
        </button>
      )}

      <div className={classes.body}>
        <SearchInput
          value={filters.search}
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
              isActive={filters.skills.includes(skill.id)}
              onClick={() => onFiltersChange('skills', skill.id)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Уровень сложности">
          {COMPLEXITY_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              variant="compact"
              isActive={flatComplexity.some((filterValue) => option.value.includes(filterValue))}
              onClick={() => onFiltersChange('complexity', option.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Рейтинг">
          {RATE_OPTIONS.map((rate) => (
            <FilterChip
              key={rate}
              label={String(rate)}
              variant="compact"
              isActive={filters.rate.includes(rate)}
              onClick={() => onFiltersChange('rate', rate)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Статус">
          {STATUS_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.status === option.value}
              onClick={() => onFiltersChange('status', option.value)}
            />
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}

export default Filter;
