import { MetaPill, FilterChip, KeywordChip, FilterGroup, SideBar } from '@/shared/ui';
import { useDetailedQuestionAttributeFilter } from '@/features/filter-questions';
import type { Question } from '@/entities/question';

interface QuestionSidebarProps {
  question: Question;
  showClose?: boolean;
  onClose?: () => void;
}

export function QuestionSidebar({ question, showClose = false, onClose }: QuestionSidebarProps) {
  const { complexity = 0, rate = 0, questionSkills = [], keywords = [] } = question;
  const handleQuestionFilterClick = useDetailedQuestionAttributeFilter();

  return (
    <SideBar showClose={showClose} onClose={onClose}>
      <FilterGroup title="Уровень:">
        <MetaPill label="Сложность:" value={complexity} />
        <MetaPill label="Рейтинг:" value={rate} />
      </FilterGroup>
      {questionSkills.length > 0 && (
        <FilterGroup title="Навыки:">
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
        <FilterGroup title="Ключевые слова:">
          {keywords.map((keyword) => (
            <KeywordChip key={keyword} keyword={keyword} onClick={() => handleQuestionFilterClick('keywords', keyword)} />
          ))}
        </FilterGroup>
      )}
    </SideBar>
  );
}
