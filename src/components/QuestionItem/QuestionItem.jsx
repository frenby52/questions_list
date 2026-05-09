import { useState } from 'react';
import classes from './QuestionItem.module.scss';
import chevronDownIcon from '../../assets/icons/chevron-down-brand.svg';
import kebabIcon from '../../assets/icons/kebab.svg';
import ContentRenderer from '../ContentRenderer/ContentRenderer.jsx';
import { useMenu } from '../../helpers/hooks/useMenu.js';
import { ROUTES } from '../../constants/routes.js';
import { useNavigate } from 'react-router-dom';
import QuestionMenu from '../QuestionMenu/QuestionMenu.jsx';
import MetaPill from '../MetaPill/MetaPill.jsx';

function QuestionItem({ question, defaultOpen = false }) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(defaultOpen);
  const [isMenuOpen, setIsMenuOpen, menuRef] = useMenu();
  const navigate = useNavigate();
  const toggleIconClass = isQuestionOpen ? `${classes.toggleIcon} ${classes.toggleIconOpen}` : classes.toggleIcon;

  const handleMenuItemClick = (id) => {
    if (id === 'details') {
      navigate(ROUTES.getQuestion(question.id));
    }
    setIsMenuOpen(false);
  };

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
              {isMenuOpen && <QuestionMenu handleMenuItemClick={handleMenuItemClick} />}
            </div>
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

export default QuestionItem;
