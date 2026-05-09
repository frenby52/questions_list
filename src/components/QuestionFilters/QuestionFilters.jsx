import MetaPill from '../MetaPill/MetaPill.jsx';
import FilterChip from '../FilterChip/FilterChip.jsx';
import KeywordChip from '../KeywordChip/KeywordChip.jsx';
import FilterGroup from '../FilterGroup/FilterGroup.jsx';
import FiltersContainer from '../FiltersContainer/FiltersContainer.jsx';

function QuestionFilters({ question, onSkillClick, onKeywordClick, showClose = false, onClose }) {
  const { complexity = 0, rate = 0, questionSkills = [], keywords = [] } = question;

  return (
    <FiltersContainer showClose={showClose} onClose={onClose}>
      <FilterGroup title="Уровень:" >
        <MetaPill label="Сложность:" value={complexity} />
        <MetaPill label="Рейтинг:" value={rate} />
      </FilterGroup>
      {questionSkills.length > 0 && (
        <FilterGroup title="Навыки:" >
          {questionSkills.map((skill) => (
            <FilterChip
              key={skill.id}
              label={skill.title}
              iconSrc={skill.imageSrc}
              isActive
              onClick={() => onSkillClick?.(skill.id)}
            />
          ))}
        </FilterGroup>
      )}
      {keywords.length > 0 && (
        <FilterGroup title="Ключевые слова:" >
          {keywords.map((keyword) => (
            <KeywordChip key={keyword} keyword={keyword} onClick={onKeywordClick} />
          ))}
        </FilterGroup>
      )}
    </FiltersContainer>
  );
}

export default QuestionFilters;
