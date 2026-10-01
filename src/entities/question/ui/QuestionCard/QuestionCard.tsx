import { useState } from 'react';
import classes from './QuestionCard.module.scss';
import chevronDownIcon from '@/shared/assets/icons/chevron-down-brand.svg';
import kebabIcon from '@/shared/assets/icons/kebab.svg';
import { useMenu } from '@/shared/hooks/useMenu.ts';
import { ContentRenderer, MetaPill } from '@/shared/ui';

export function QuestionCard({ question, defaultOpen = false, questionActions }) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(defaultOpen);
  const [isMenuOpen, setIsMenuOpen, menuRef] = useMenu();
  const toggleIconClass = isQuestionOpen ? `${classes.toggleIcon} ${classes.toggleIconOpen}` : classes.toggleIcon;

  return (
    <article className={classes.item}>
      <header
        className={classes.header}
        onClick={() => setIsQuestionOpen((prev) => !prev)}
      >
        <span className={classes.bullet} />
        <h3 className={classes.title}>{question.title}</h3>
        <button type="button" className={classes.toggle}>
          <img className={toggleIconClass} src={chevronDownIcon} alt="" width={20} height={20} />
        </button>
      </header>

      {isQuestionOpen && (
        <div className={classes.body}>
          <div className={classes.metaRow}>
            <div className={classes.meta}>
              <MetaPill label="Рейтинг:" value={question.rate ?? 0} />
              <MetaPill label="Сложность:" value={question.complexity ?? 0} />
            </div>
            {questionActions && (
              <div className={classes.actions} ref={menuRef}>
                <button
                  type="button"
                  className={classes.actionsBtn}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsMenuOpen((prev) => !prev);
                  }}
                >
                  <img src={kebabIcon} alt="" width={18} height={18} />
                </button>
                {isMenuOpen && questionActions(() => setIsMenuOpen(false))}
              </div>
            )}
          </div>

          {question.imageSrc && (
            <img className={classes.image} src={question.imageSrc} alt="" loading="lazy" width={100} height={100} />
          )}
          <div className={classes.shortAnswer}><ContentRenderer content={question.shortAnswer} /></div>
        </div>
      )}
    </article>
  );
}
