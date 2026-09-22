import MetaPill from '../MetaPill/MetaPill.jsx';
import FilterChip from '../FilterChip/FilterChip.jsx';
import KeywordChip from '../KeywordChip/KeywordChip.jsx';
import FilterGroup from '../FilterGroup/FilterGroup.jsx';
import FiltersContainer from '../FiltersContainer/FiltersContainer.jsx';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { buildUrl } from '../../helpers/utils/api.js';
import { ROUTES } from '../../constants/routes.js';

function QuestionFilters({ question, showClose = false, onClose }) {
  const { complexity = 0, rate = 0, questionSkills = [], keywords = [] } = question;
  const navigate = useNavigate();
  const handleQuestionFilterClick = useCallback((key, value) => {
    const params = new URLSearchParams();
    params.set(key, String(value));
    navigate(buildUrl(params, ROUTES.QUESTIONS));
  }, [navigate]);

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
              onClick={() => handleQuestionFilterClick('skills', skill.id)}
            />
          ))}
        </FilterGroup>
      )}
      {keywords.length > 0 && (
        <FilterGroup title="Ключевые слова:" >
          {keywords.map((keyword) => (
            <KeywordChip key={keyword} keyword={keyword} onClick={() => handleQuestionFilterClick('keywords', keyword)} />
          ))}
        </FilterGroup>
      )}
    </FiltersContainer>
  );
}

export default QuestionFilters;
